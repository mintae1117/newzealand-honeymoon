import { create } from 'zustand';
import { DaySchedule, Memo, Activity, Accommodation, LinkInfo } from '@/types/schedule';
import { supabase } from '@/lib/supabase';

type RegionFilter = 'all' | 'south' | 'north' | 'travel';

interface ScheduleState {
  days: DaySchedule[];
  loading: boolean;

  regionFilter: RegionFilter;

  // 스크롤
  scrollY: number;
  setScrollY: (y: number) => void;

  // 메모
  memos: Memo[];
  memosLoading: boolean;

  // 액션
  fetchDays: () => Promise<void>;
  setRegionFilter: (filter: RegionFilter) => void;
  getFilteredDays: () => DaySchedule[];

  // 일정 수정
  updateSchedule: (dayId: number, updates: { activities?: Activity[]; accommodation?: Accommodation | null; links?: LinkInfo[] }) => Promise<void>;

  // 메모 액션
  fetchMemos: (dayId: number) => Promise<void>;
  addMemo: (dayId: number, content: string) => Promise<void>;
  deleteMemo: (memoId: string) => Promise<void>;
}

export const useScheduleStore = create<ScheduleState>((set, get) => ({
  days: [],
  loading: true,
  regionFilter: 'all',
  scrollY: 0,
  setScrollY: (y) => set({ scrollY: y }),
  memos: [],
  memosLoading: false,

  fetchDays: async () => {
    if (get().days.length > 0) {
      set({ loading: false });
      return;
    }
    set({ loading: true });
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .order('day', { ascending: true });

    if (!error && data) {
      set({ days: data as DaySchedule[], loading: false });
    } else {
      set({ loading: false });
    }
  },

  setRegionFilter: (filter) => {
    set({ regionFilter: filter });
  },

  getFilteredDays: () => {
    const { days, regionFilter } = get();
    if (regionFilter === 'all') return days;
    return days.filter((d) => d.region === regionFilter);
  },

  updateSchedule: async (dayId, updates) => {
    const response = await fetch(`/api/schedules/${dayId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.error || '일정 저장에 실패했습니다.');
    }

    const { schedule } = await response.json();
    const days = get().days.map((d) =>
      d.id === dayId ? (schedule as DaySchedule) : d
    );
    set({ days });
  },

  fetchMemos: async (dayId) => {
    set({ memosLoading: true });
    const { data, error } = await supabase
      .from('memos')
      .select('*')
      .eq('day_id', dayId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      set({ memos: data as Memo[], memosLoading: false });
    } else {
      set({ memosLoading: false });
    }
  },

  addMemo: async (dayId, content) => {
    const { data, error } = await supabase
      .from('memos')
      .insert({ day_id: dayId, content })
      .select()
      .single();

    if (!error && data) {
      set({ memos: [data as Memo, ...get().memos] });
    }
  },

  deleteMemo: async (memoId) => {
    const { error } = await supabase
      .from('memos')
      .delete()
      .eq('id', memoId);

    if (!error) {
      set({ memos: get().memos.filter((m) => m.id !== memoId) });
    }
  },
}));
