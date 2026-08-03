// DAY 번호를 0부터 시작하도록 전환 (2026-08-03).
// DAY N = 11월 N일이 되어 날짜와 번호가 일치 (DAY 0 = 10/31 출발일).
// - schedules: id 1~14 → 0~13, day 1~14 → 0~13 (URL /day/[id]와 지도 좌표 키가 id===day 전제)
// - memos: day_id도 함께 시프트 (FK 안전을 위해 백업 → 삭제 → 재삽입)
// - "DAY 4 오후 픽업" 같은 본문 속 DAY 참조도 새 번호로 수정
// 실행: node scripts/renumber-days-zero-based.mjs (재실행 방지 가드 있음)
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

// --- 가드: 현재 id가 정확히 1~14일 때만 진행 (이미 전환됐으면 중단) ---
const { data: current, error: curErr } = await supabase
  .from("schedules")
  .select("id")
  .order("id", { ascending: true });
if (curErr) throw curErr;

const ids = current.map((r) => r.id);
const expected = Array.from({ length: 14 }, (_, i) => i + 1);
if (JSON.stringify(ids) !== JSON.stringify(expected)) {
  console.error(`중단: 현재 id가 1~14가 아닙니다 (${ids.join(",")}). 이미 전환됐거나 상태가 다릅니다.`);
  process.exit(1);
}

// --- 1. 본문 속 DAY 참조 수정 (아직 1-based인 id=2의 도착일 활동) ---
const { data: arrival, error: aErr } = await supabase
  .from("schedules")
  .select("activities")
  .eq("id", 2)
  .single();
if (aErr) throw aErr;

const fixedActivities = arrival.activities.map((a) =>
  a.description
    ? { ...a, description: a.description.replace("DAY 4 오후 픽업", "DAY 3 오후 픽업") }
    : a,
);
{
  const { error } = await supabase
    .from("schedules")
    .update({ activities: fixedActivities })
    .eq("id", 2);
  if (error) throw error;
  console.log("도착일 활동의 DAY 참조 수정 ✔ (DAY 4 → DAY 3)");
}

// --- 2. 메모 백업 후 삭제 (schedules id 변경 시 FK 충돌 방지) ---
const { data: memoBackup, error: mbErr } = await supabase
  .from("memos")
  .select("*")
  .order("created_at", { ascending: true });
if (mbErr) throw mbErr;
console.log(`메모 백업: ${memoBackup.length}건`);

if (memoBackup.length > 0) {
  const { error } = await supabase
    .from("memos")
    .delete()
    .in("id", memoBackup.map((m) => m.id));
  if (error) throw error;
}

// --- 3. schedules id/day 시프트 (오름차순이라 대상 id가 항상 비어 있음) ---
for (let oldId = 1; oldId <= 14; oldId++) {
  const { error } = await supabase
    .from("schedules")
    .update({ id: oldId - 1, day: oldId - 1 })
    .eq("id", oldId);
  if (error) {
    console.error(`id ${oldId} → ${oldId - 1} 시프트 실패:`, error.message);
    console.error("메모 백업본이 스크립트 로그에 없으므로 수동 복구 필요:", JSON.stringify(memoBackup));
    process.exit(1);
  }
}
console.log("schedules id/day 시프트 완료 (1~14 → 0~13)");

// --- 4. 메모 재삽입 (day_id 시프트, 원본 id/타임스탬프 유지) ---
if (memoBackup.length > 0) {
  const shifted = memoBackup.map((m) => ({ ...m, day_id: m.day_id - 1 }));
  const { error } = await supabase.from("memos").insert(shifted);
  if (error) {
    console.error("메모 재삽입 실패:", error.message);
    console.error("수동 복구용 백업본:", JSON.stringify(shifted));
    process.exit(1);
  }
  console.log(`메모 재삽입 완료: ${shifted.length}건 (day_id -1)`);
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
console.log(schedules.map((s) => `DAY ${s.day} = ${s.date} ${s.title}`).join("\n"));
