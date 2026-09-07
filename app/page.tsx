"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useScheduleStore } from "@/store/schedule-store";
import Header from "@/components/Header";
import DayCard from "@/components/DayCard";

export default function Home() {
  const router = useRouter();
  const {
    days,
    loading,
    isFallback,
    dataSource,
    getFilteredDays,
    fetchDays,
    scrollY,
  } = useScheduleStore();
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

  // 리스트가 뜬 뒤 유휴 시간에 14일 상세(정적, 각 수 KB)를 모두 미리 받아둔다.
  // <Link>는 화면에 보이는 카드만 미리 받으므로, 빨리 스크롤해 탭하거나
  // 잠깐 네트워크가 끊겨도 이동이 되도록 보완한다.
  useEffect(() => {
    if (loading || days.length === 0) return;
    const prefetchAll = () => days.forEach((d) => router.prefetch(`/day/${d.id}`));
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(prefetchAll, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    // Safari(iOS)는 requestIdleCallback 미지원
    const id = window.setTimeout(prefetchAll, 800);
    return () => window.clearTimeout(id);
  }, [loading, days, router]);

  const filteredDays = getFilteredDays();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="px-4 py-4 pb-10">
        {isFallback && (
          <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-[var(--road-tint)] border border-[var(--road)]/25 text-xs leading-relaxed text-[var(--road-deep)]">
            {dataSource === "mock"
              ? "🗂 목데이터를 보는 중이에요. 수정하려면 실데이터로 전환해주세요."
              : "📴 서버 연결이 원활하지 않아 저장된 일정을 보여주고 있어요. 수정은 잠시 사용할 수 없어요."}
          </div>
        )}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-[var(--line)] border-t-[var(--fern)] rounded-full animate-spin" />
          </div>
        ) : (
          // 14일이 하나의 여정 — 점선 루트 라인이 웨이포인트(일차)를 잇는다
          <div>
            {filteredDays.map((day, i) => (
              <DayCard
                key={day.id}
                day={day}
                isLast={i === filteredDays.length - 1}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
