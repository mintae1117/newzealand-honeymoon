// ⚠️ 재실행 금지: 1-based day id(2026-08-03 renumber 이전) 기준의 일회성 스크립트.
//    지금 DB는 0-based라 그대로 실행하면 엉뚱한 날짜에 반영됨. 참고용으로만 보관.
// 렌트카 일정 변경에 따른 day 3 ↔ day 4 교체 (2026-08-03).
// - day 3: 밀포드사운드 당일투어 (렌트카 불필요, 투어버스)
// - day 4: 곤돌라 & 애로우타운 + 오후 렌트카 픽업
// - day 2: 렌트카 픽업 제거 (택시/버스 이동), 운전 팁은 day 4로 이동
// 실행: node scripts/swap-day3-day4.mjs
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

const UPDATES = {
  // 도착일: 렌트카 픽업 제거 → 택시/버스 이동
  2: {
    activities: [
      { time: "11.01 15:35 퀸즈타운 도착", emoji: "🛬", title: "퀸즈타운 도착" },
      {
        time: "",
        emoji: "🚕",
        title: "택시/버스로 숙소 이동",
        description: "공항에서 숙소까지 차로 10분 (렌트카는 DAY 4 오후 픽업)",
      },
      { time: "오후", emoji: "🏨", title: "숙소 체크인 후 휴식" },
      { time: "", emoji: "🚶", title: "시내 가볍게 산책" },
      { time: "저녁", emoji: "🍽️", title: "워터프론트에서 디너" },
    ],
    tips: [
      { text: "시차 적응 - 무리하지 않기!" },
      { text: "다음 날 새벽 밀포드 투어 출발 - 일찍 자기!" },
    ],
  },
  // 밀포드사운드 당일투어 (기존 day 4)
  3: {
    title: "밀포드사운드 당일투어",
    subtitle: null,
    drive_info: "왕복 ~12시간 (투어)",
    activities: [
      {
        time: "새벽",
        emoji: "🚌",
        title: "투어버스 출발",
        description: "직접 운전보다 편하게!",
      },
      {
        time: "",
        emoji: "📸",
        title: "밀포드로드 드라이브",
        description: "미러레이크, 호머터널 등 포토스팟",
      },
      {
        time: "낮",
        emoji: "🚢",
        title: "밀포드사운드 크루즈 (약 2시간)",
        description: "피오르드 절벽, 폭포, 물개",
      },
      { time: "저녁", emoji: "🏠", title: "퀸즈타운 복귀" },
    ],
    tips: [
      { text: "숙소 그대로! 짐 안 옮겨도 됨" },
      { text: "투어 사전 예약 필수 - 숙소 픽업 가능한 투어 추천 (아직 차 없음)" },
      { text: "멀미약 챙기기 (버스 구간 구불구불)" },
    ],
    links: [
      { url: "https://realnz.com", label: "RealNZ 투어" },
      { url: "https://milford-sound.co.nz", label: "밀포드사운드" },
    ],
  },
  // 곤돌라 & 애로우타운 + 오후 렌트카 픽업 (기존 day 3)
  4: {
    title: "곤돌라 & 애로우타운",
    subtitle: "퀸즈타운",
    drive_info: "애로우타운 20분",
    activities: [
      {
        time: "오전",
        emoji: "🎿",
        title: "스카이라인 곤돌라 + 루지",
        description: "퀸즈타운 전경, 재미있는 루지",
      },
      { time: "점심", emoji: "🍔", title: "퍼그버거 (유명 버거집)" },
      {
        time: "오후",
        emoji: "🚗",
        title: "렌트카 픽업",
        description: "여기부터 남섬 드라이브 시작!",
      },
      {
        time: "",
        emoji: "🏘️",
        title: "애로우타운 드라이브",
        description: "금광 마을, 예쁜 거리 산책, 카페에서 여유",
      },
      { time: "저녁", emoji: "🌙", title: "시내에서 자유롭게" },
    ],
    tips: [
      { text: "국제운전면허증 + 한국 면허증 둘 다 지참 (렌트카 필수)" },
      { text: "좌측통행! 첫 운전은 천천히" },
    ],
    links: [
      { url: "https://skyline.co.nz/queenstown", label: "스카이라인" },
      { url: "https://arrowtown.com", label: "애로우타운" },
    ],
  },
};

for (const [id, updates] of Object.entries(UPDATES)) {
  const { error } = await supabase
    .from("schedules")
    .update(updates)
    .eq("id", Number(id));
  if (error) {
    console.error(`day ${id} 업데이트 실패:`, error.message);
    process.exit(1);
  }
  console.log(`day ${id} ✔ ${updates.title ?? "(활동/팁만 수정)"}`);
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
