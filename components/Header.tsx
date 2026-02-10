'use client';

import { Plane } from 'lucide-react';
import { useScheduleStore } from '@/store/schedule-store';

const filters = [
  { key: 'all' as const, label: '전체' },
  { key: 'south' as const, label: '남섬' },
  { key: 'north' as const, label: '북섬' },
  { key: 'travel' as const, label: '이동' },
];

const Header = () => {
  const { regionFilter, setRegionFilter } = useScheduleStore();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-zinc-100 dark:bg-zinc-950/80 dark:border-zinc-800">
      <div className="px-5 pt-5 pb-3">
        <h1 className="text-xl font-bold tracking-tight dark:text-white flex items-center gap-2">
          <Plane size={20} className="text-emerald-500 -rotate-45" />
          뉴질랜드 신혼여행
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          2026.10.31 ~ 11.13 · 14일
        </p>
      </div>
      <div className="flex gap-2 px-5 pb-3 overflow-x-auto scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setRegionFilter(f.key)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              regionFilter === f.key
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
