'use client';

import { useEffect } from 'react';
import { useScheduleStore } from '@/store/schedule-store';
import Header from '@/components/Header';
import DayCard from '@/components/DayCard';
import DayDetail from '@/components/DayDetail';

export default function Home() {
  const { loading, selectedDay, selectDay, getFilteredDays, fetchDays } = useScheduleStore();

  useEffect(() => {
    fetchDays();
  }, [fetchDays]);

  if (selectedDay) {
    return <DayDetail day={selectedDay} onBack={() => selectDay(null)} />;
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
            <DayCard key={day.id} day={day} onSelect={selectDay} />
          ))
        )}
      </main>
    </div>
  );
}
