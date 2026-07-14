// 지역별 컬러 테마(뉴질랜드 자연 팔레트)와 여행 날짜 계산 헬퍼.
// 색상 값은 globals.css 토큰(--fern/--lake/--road 계열)과 동일하게 유지한다.

export interface RegionTheme {
  label: string;
  main: string;
  deep: string;
  tint: string;
}

export const regionTheme: Record<string, RegionTheme> = {
  south: {
    label: "남섬",
    main: "var(--fern)",
    deep: "var(--fern-deep)",
    tint: "var(--fern-tint)",
  },
  north: {
    label: "북섬",
    main: "var(--lake)",
    deep: "var(--lake-deep)",
    tint: "var(--lake-tint)",
  },
  travel: {
    label: "이동",
    main: "var(--road)",
    deep: "var(--road-deep)",
    tint: "var(--road-tint)",
  },
};

// 여행 기간: 2026.10.31 ~ 2026.11.13 (14일)
export const TRIP_START = new Date(2026, 9, 31);
export const TRIP_DAYS = 14;

const dayDiff = (a: Date, b: Date) => {
  const ms =
    new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime() -
    new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  return Math.round(ms / 86_400_000);
};

/** 오늘 기준 여행 상태: 출발 전 D-day / 여행 중 N일차 / 다녀온 후 */
export const getTripStatus = (today = new Date()) => {
  const diff = dayDiff(TRIP_START, today); // 출발까지 남은 일수
  if (diff > 0) return { phase: "before" as const, text: `출발까지 D-${diff}` };
  const dayNo = 1 - diff;
  if (dayNo <= TRIP_DAYS)
    return { phase: "during" as const, text: `여행 ${dayNo}일차`, dayNo };
  return { phase: "after" as const, text: "여행을 다녀왔어요" };
};

/** 해당 일차(day)가 오늘인지 — 여행 중일 때 카드에 '오늘' 표시용 */
export const isTodayTripDay = (dayNumber: number, today = new Date()) => {
  const status = getTripStatus(today);
  return status.phase === "during" && status.dayNo === dayNumber;
};
