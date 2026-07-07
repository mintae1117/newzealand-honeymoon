"use client";

import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { dayCoordinates } from "@/lib/day-coordinates";

// Leaflet은 window에 의존하므로 SSR 제외 (DayDetail과 동일)
const MapSection = dynamic(() => import("@/components/MapSection"), {
  ssr: false,
});

export default function DayMapPage() {
  const params = useParams();
  const router = useRouter();
  const dayNumber = Number(params.id);

  // 좌표가 없는 잘못된 경로면 상세로 돌려보낸다
  if (!dayCoordinates[dayNumber]) {
    router.replace(`/day/${params.id}`);
    return null;
  }

  return <MapSection dayNumber={dayNumber} fullscreen />;
}
