'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useScheduleStore } from '@/store/schedule-store';
import DayDetail from '@/components/DayDetail';

export default function DayPage() {
  const params = useParams();
  const router = useRouter();
  const { days, loading, fetchDays } = useScheduleStore();

  useEffect(() => {
    fetchDays();
  }, [fetchDays]);

  const dayId = Number(params.id);
  const day = days.find((d) => d.id === dayId);

  if (loading || days.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!day) {
    router.replace('/');
    return null;
  }

  const idx = days.findIndex((d) => d.id === dayId);
  const prevDay = idx > 0 ? days[idx - 1] : null;
  const nextDay = idx < days.length - 1 ? days[idx + 1] : null;

  return (
    <DayDetail
      day={day}
      prevDay={prevDay}
      nextDay={nextDay}
      onBack={() => router.push('/')}
      onNavigate={(id) => router.push(`/day/${id}`)}
    />
  );
}
