"use client";

import { useEffect, useRef } from "react";
import { useScheduleStore } from "@/store/schedule-store";
import Header from "@/components/Header";
import DayCard from "@/components/DayCard";

export default function Home() {
  const { loading, isFallback, dataSource, getFilteredDays, fetchDays, scrollY } =
    useScheduleStore();
  const restored = useRef(false);

  useEffect(() => {
    fetchDays();
    restored.current = false;
  }, [fetchDays]);

  // 스크롤 복원
  useEffect(() => {
    if (!loading && scrollY > 0 && !restored.current) {
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
      restored.current = true;
    }
  }, [loading, scrollY]);

  const filteredDays = getFilteredDays();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />
      <main className="px-4 py-4 pb-8 space-y-3">
        {isFallback && (
          <div className="px-3 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-700 dark:text-amber-400">
            {dataSource === "mock"
              ? "🗂 목데이터를 보는 중이에요. 수정하려면 실데이터로 전환해주세요."
              : "📴 서버 연결이 원활하지 않아 저장된 일정을 보여주고 있어요. 수정은 잠시 사용할 수 없어요."}
          </div>
        )}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
          </div>
        ) : (
          filteredDays.map((day) => <DayCard key={day.id} day={day} />)
        )}
      </main>
    </div>
  );
}
