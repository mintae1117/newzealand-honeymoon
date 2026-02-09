export interface Activity {
  time: string;
  title: string;
  description?: string;
  emoji?: string;
}

export interface Tip {
  text: string;
}

export interface Accommodation {
  name: string;
  options: string[];
  note?: string | null;
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
  region: 'south' | 'north' | 'travel';
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
