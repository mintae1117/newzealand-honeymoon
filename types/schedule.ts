export interface Activity {
  time: string;
  title: string;
  description?: string;
  emoji?: string;
  // 설명 아래에 보여줄 이미지 경로 (public/ 기준, 예: 렌트카 픽업 지도)
  image?: string;
}

export interface Tip {
  text: string;
}

export interface Accommodation {
  name: string;
  options: string[];
  note?: string | null;
  // 예약 페이지 바로가기 (예: Booking.com 링크)
  url?: string | null;
}

export interface LinkInfo {
  label: string;
  url: string;
}

export interface DaySchedule {
  id: number;
  day: number;
  date: string;
  day_of_week: string;
  title: string;
  subtitle?: string | null;
  region: "south" | "north" | "travel";
  drive_info?: string | null;
  is_rest_day: boolean;
  activities: Activity[];
  tips: Tip[];
  accommodation?: Accommodation | null;
  links: LinkInfo[];
}

export interface Memo {
  id: string;
  day_id: number;
  content: string;
  created_at: string;
  updated_at: string;
}
