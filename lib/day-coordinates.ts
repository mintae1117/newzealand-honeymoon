// 각 DAY별 주요 방문 장소 좌표
export interface LocationPin {
  label: string;
  lat: number;
  lng: number;
}

// day number → 좌표 매핑
export const dayCoordinates: Record<number, LocationPin[]> = {
  1: [
    { label: '인천공항', lat: 37.4602, lng: 126.4407 },
  ],
  2: [
    { label: '퀸즈타운', lat: -45.0312, lng: 168.6626 },
  ],
  3: [
    { label: '퀸즈타운 스카이라인', lat: -45.0285, lng: 168.6567 },
    { label: '애로우타운', lat: -44.9421, lng: 168.8272 },
  ],
  4: [
    { label: '밀포드사운드', lat: -44.6714, lng: 167.9267 },
  ],
  5: [
    { label: '퀸즈타운', lat: -45.0312, lng: 168.6626 },
  ],
  6: [
    { label: '와나카', lat: -44.6933, lng: 169.1320 },
  ],
  7: [
    { label: '와나카', lat: -44.6933, lng: 169.1320 },
  ],
  8: [
    { label: '테카포 호수', lat: -44.0047, lng: 170.4772 },
  ],
  9: [
    { label: '테카포 호수', lat: -44.0047, lng: 170.4772 },
  ],
  10: [
    { label: '크라이스트처치', lat: -43.5321, lng: 172.6362 },
  ],
  11: [
    { label: '오클랜드', lat: -36.8485, lng: 174.7633 },
  ],
  12: [
    { label: '호빗마을 (마타마타)', lat: -37.8721, lng: 175.6830 },
    { label: '와이토모 동굴', lat: -38.2609, lng: 175.1065 },
  ],
  13: [
    { label: '오클랜드', lat: -36.8485, lng: 174.7633 },
  ],
  14: [
    { label: '오클랜드 공항', lat: -37.0082, lng: 174.7850 },
  ],
};
