// ⚠️ 재실행 금지: 1-based day id(2026-08-03 renumber 이전) 기준의 일회성 스크립트.
//    지금 DB는 0-based라 그대로 실행하면 엉뚱한 날짜에 반영됨. 참고용으로만 보관.
// 확정 숙소 정보를 Supabase에 반영하고 lib/mock-data.ts를 DB 스냅샷으로 재생성하는 스크립트.
// 실행: node scripts/update-accommodation.mjs
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// .env.local 로드
const env = {};
for (const line of readFileSync(path.join(root, ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
}

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

// 확정 숙소 (2026-08-01 결제 완료, booking.com)
const HOTELS = {
  queenstown: {
    options: ["알렉시스 모텔 & 아파트먼트", "69 Frankton Road, Queenstown"],
    url: "https://www.booking.com/hotel/nz/alexis-motor-lodge.ko.html?checkin=2026-11-01&checkout=2026-11-05&group_adults=2&no_rooms=1&group_children=0",
  },
  wanaka: {
    options: ["Aspiringlofts", "42 Manuka Crescent, Wanaka"],
    url: "https://www.booking.com/hotel/nz/aspiringlofts-wanaka.ko.html?checkin=2026-11-05&checkout=2026-11-07&group_adults=2&no_rooms=1&group_children=0",
  },
  tekapo: {
    options: ["Shepherd's View - Lake Tekapo", "1 Bill Apes Lane, Lake Tekapo"],
    url: "https://www.booking.com/hotel/nz/shepherd-39-s-view.ko.html?checkin=2026-11-07&checkout=2026-11-09&group_adults=2&no_rooms=1&group_children=0",
  },
  christchurch: {
    options: ["Urban Retreat in Central City Christchurch", "g10/20 Bath Street, Christchurch"],
    url: "https://www.booking.com/hotel/nz/urban-retreat-christchurch-central-city.ko.html?checkin=2026-11-09&checkout=2026-11-10&group_adults=2&no_rooms=1&group_children=0",
  },
  auckland: {
    options: ["Imagine Beach Road", "31 Beach Road, Auckland"],
    url: "https://www.booking.com/hotel/nz/imagine-beach-road.ko.html?checkin=2026-11-10&checkout=2026-11-13&group_adults=2&no_rooms=1&group_children=0",
  },
};

const acc = (name, hotel, note = null) => ({
  name,
  options: hotel.options,
  note,
  url: hotel.url,
});

// day id → accommodation
const UPDATES = {
  2: acc("퀸즈타운 (1/4박)", HOTELS.queenstown, "예약 완료 · 10/29까지 무료취소 가능"),
  3: acc("퀸즈타운 (2/4박)", HOTELS.queenstown),
  4: acc("퀸즈타운 (3/4박)", HOTELS.queenstown),
  5: acc("퀸즈타운 (4/4박)", HOTELS.queenstown),
  6: acc("와나카 (1/2박)", HOTELS.wanaka, "예약 완료 · 조식 포함 · 11/1 전까지 무료취소 가능"),
  7: acc("와나카 (2/2박)", HOTELS.wanaka),
  8: acc("테카포 (1/2박)", HOTELS.tekapo, "예약 완료 · 10/22까지 무료취소 가능"),
  9: acc("테카포 (2/2박)", HOTELS.tekapo),
  10: acc("크라이스트처치 (1박)", HOTELS.christchurch, "예약 완료 · 11/3까지 무료취소 가능"),
  11: acc("오클랜드 (1/3박)", HOTELS.auckland, "예약 완료 · 무료취소 불가"),
  12: acc("오클랜드 (2/3박)", HOTELS.auckland),
  13: acc("오클랜드 (3/3박)", HOTELS.auckland, "다음 날 오전 11:45 비행, 공항까지 차로 약 30분"),
};

for (const [id, accommodation] of Object.entries(UPDATES)) {
  const { error } = await supabase
    .from("schedules")
    .update({ accommodation })
    .eq("id", Number(id));
  if (error) {
    console.error(`day ${id} 업데이트 실패:`, error.message);
    process.exit(1);
  }
  console.log(`day ${id} ✔ ${accommodation.name} — ${accommodation.options[0]}`);
}

// --- mock-data.ts 재생성 (DB 스냅샷과 항상 동일하게 유지) ---
const { data: schedules, error: sErr } = await supabase
  .from("schedules")
  .select("*")
  .order("id", { ascending: true });
if (sErr) throw sErr;

const { data: memos, error: mErr } = await supabase
  .from("memos")
  .select("*")
  .order("created_at", { ascending: true });
if (mErr) throw mErr;

// 기존 스냅샷과 동일한 필드 순서 유지
const pickSchedule = (s) => ({
  id: s.id,
  day: s.day,
  date: s.date,
  day_of_week: s.day_of_week,
  title: s.title,
  subtitle: s.subtitle,
  region: s.region,
  drive_info: s.drive_info,
  is_rest_day: s.is_rest_day,
  activities: s.activities,
  tips: s.tips,
  accommodation: s.accommodation,
  links: s.links,
});
const pickMemo = (m) => ({
  id: m.id,
  day_id: m.day_id,
  content: m.content,
  created_at: m.created_at,
  updated_at: m.updated_at,
});

const today = new Date().toISOString().slice(0, 10);
const content = `import { DaySchedule, Memo } from "@/types/schedule";

// Supabase DB 스냅샷 (${today} 기준)
// 네트워크 오류/지연 시 폴백으로만 사용. 이 데이터를 보는 동안에는 수정 불가.
export const MOCK_SCHEDULES: DaySchedule[] = ${JSON.stringify(schedules.map(pickSchedule), null, 2)};

export const MOCK_MEMOS: Memo[] = ${JSON.stringify(memos.map(pickMemo), null, 2)};
`;

writeFileSync(path.join(root, "lib/mock-data.ts"), content);
console.log(`\nlib/mock-data.ts 재생성 완료 (schedules ${schedules.length}건, memos ${memos.length}건)`);
