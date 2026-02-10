'use client';

import { useState, useEffect } from 'react';
import { Plane, Sun, Moon } from 'lucide-react';
import { useScheduleStore } from '@/store/schedule-store';

const filters = [
  { key: 'all' as const, label: '전체' },
  { key: 'south' as const, label: '남섬' },
  { key: 'north' as const, label: '북섬' },
  { key: 'travel' as const, label: '이동' },
];

const Header = () => {
  const { regionFilter, setRegionFilter } = useScheduleStore();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-zinc-100 dark:bg-zinc-950/80 dark:border-zinc-800">
      <div className="px-5 pt-5 pb-3 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight dark:text-white flex items-center gap-2">
            <Plane size={20} className="text-emerald-500 -rotate-45" />
            뉴질랜드 신혼여행
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            2026.10.31 ~ 11.13 · 14일
          </p>
        </div>
        <button
          onClick={toggleTheme}
          className="shrink-0 mt-0.5 p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 active:scale-90 transition-all"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
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
