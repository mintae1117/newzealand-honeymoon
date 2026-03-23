"use client";

import { KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Car, Coffee } from "lucide-react";
import { DaySchedule } from "@/types/schedule";
import { useScheduleStore } from "@/store/schedule-store";

const regionColors: Record<string, string> = {
  south:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  north: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  travel: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
};

const regionLabels: Record<string, string> = {
  south: "남섬",
  north: "북섬",
  travel: "이동",
};

interface DayCardProps {
  day: DaySchedule;
}

const DayCard = ({ day }: DayCardProps) => {
  const router = useRouter();
  const { setScrollY } = useScheduleStore();

  const goToDetail = () => {
    setScrollY(window.scrollY);
    router.push(`/day/${day.id}`);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToDetail();
    }
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={goToDetail}
      onKeyDown={handleCardKeyDown}
      className="block w-full text-left bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-zinc-100 dark:border-zinc-800 active:scale-[0.98] transition-transform"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3.5 min-w-0 flex-1">
          {/* 날짜 뱃지 */}
          <div className="shrink-0 w-19 h-19 rounded-2xl bg-zinc-900 dark:bg-white px-2 py-2.5 flex flex-col items-center justify-center shadow-sm">
            <span className="text-[10px] font-semibold tracking-[0.08em] text-zinc-400 dark:text-zinc-500 leading-none">
              DAY {day.day}
            </span>
            <span className="mt-1 text-sm font-bold text-white dark:text-zinc-900 leading-snug text-center break-keep">
              {day.date}
            </span>
          </div>

          {/* 내용 */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-semibold ${regionColors[day.region]}`}
              >
                {regionLabels[day.region]}
              </span>
              {day.is_rest_day && (
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-violet-50 text-violet-500 dark:bg-violet-950 dark:text-violet-400">
                  <Coffee size={10} />
                  자유일
                </span>
              )}
            </div>
            <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
              {`DAY ${day.day} · ${day.date} (${day.day_of_week})`}
            </p>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
              {day.title}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              {day.subtitle || ""}
            </p>
            {day.drive_info && (
              <div className="flex items-center gap-1 mt-1.5 text-[11px] text-zinc-400">
                <Car size={12} />
                <span>{day.drive_info}</span>
              </div>
            )}
          </div>
        </div>

        <ChevronRight
          size={18}
          className="shrink-0 text-zinc-300 dark:text-zinc-600 mt-3"
        />
      </div>

      {/* 활동 미리보기 */}
      <div className="mt-3 pl-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {day.activities.map((a, i) => (
            <span
              key={`${day.id}-${i}-${a.title}`}
              className="text-xs bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-md"
            >
              {a.emoji}{" "}
              {a.title.length > 10 ? a.title.slice(0, 10) + "…" : a.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayCard;
