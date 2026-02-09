'use client';

import { useEffect, useRef } from 'react';
import { useScheduleStore } from '@/store/schedule-store';
import Header from '@/components/Header';
import DayCard from '@/components/DayCard';
import DayDetail from '@/components/DayDetail';

export default function Home() {
  const { loading, selectedDay, selectDay, getFilteredDays, fetchDays, scrollY, setScrollY } =
    useScheduleStore();
  const restored = useRef(false);

  useEffect(() => {
    fetchDays();
  }, [fetchDays]);

  // 리스트로 돌아왔을 때 스크롤 복원
  useEffect(() => {
    if (!selectedDay && !loading && scrollY > 0 && !restored.current) {
      window.scrollTo(0, scrollY);
      restored.current = true;
    }
  }, [selectedDay, loading, scrollY]);

  const handleSelect = (id: number) => {
    setScrollY(window.scrollY);
    restored.current = false;
    selectDay(id);
  };

  const handleBack = () => {
    selectDay(null);
  };

  if (selectedDay) {
    return <DayDetail day={selectedDay} onBack={handleBack} />;
  }

  const filteredDays = getFilteredDays();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />
      <main className="px-4 py-4 pb-8 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
          </div>
        ) : (
          filteredDays.map((day) => (
            <DayCard key={day.id} day={day} onSelect={handleSelect} />
          ))
        )}
      </main>
    </div>
  );
}
