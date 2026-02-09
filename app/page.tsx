'use client';

import { useEffect } from 'react';
import { useScheduleStore } from '@/store/schedule-store';
import Header from '@/components/Header';
import DayCard from '@/components/DayCard';
import DayDetail from '@/components/DayDetail';

export default function Home() {
  const { loading, error, selectedDay, selectDay, getFilteredDays, fetchDays } = useScheduleStore();

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
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-6 h-6 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
            <p className="text-[10px] text-zinc-300">
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'DB 연결중...' : 'ENV 없음'}
            </p>
          </div>
        ) : filteredDays.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm text-zinc-400">데이터를 불러올 수 없습니다</p>
            {error && (
              <p className="text-[10px] text-red-400 mt-2 px-4 break-all">{error}</p>
            )}
            <p className="text-[10px] text-zinc-300 mt-2">
              URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'OK' : 'MISSING'}
            </p>
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
