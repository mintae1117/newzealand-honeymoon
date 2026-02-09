import { create } from 'zustand';
import { DaySchedule, Memo } from '@/types/schedule';
import { supabase } from '@/lib/supabase';

type RegionFilter = 'all' | 'south' | 'north' | 'travel';

interface ScheduleState {
  days: DaySchedule[];
  loading: boolean;
  error: string | null;

  selectedDayId: number | null;
  selectedDay: DaySchedule | null;

  regionFilter: RegionFilter;

  // 메모
  memos: Memo[];
  memosLoading: boolean;

  // 액션
  fetchDays: () => Promise<void>;
  selectDay: (id: number | null) => void;
  setRegionFilter: (filter: RegionFilter) => void;
  getFilteredDays: () => DaySchedule[];

  // 메모 액션
  fetchMemos: (dayId: number) => Promise<void>;
  addMemo: (dayId: number, content: string) => Promise<void>;
  deleteMemo: (memoId: string) => Promise<void>;
}

export const useScheduleStore = create<ScheduleState>((set, get) => ({
  days: [],
  loading: true,
  error: null,
  selectedDayId: null,
  selectedDay: null,
  regionFilter: 'all',
  memos: [],
  memosLoading: false,

  fetchDays: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .order('day', { ascending: true });

      if (error) {
        set({ loading: false, error: `${error.code}: ${error.message}` });
      } else {
        set({ days: data as DaySchedule[], loading: false });
      }
    } catch (e) {
      set({ loading: false, error: `catch: ${e}` });
    }
  },

  selectDay: (id) => {
    const day = id ? get().days.find((d) => d.id === id) ?? null : null;
    set({ selectedDayId: id, selectedDay: day, memos: [] });
    if (id) get().fetchMemos(id);
  },

  setRegionFilter: (filter) => {
    set({ regionFilter: filter });
  },

  getFilteredDays: () => {
    const { days, regionFilter } = get();
    if (regionFilter === 'all') return days;
    return days.filter((d) => d.region === regionFilter);
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
