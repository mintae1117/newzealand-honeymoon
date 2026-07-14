"use client";

import { useSyncExternalStore } from "react";
import { Plane, Database, DatabaseZap } from "lucide-react";
import { useScheduleStore } from "@/store/schedule-store";
import { regionTheme, getTripStatus } from "@/lib/region-theme";

const filters = [
  { key: "all" as const, label: "전체", color: "var(--ink)" },
  { key: "south" as const, label: "남섬", color: regionTheme.south.main },
  { key: "north" as const, label: "북섬", color: regionTheme.north.main },
  { key: "travel" as const, label: "이동", color: regionTheme.travel.main },
];

// D-day는 클라이언트의 '오늘'에 의존하므로 hydration mismatch를 피해 클라이언트 값만 쓴다
const subscribeNoop = () => () => {};
const useTripStatus = () =>
  useSyncExternalStore(
    subscribeNoop,
    () => getTripStatus().text,
    () => "",
  );

const Header = () => {
  const { regionFilter, setRegionFilter, dataSource, setDataSource } =
    useScheduleStore();
  const tripStatusText = useTripStatus();

  return (
    <header className="sticky top-0 z-30 bg-[var(--paper)]/92 backdrop-blur-md border-b border-[var(--line-soft)]">
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.24em] text-[var(--ink)]/45">
              OUR HONEYMOON · AOTEAROA
            </p>
            <h1 className="font-disp text-[22px] font-black tracking-tight mt-1 flex items-center gap-2">
              뉴질랜드 여행 수첩
            </h1>
            <p className="text-xs text-[var(--ink)]/50 mt-1">
              2026.10.31 – 11.13 · 14일의 기록
            </p>
          </div>
          {tripStatusText && (
            <span className="shrink-0 mt-1 font-disp text-xs font-bold text-[var(--fern-deep)] bg-[var(--fern-tint)] border border-[var(--fern)]/25 rounded-full px-3 py-1.5">
              {tripStatusText}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 px-5 pb-3">
        <div className="flex flex-1 gap-1.5 overflow-x-auto scrollbar-hide">
          {filters.map((f) => {
            const active = regionFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setRegionFilter(f.key)}
                className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors"
                style={
                  active
                    ? {
                        background: f.color,
                        borderColor: f.color,
                        color: "#fff",
                      }
                    : {
                        background: "var(--card)",
                        borderColor: "var(--line)",
                        color: "rgba(38,34,27,0.55)",
                      }
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>
        {/* 데이터 소스 토글 (실데이터 ↔ 목데이터) */}
        <button
          onClick={() => setDataSource(dataSource === "live" ? "mock" : "live")}
          className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all active:scale-95"
          style={
            dataSource === "live"
              ? {
                  background: "var(--fern-tint)",
                  borderColor: "rgba(46,117,80,0.3)",
                  color: "var(--fern-deep)",
                }
              : {
                  background: "var(--road-tint)",
                  borderColor: "rgba(194,117,31,0.35)",
                  color: "var(--road-deep)",
                }
          }
        >
          {dataSource === "live" ? (
            <DatabaseZap size={12} />
          ) : (
            <Database size={12} />
          )}
          {dataSource === "live" ? "실데이터" : "목데이터"}
        </button>
      </div>
    </header>
  );
};

export default Header;
