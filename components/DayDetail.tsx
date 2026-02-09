'use client';

import { useEffect } from 'react';
import { ArrowLeft, Car, Lightbulb, MapPin, ExternalLink, BedDouble } from 'lucide-react';
import { DaySchedule } from '@/types/schedule';
import MemoSection from '@/components/MemoSection';

interface DayDetailProps {
  day: DaySchedule;
  onBack: () => void;
}

const regionBg: Record<string, string> = {
  south: 'from-emerald-500 to-emerald-600',
  north: 'from-blue-500 to-blue-600',
  travel: 'from-amber-500 to-amber-600',
};

const DayDetail = ({ day, onBack }: DayDetailProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-8">
      {/* 헤더 */}
      <div className={`bg-gradient-to-br ${regionBg[day.region]} px-5 pt-4 pb-6`}>
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-white/80 text-sm mb-4 active:opacity-60 -ml-1"
        >
          <ArrowLeft size={18} />
          <span>돌아가기</span>
        </button>
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-md">
            DAY {day.day}
          </span>
          {day.is_rest_day && (
            <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-md">
              자유일
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-white mt-2">{day.title}</h1>
        <p className="text-white/70 text-sm mt-1">
          {day.date} ({day.day_of_week})
          {day.subtitle && ` · ${day.subtitle}`}
        </p>
        {day.drive_info && (
          <div className="flex items-center gap-1.5 mt-3 text-white/70 text-xs">
            <Car size={14} />
            <span>{day.drive_info}</span>
          </div>
        )}
      </div>

      <div className="px-5 -mt-3 space-y-4">
        {/* 활동 타임라인 */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-zinc-100 dark:border-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            <MapPin size={16} />
            일정
          </h2>
          <div className="space-y-0">
            {day.activities.map((activity, i) => (
              <div key={i} className="flex gap-3 relative">
                {/* 타임라인 라인 */}
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600 shrink-0 mt-1.5" />
                  {i < day.activities.length - 1 && (
                    <div className="w-px flex-1 bg-zinc-200 dark:bg-zinc-700 my-1" />
                  )}
                </div>
                {/* 내용 */}
                <div className="pb-4 min-w-0 flex-1">
                  {activity.time && (
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                      {activity.time}
                    </span>
                  )}
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">
                    {activity.emoji} {activity.title}
                  </p>
                  {activity.description && (
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      {activity.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 팁 */}
        {day.tips.length > 0 && (
          <section className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-100 dark:border-amber-900/50">
            <h2 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
              <Lightbulb size={16} />
              팁
            </h2>
            <ul className="space-y-1.5">
              {day.tips.map((tip, i) => (
                <li key={i} className="text-xs text-amber-600 dark:text-amber-400/80 leading-relaxed">
                  {tip.text}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 숙소 */}
        {day.accommodation && (
          <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-zinc-100 dark:border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
              <BedDouble size={16} />
              숙소
            </h2>
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {day.accommodation.name}
            </p>
            {day.accommodation.options.length > 0 && (
              <ul className="mt-2 space-y-1">
                {day.accommodation.options.map((opt, i) => (
                  <li key={i} className="text-xs text-zinc-400">
                    · {opt}
                  </li>
                ))}
              </ul>
            )}
            {day.accommodation.note && (
              <p className="text-xs text-violet-500 mt-2 font-medium">
                {day.accommodation.note}
              </p>
            )}
          </section>
        )}

        {/* 링크 */}
        {day.links.length > 0 && (
          <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-zinc-100 dark:border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
              <ExternalLink size={16} />
              관련 링크
            </h2>
            <div className="space-y-2">
              {day.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 active:bg-zinc-100 dark:active:bg-zinc-700 transition-colors"
                >
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{link.label}</span>
                  <ExternalLink size={14} className="text-zinc-400" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* 메모 */}
        <MemoSection dayId={day.id} />
      </div>
    </div>
  );
};

export default DayDetail;
