"use client";

import { KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Car, Coffee, BedDouble } from "lucide-react";
import { DaySchedule } from "@/types/schedule";
import { useScheduleStore } from "@/store/schedule-store";
import { regionTheme, isTodayTripDay } from "@/lib/region-theme";

interface DayCardProps {
  day: DaySchedule;
  /** 루트 라인의 마지막 웨이포인트 여부(아래 점선 생략) */
  isLast?: boolean;
}

const DayCard = ({ day, isLast = false }: DayCardProps) => {
  const router = useRouter();
  const { setScrollY } = useScheduleStore();
  const theme = regionTheme[day.region];
  const isToday = isTodayTripDay(day.day);

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
    <div className="flex gap-3">
      {/* 웨이포인트 노드 + 루트 점선 */}
      <div className="flex flex-col items-center shrink-0 w-12">
        <div
          className="w-12 h-12 rounded-full bg-[var(--card)] flex flex-col items-center justify-center"
          style={{
            border: `2px solid ${theme.main}`,
            boxShadow: isToday ? `0 0 0 4px ${theme.tint}` : undefined,
          }}
        >
          <span className="text-[8px] font-bold tracking-[0.14em] text-[var(--ink)]/40 leading-none">
            DAY
          </span>
          <span
            className="font-disp text-lg font-black leading-none mt-0.5"
            style={{ color: theme.main }}
          >
            {day.day}
          </span>
        </div>
        {!isLast && (
          <div
            className="w-0 flex-1 my-1.5 border-l-2 border-dashed"
            style={{ borderColor: "var(--line)" }}
          />
        )}
      </div>

      {/* 카드 */}
      <div
        role="link"
        tabIndex={0}
        onClick={goToDetail}
        onKeyDown={handleCardKeyDown}
        className="min-w-0 flex-1 mb-4 bg-[var(--card)] rounded-2xl p-4 border border-[var(--line-soft)] shadow-[0_1px_2px_rgba(38,34,27,0.06)] active:scale-[0.98] transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ink)]"
      >
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold"
            style={{ background: theme.tint, color: theme.deep }}
          >
            {theme.label}
          </span>
          {day.is_rest_day && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[var(--paper)] border border-[var(--line)] text-[var(--ink)]/55">
              <Coffee size={10} />
              자유일
            </span>
          )}
          {isToday && (
            <span
              className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold text-white"
              style={{ background: theme.main }}
            >
              오늘
            </span>
          )}
          <span className="ml-auto text-[11px] text-[var(--ink)]/40 font-medium">
            {day.date} ({day.day_of_week})
          </span>
        </div>

        <h3 className="font-disp text-[20px] font-black text-[var(--ink)] mt-1.5 leading-snug">
          {day.title}
        </h3>
        {day.subtitle && (
          <p className="text-xs text-[var(--ink)]/45 mt-0.5">{day.subtitle}</p>
        )}

        {(day.accommodation?.name || day.drive_info) && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
            {day.accommodation?.name && (
              <span className="flex items-center gap-1 text-[11px] text-[var(--ink)]/50">
                <BedDouble size={12} style={{ color: theme.main }} />
                {day.accommodation.name}
              </span>
            )}
            {day.drive_info && (
              <span className="flex items-center gap-1 text-[11px] text-[var(--ink)]/50">
                <Car size={12} style={{ color: theme.main }} />
                {day.drive_info}
              </span>
            )}
          </div>
        )}

        {/* 활동 미리보기 */}
        {day.activities.length > 0 && (
          <div className="mt-2.5 pt-2.5 border-t border-dashed border-[var(--line-soft)] flex flex-wrap gap-1.5">
            {day.activities.map((a, i) => (
              <span
                key={`${day.id}-${i}-${a.title}`}
                className="text-[11px] bg-[var(--paper)] text-[var(--ink)]/60 px-2 py-0.5 rounded-md"
              >
                {a.emoji}{" "}
                {a.title.length > 10 ? a.title.slice(0, 10) + "…" : a.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DayCard;
