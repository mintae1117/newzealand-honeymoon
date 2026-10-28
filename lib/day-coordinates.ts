// 각 DAY별 방문 장소 좌표 (일정의 이벤트별 장소, OpenStreetMap Nominatim 지오코딩)
export interface LocationPin {
  label: string;
  lat: number;
  lng: number;
  // 숙소 핀 (침대 아이콘 + road 컬러로 구분 표시)
  type?: "stay";
}

// 확정 숙소 좌표 (booking.com 숙소 지도 좌표 기준)
const STAYS: Record<string, LocationPin> = {
  queenstown: { label: "Alexis Motor Lodge", lat: -45.034328, lng: 168.669764, type: "stay" },
  wanaka: { label: "Aspiringlofts", lat: -44.682288, lng: 169.132571, type: "stay" },
  tekapo: { label: "Shepherd's View", lat: -44.007576, lng: 170.477435, type: "stay" },
  christchurch: { label: "Urban Retreat", lat: -43.539275, lng: 172.634704, type: "stay" },
  auckland: { label: "Imagine Beach Road", lat: -36.846341, lng: 174.772333, type: "stay" },
};

// day number → 좌표 매핑 (DAY 0 = 출발일, 활동 순서대로, 마지막은 그날 묵는 숙소)
export const dayCoordinates: Record<number, LocationPin[]> = {
  // 출발: 인천 → 브리즈번 경유 → 퀸즈타운
  0: [
    { label: "인천공항", lat: 37.4635, lng: 126.4417 },
    { label: "Brisbane 공항", lat: -27.3876, lng: 153.1216 },
    { label: "Queenstown 공항", lat: -45.0193, lng: 168.7434 },
  ],
  // 퀸즈타운 도착: 공항 → 시내
  1: [
    { label: "Queenstown 공항", lat: -45.0193, lng: 168.7434 },
    { label: "Queenstown Waterfront", lat: -45.0333, lng: 168.6578 },
    STAYS.queenstown,
  ],
  // 밀포드사운드 당일투어: 07:07 Copthorne Lakeview 픽업(숙소 건너편) → 테아나우 휴식 → 밀포드로드 포토스팟 → 크루즈
  2: [
    { label: "픽업 · Copthorne Lakeview", lat: -45.0342, lng: 168.6704 },
    { label: "Te Anau", lat: -45.4145, lng: 167.7175 },
    { label: "Mirror Lakes", lat: -45.0284, lng: 168.011 },
    { label: "Homer Tunnel", lat: -44.7642, lng: 167.981 },
    { label: "Milford Sound", lat: -44.619, lng: 167.8688 },
    STAYS.queenstown,
  ],
  // 곤돌라+루지 → 1번 버스 → 렌트카 픽업(14:00, Apex 공항점) → 키위파크(곤돌라 베이스 바로 아래)
  3: [
    { label: "Skyline Gondola", lat: -45.0283, lng: 168.6561 },
    { label: "Fergburger", lat: -45.0317, lng: 168.6595 },
    { label: "Apex 렌트카 (32 Lucas Pl)", lat: -45.0244, lng: 168.7368 },
    { label: "Kiwi Park", lat: -45.0289, lng: 168.6572 },
    STAYS.queenstown,
  ],
  // 퀸즈타운 자유일: 온천(10시 확정) / 애로우타운(선택) / 글레노키 / 와이너리 / 디너
  4: [
    { label: "Onsen Hot Pools", lat: -44.981, lng: 168.6854 },
    { label: "Arrowtown", lat: -44.9406, lng: 168.8351 },
    { label: "Glenorchy", lat: -44.8497, lng: 168.3852 },
    { label: "Gibbston Valley Winery", lat: -45.0123, lng: 168.9152 },
    { label: "Botswana Butchery", lat: -45.0334, lng: 168.6617 },
    STAYS.queenstown,
  ],
  // Wanaka 로 이동: Crown Range Summit 정차 → Puzzling World → Wanaka
  5: [
    { label: "Crown Range Summit", lat: -44.9925, lng: 168.9386 },
    { label: "Puzzling World", lat: -44.6975, lng: 169.1616 },
    { label: "Wanaka Tree", lat: -44.6984, lng: 169.1176 },
    { label: "Wanaka 시내", lat: -44.6942, lng: 169.1365 },
    STAYS.wanaka,
  ],
  // Wanaka: Diamond Lake · Rocky Mountain 트레킹(OSM 주차장·Rocky Peak 좌표) → Lavender Farm / Rippon
  6: [
    { label: "Glendhu Bay", lat: -44.6739, lng: 169.0151 },
    { label: "Diamond Lake 주차장", lat: -44.6511, lng: 168.9594 },
    { label: "Rocky Mountain 정상 (775m)", lat: -44.6397, lng: 168.9695 },
    { label: "Wanaka 시내", lat: -44.6942, lng: 169.1365 },
    { label: "Wanaka Tree", lat: -44.6984, lng: 169.1176 },
    { label: "Wanaka Lavender Farm", lat: -44.7031, lng: 169.1864 },
    { label: "Rippon Winery", lat: -44.6949, lng: 169.1047 },
    STAYS.wanaka,
  ],
  // 테카포로 이동: 린디스패스 → 클레이클리프 → 푸카키 → 테카포
  7: [
    { label: "Lindis Pass", lat: -44.5883, lng: 169.6431 },
    { label: "Omarama", lat: -44.4879, lng: 169.9656 },
    { label: "Clay Cliffs 주차장", lat: -44.4888, lng: 169.8723 },
    { label: "Twizel", lat: -44.2575, lng: 170.0994 },
    { label: "Lake Pukaki Viewpoint · Mt Cook Alpine Salmon", lat: -44.19, lng: 170.1405 },
    { label: "Church of the Good Shepherd", lat: -44.0033, lng: 170.4825 },
    { label: "Lake Tekapo", lat: -44.0045, lng: 170.4777 },
    STAYS.tekapo,
  ],
  // 테카포 자유일: 후커밸리(선택) / 별 관측
  8: [
    { label: "Peter's Lookout", lat: -44.0891, lng: 170.1357 },
    { label: "White Horse Hill 주차장 (Hooker Valley 출발)", lat: -43.7197, lng: 170.0929 },
    { label: "Hooker Lake", lat: -43.676, lng: 170.1104 },
    { label: "The Old Mountaineer's Cafe", lat: -43.7327, lng: 170.0958 },
    { label: "Blue Lakes 주차장 (Tasman 출발)", lat: -43.6978, lng: 170.1629 },
    { label: "Tasman Glacier View", lat: -43.6682, lng: 170.1744 },
    { label: "Lake Tekapo", lat: -44.0045, lng: 170.4777 },
    { label: "Dark Sky Project", lat: -44.0034, lng: 170.4775 },
    STAYS.tekapo,
  ],
  // 크라이스트처치로 이동: 페얼리 파이 → 시내
  9: [
    { label: "Fairlie Bakehouse", lat: -44.0986, lng: 170.8295 },
    { label: "Riverside Market", lat: -43.5339, lng: 172.634 },
    { label: "Botanic Gardens", lat: -43.5303, lng: 172.6206 },
    { label: "Cardboard Cathedral", lat: -43.5323, lng: 172.6431 },
    STAYS.christchurch,
  ],
  // 오클랜드 이동: 렌트카 반납 → 국내선 → 시내
  10: [
    { label: "Christchurch 공항", lat: -43.4852, lng: 172.5355 },
    { label: "Sky Tower", lat: -36.8485, lng: 174.7622 },
    { label: "Viaduct Harbour", lat: -36.8432, lng: 174.7607 },
    STAYS.auckland,
  ],
  // 호빗마을 & 와이토모 당일치기 (GetYourGuide 가이드 투어, 숙소 픽업·하차)
  11: [
    { label: "Hobbiton (Matamata)", lat: -37.8579, lng: 175.6809 },
    { label: "Waitomo Glowworm Caves", lat: -38.2609, lng: 175.1035 },
    STAYS.auckland,
  ],
  // 오클랜드 마지막 날: 차 없이 (북섬 렌트카 미예약) 쇼핑·카페 → 시내 숙소
  12: [
    { label: "Downtown Ferry Terminal (Pier 11)", lat: -36.8425, lng: 174.7674 },
    { label: "Matiatia Wharf", lat: -36.7805, lng: 174.9921 },
    { label: "Oneroa", lat: -36.7819, lng: 175.0098 },
    { label: "Mudbrick Vineyard", lat: -36.7923, lng: 175.0002 },
    { label: "Onetangi Beach", lat: -36.7873, lng: 175.0767 },
    { label: "Tantalus Estate", lat: -36.7999, lng: 175.0682 },
    { label: "Commercial Bay · Aotea Gifts", lat: -36.844, lng: 174.7665 },
    { label: "Britomart (디너)", lat: -36.8441, lng: 174.7689 },
    { label: "Woolworths Quay St", lat: -36.8452, lng: 174.7728 },
    STAYS.auckland,
  ],
  // 귀국: 오클랜드 → 인천 직항
  13: [
    { label: "Auckland 공항", lat: -37.0066, lng: 174.7903 },
    { label: "인천공항", lat: 37.4635, lng: 126.4417 },
  ],
};
