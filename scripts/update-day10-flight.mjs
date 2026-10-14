// day 10(11/10, id 10) 국내선 제트스타 JQ232 상세를 Supabase 에 반영하고 lib/mock-data.ts 를 DB 스냅샷으로 재생성한다.
// 2026-10-14 작성. DB 가 일시중지 상태라 lib/mock-data.ts 에만 먼저 수동 반영해 두었다 — DB 재개 후 한 번 실행할 것.
// id 는 0-based(2026-08-03 renumber 이후) 기준. 실행: node scripts/update-day10-flight.mjs
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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

const DAY_ID = 10;

// 제트스타 예약 확인 화면(2026-08-01 예약) 기준
const FLIGHT_ACTIVITIES = [
  {
    time: "오전",
    emoji: "🚗",
    title: "렌트카 반납 (크라이스트처치 공항)",
    description: "반납 후 국내선 터미널로 이동 · 09:55 출발 전 여유 있게",
  },
  {
    time: "09:55 출발",
    emoji: "✈️",
    title: "제트스타 JQ232 크라이스트처치 → 오클랜드",
    description: "에어버스 A320 · 이코노미(스타터 운임) · 비행 1시간 20분 · 크라이스트처치 국내선 터미널",
  },
  { time: "11:15 도착", emoji: "🛬", title: "오클랜드 도착", description: "오클랜드 국내선 터미널" },
];
const FLIGHT_TIPS = [
  { text: "제트스타 JQ232 (2026.08.01 예약) · 탑승객 MS Naeun Kim, MR Mintae Kim" },
  { text: "수하물 1인당 휴대 7kg + 위탁 25kg · 좌석은 아직 미지정(좌석 선택 가능)" },
];

const { data: day, error: dErr } = await supabase.from("schedules").select("*").eq("id", DAY_ID).single();
if (dErr) throw dErr;
if (day.title !== "오클랜드 이동") {
  console.error(`id ${DAY_ID} 가 "오클랜드 이동" 이 아니라 "${day.title}" — id 기준이 바뀐 듯, 중단`);
  process.exit(1);
}

// 앞 3개(렌트카 반납·국내선·도착)만 교체하고 나머지(점심·스카이타워·…)는 유지
const activities = [...FLIGHT_ACTIVITIES, ...day.activities.slice(3)];
const tips = [...FLIGHT_TIPS, ...day.tips.filter((t) => !t.text.startsWith("제트스타") && !t.text.startsWith("수하물"))];

const { error } = await supabase
  .from("schedules")
  .update({ drive_info: "국내선 JQ232 09:55 → 11:15 (1시간 20분)", activities, tips })
  .eq("id", DAY_ID);
if (error) {
  console.error("업데이트 실패:", error.message);
  process.exit(1);
}
console.log(`day ${DAY_ID} ✔ JQ232 상세 반영`);

// --- mock-data.ts 재생성 (DB 스냅샷과 항상 동일하게 유지) ---
const { data: schedules, error: sErr } = await supabase.from("schedules").select("*").order("id", { ascending: true });
if (sErr) throw sErr;
const { data: memos, error: mErr } = await supabase.from("memos").select("*").order("created_at", { ascending: true });
if (mErr) throw mErr;

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
const pickMemo = (m) => ({ id: m.id, day_id: m.day_id, content: m.content, created_at: m.created_at, updated_at: m.updated_at });

const today = new Date().toISOString().slice(0, 10);
const content = `import { DaySchedule, Memo } from "@/types/schedule";

// Supabase DB 스냅샷 (${today} 기준)
// 네트워크 오류/지연 시 폴백으로만 사용. 이 데이터를 보는 동안에는 수정 불가.
export const MOCK_SCHEDULES: DaySchedule[] = ${JSON.stringify(schedules.map(pickSchedule), null, 2)};

export const MOCK_MEMOS: Memo[] = ${JSON.stringify(memos.map(pickMemo), null, 2)};
`;
writeFileSync(path.join(root, "lib/mock-data.ts"), content);
console.log(`\nlib/mock-data.ts 재생성 완료 (schedules ${schedules.length}건, memos ${memos.length}건)`);
