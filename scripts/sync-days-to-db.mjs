// lib/mock-data.ts 에 수동으로 반영해 둔 날짜(day 1·3·10: 렌트카 Apex 4202766, 국내선 제트스타 JQ232)를
// Supabase 에 올리고, lib/mock-data.ts 를 DB 스냅샷으로 재생성한다.
// 2026-10-14 작성. DB 가 일시중지 상태라 mock-data 에만 먼저 반영해 두었다 — DB 재개 후 한 번 실행할 것.
// id 는 0-based(2026-08-03 renumber 이후). 실행: node scripts/sync-days-to-db.mjs
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
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// 올릴 날짜와, id 가 어긋났을 때 막기 위한 제목
const TARGETS = { 1: "퀸즈타운 도착", 3: "곤돌라 & 키위파크", 10: "오클랜드 이동" };

// mock-data.ts 의 MOCK_SCHEDULES 를 그대로 읽는다 (단일 출처)
const mockSrc = readFileSync(path.join(root, "lib/mock-data.ts"), "utf8");
const m = mockSrc.match(/export const MOCK_SCHEDULES: DaySchedule\[\] = (\[[\s\S]*?\]);\n\nexport const MOCK_MEMOS/);
if (!m) throw new Error("lib/mock-data.ts 에서 MOCK_SCHEDULES 를 찾지 못함");
const local = Object.fromEntries(JSON.parse(m[1]).map((d) => [d.id, d]));

for (const [id, title] of Object.entries(TARGETS)) {
  const day = local[id];
  if (!day || day.title !== title) {
    console.error(`mock-data day ${id} 제목이 "${title}" 이 아님 — 중단`);
    process.exit(1);
  }
  const { data: remote, error: rErr } = await supabase.from("schedules").select("id,title").eq("id", Number(id)).single();
  if (rErr) throw rErr;
  if (remote.title !== title) {
    console.error(`DB day ${id} 제목이 "${remote.title}" — id 기준이 다른 듯, 중단`);
    process.exit(1);
  }
  const { error } = await supabase
    .from("schedules")
    .update({ drive_info: day.drive_info, activities: day.activities, tips: day.tips, links: day.links })
    .eq("id", Number(id));
  if (error) {
    console.error(`day ${id} 업데이트 실패:`, error.message);
    process.exit(1);
  }
  console.log(`day ${id} ✔ ${title}`);
}

// --- mock-data.ts 재생성 (DB 스냅샷과 항상 동일하게 유지) ---
const { data: schedules, error: sErr } = await supabase.from("schedules").select("*").order("id", { ascending: true });
if (sErr) throw sErr;
const { data: memos, error: mErr } = await supabase.from("memos").select("*").order("created_at", { ascending: true });
if (mErr) throw mErr;

const pickSchedule = (s) => ({
  id: s.id, day: s.day, date: s.date, day_of_week: s.day_of_week, title: s.title, subtitle: s.subtitle,
  region: s.region, drive_info: s.drive_info, is_rest_day: s.is_rest_day,
  activities: s.activities, tips: s.tips, accommodation: s.accommodation, links: s.links,
});
const pickMemo = (x) => ({ id: x.id, day_id: x.day_id, content: x.content, created_at: x.created_at, updated_at: x.updated_at });

const today = new Date().toISOString().slice(0, 10);
const content = `import { DaySchedule, Memo } from "@/types/schedule";

// Supabase DB 스냅샷 (${today} 기준)
// 네트워크 오류/지연 시 폴백으로만 사용. 이 데이터를 보는 동안에는 수정 불가.
export const MOCK_SCHEDULES: DaySchedule[] = ${JSON.stringify(schedules.map(pickSchedule), null, 2)};

export const MOCK_MEMOS: Memo[] = ${JSON.stringify(memos.map(pickMemo), null, 2)};
`;
writeFileSync(path.join(root, "lib/mock-data.ts"), content);
console.log(`\nlib/mock-data.ts 재생성 완료 (schedules ${schedules.length}건, memos ${memos.length}건)`);
