// 달력 낱장 날짜 뱃지 — 스프링 달력에서 뜯은 한 장 느낌.
// DAY 뱃지(원형 도장·손글씨)와 실제 날짜가 헷갈리지 않도록, 날짜는 사각 달력 + 인쇄체로 형태를 완전히 구분한다.
interface DateLeafProps {
  /** "10월 31일" 형식 문자열 */
  date: string;
  /** "토" 형식 요일 */
  dayOfWeek: string;
  /** 월 스트립 색 (지역 테마 main) */
  accent: string;
  /** sm: 리스트 카드용 / md: 상세 헤더용 */
  size?: "sm" | "md";
}

const DateLeaf = ({ date, dayOfWeek, accent, size = "sm" }: DateLeafProps) => {
  const match = date.match(/(\d+)월\s*(\d+)일/);
  // 형식이 다르면 낱장 대신 원문 그대로 보여준다(데이터 방어).
  if (!match) {
    return (
      <span className="text-[11px] font-bold text-[var(--ink)]/60">
        {date} ({dayOfWeek})
      </span>
    );
  }
  const [, month, dayNum] = match;
  const sm = size === "sm";

  return (
    <div
      aria-label={`${month}월 ${dayNum}일 ${dayOfWeek}요일`}
      className={`shrink-0 self-start rounded-lg border border-[var(--line)] bg-[var(--card)] overflow-hidden text-center shadow-[0_1px_2px_rgba(38,34,27,0.1)] ${
        sm ? "w-11" : "w-[52px]"
      }`}
    >
      <div
        className={`text-white font-bold leading-none tracking-wide ${
          sm ? "text-[9px] py-[3px]" : "text-[10px] py-1"
        }`}
        style={{ background: accent }}
      >
        {month}월
      </div>
      <div
        className={`font-extrabold text-[var(--ink)] leading-none ${
          sm ? "text-[18px] pt-1" : "text-[22px] pt-1.5"
        }`}
      >
        {dayNum}
      </div>
      <div
        className={`font-bold text-[var(--ink)]/50 ${
          sm ? "text-[9px] pt-0.5 pb-1" : "text-[10px] pt-1 pb-1.5"
        }`}
      >
        {dayOfWeek}
      </div>
    </div>
  );
};

export default DateLeaf;
