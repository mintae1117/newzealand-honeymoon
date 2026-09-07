import { dayCoordinates } from "@/lib/day-coordinates";
import DayMapClient from "./DayMapClient";

// 좌표가 있는 날짜의 전체화면 지도를 정적으로 미리 만들어 둔다 (상세 페이지와 같은 이유).
export function generateStaticParams() {
  return Object.keys(dayCoordinates).map((id) => ({ id }));
}

export default function DayMapPage() {
  return <DayMapClient />;
}
