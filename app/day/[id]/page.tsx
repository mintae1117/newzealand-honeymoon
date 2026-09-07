import { MOCK_SCHEDULES } from "@/lib/mock-data";
import DayPageClient from "./DayPageClient";

// 14일 상세 페이지를 빌드 시 정적으로 미리 만들어 둔다.
// 동적 렌더(ƒ)였을 때는 카드를 탭할 때마다 서버 응답을 기다려야 해서 네트워크가 나쁘면
// 아무 반응 없이 멈춘 것처럼 보였고, 이미 본 날짜로 돌아가도 매번 다시 받아왔다.
// 정적(●)이면 CDN에서 바로 내려오고 <Link>가 미리 받아둬 끊기는 네트워크에서도 이동이 된다.
// 스냅샷에 없는 id는 dynamicParams 기본값(true)에 따라 요청 시 렌더된다.
export function generateStaticParams() {
  return MOCK_SCHEDULES.map((d) => ({ id: String(d.id) }));
}

export default function DayPage() {
  return <DayPageClient />;
}
