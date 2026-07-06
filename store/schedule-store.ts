import { create } from "zustand";
import {
  DaySchedule,
  Memo,
  Activity,
  Accommodation,
  LinkInfo,
} from "@/types/schedule";
import { supabase } from "@/lib/supabase";
import { MOCK_SCHEDULES, MOCK_MEMOS } from "@/lib/mock-data";

type RegionFilter = "all" | "south" | "north" | "travel";
type DataSource = "live" | "mock";

// 이 시간 안에 응답이 없으면 목데이터로 폴백
const FETCH_TIMEOUT_MS = 5000;

// 데이터 소스 선택 유지용 localStorage 키
const DATA_SOURCE_KEY = "honeymoon-data-source";

// Safari 프라이빗 모드 등 localStorage 접근 불가 환경 대비
const readStoredDataSource = (): DataSource | null => {
  try {
    return window.localStorage.getItem(DATA_SOURCE_KEY) === "mock"
      ? "mock"
      : window.localStorage.getItem(DATA_SOURCE_KEY) === "live"
        ? "live"
        : null;
  } catch {
    return null;
  }
};

const writeStoredDataSource = (source: DataSource) => {
  try {
    window.localStorage.setItem(DATA_SOURCE_KEY, source);
  } catch {
    // 저장 실패해도 동작에는 지장 없음 (세션 동안만 유지)
  }
};

// SSR에서는 localStorage가 없으므로 첫 클라이언트 조회 시점에 한 번만 복원
let dataSourceRestored = false;

const withTimeout = <T>(promise: PromiseLike<T>): Promise<T> =>
  Promise.race([
    Promise.resolve(promise),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("fetch timeout")), FETCH_TIMEOUT_MS),
    ),
  ]);

interface ScheduleState {
  days: DaySchedule[];
  loading: boolean;

  // 목데이터 폴백 모드 (DB 연결 실패/지연 시 true, 수정 불가)
  isFallback: boolean;

  // 사용자가 선택한 데이터 소스 (mock 선택 시 네트워크 없이 스냅샷 사용)
  dataSource: DataSource;
  setDataSource: (source: DataSource) => void;

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
  updateSchedule: (
    dayId: number,
    updates: {
      activities?: Activity[];
      accommodation?: Accommodation | null;
      links?: LinkInfo[];
    },
  ) => Promise<void>;

  // 메모 액션
  fetchMemos: (dayId: number) => Promise<void>;
  addMemo: (dayId: number, content: string) => Promise<void>;
  deleteMemo: (memoId: string) => Promise<void>;
}

export const useScheduleStore = create<ScheduleState>((set, get) => ({
  days: [],
  loading: true,
  isFallback: false,
  dataSource: "live",
  regionFilter: "all",
  scrollY: 0,
  setScrollY: (y) => set({ scrollY: y }),
  memos: [],
  memosLoading: false,

  setDataSource: (source) => {
    if (source === get().dataSource) return;
    writeStoredDataSource(source);

    if (source === "mock") {
      set({
        dataSource: "mock",
        days: MOCK_SCHEDULES,
        isFallback: true,
        loading: false,
      });
    } else {
      // 실데이터로 전환: 비우고 새로 조회 (실패하면 자동 폴백)
      set({ dataSource: "live", days: [], isFallback: false });
      get().fetchDays();
    }
  },

  fetchDays: async () => {
    // 첫 클라이언트 조회 시 localStorage에 저장된 데이터 소스 복원
    // (SSR 초기값은 항상 "live"라 hydration 불일치 없이 여기서 전환)
    if (!dataSourceRestored && typeof window !== "undefined") {
      dataSourceRestored = true;
      const stored = readStoredDataSource();
      if (stored && stored !== get().dataSource) {
        set({ dataSource: stored });
      }
    }

    // 목데이터 모드에서는 네트워크 조회 없이 스냅샷 사용
    if (get().dataSource === "mock") {
      set({ days: MOCK_SCHEDULES, isFallback: true, loading: false });
      return;
    }
    // 실데이터가 이미 있으면 재조회 생략 (폴백 상태면 복구 시도를 위해 재조회)
    if (get().days.length > 0 && !get().isFallback) {
      set({ loading: false });
      return;
    }
    // 폴백 데이터를 이미 보여주는 중이면 로딩 스피너 없이 조용히 재시도
    if (get().days.length === 0) {
      set({ loading: true });
    }

    try {
      const { data, error } = await withTimeout(
        supabase.from("schedules").select("*").order("day", { ascending: true }),
      );
      // 조회 중 사용자가 목데이터로 전환했다면 결과를 버림
      if (get().dataSource === "mock") return;
      if (error || !data || data.length === 0) {
        throw error ?? new Error("no data");
      }
      set({ days: data as DaySchedule[], isFallback: false, loading: false });
    } catch {
      if (get().dataSource === "mock") return;
      set({ days: MOCK_SCHEDULES, isFallback: true, loading: false });
    }
  },

  setRegionFilter: (filter) => {
    set({ regionFilter: filter });
  },

  getFilteredDays: () => {
    const { days, regionFilter } = get();
    if (regionFilter === "all") return days;
    return days.filter((d) => d.region === regionFilter);
  },

  updateSchedule: async (dayId, updates) => {
    if (get().isFallback) {
      throw new Error(
        get().dataSource === "mock"
          ? "목데이터 모드에서는 수정할 수 없어요. 실데이터로 전환 후 시도해주세요."
          : "지금은 저장된 일정을 보고 있어 수정할 수 없어요. 인터넷 연결 후 다시 시도해주세요.",
      );
    }
    const response = await fetch(`/api/schedules/${dayId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.error || "일정 저장에 실패했습니다.");
    }

    const { schedule } = await response.json();
    const days = get().days.map((d) =>
      d.id === dayId ? (schedule as DaySchedule) : d,
    );
    set({ days });
  },

  fetchMemos: async (dayId) => {
    // 목데이터 모드에서는 네트워크 조회 없이 스냅샷 사용
    if (get().dataSource === "mock") {
      set({
        memos: MOCK_MEMOS.filter((m) => m.day_id === dayId),
        memosLoading: false,
      });
      return;
    }
    set({ memosLoading: true });
    try {
      const { data, error } = await withTimeout(
        supabase
          .from("memos")
          .select("*")
          .eq("day_id", dayId)
          .order("created_at", { ascending: false }),
      );
      // 조회 중 사용자가 목데이터로 전환했다면 결과를 버림
      if (get().dataSource === "mock") {
        set({
          memos: MOCK_MEMOS.filter((m) => m.day_id === dayId),
          memosLoading: false,
        });
        return;
      }
      if (error || !data) {
        throw error ?? new Error("no data");
      }
      set({ memos: data as Memo[], memosLoading: false });
    } catch {
      // 메모 조회 실패 시에도 스냅샷으로 폴백 (수정 불가 모드 전환)
      set({
        memos: MOCK_MEMOS.filter((m) => m.day_id === dayId),
        memosLoading: false,
        isFallback: true,
      });
    }
  },

  addMemo: async (dayId, content) => {
    if (get().isFallback) return;
    const { data, error } = await supabase
      .from("memos")
      .insert({ day_id: dayId, content })
      .select()
      .single();

    if (!error && data) {
      set({ memos: [data as Memo, ...get().memos] });
    }
  },

  deleteMemo: async (memoId) => {
    if (get().isFallback) return;
    const { error } = await supabase.from("memos").delete().eq("id", memoId);

    if (!error) {
      set({ memos: get().memos.filter((m) => m.id !== memoId) });
    }
  },
}));
