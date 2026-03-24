import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/api/auth/route";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  Accommodation,
  Activity,
  DaySchedule,
  LinkInfo,
} from "@/types/schedule";

const COOKIE_NAME = "edit_token";

interface UpdateScheduleBody {
  activities?: Activity[];
  accommodation?: Accommodation | null;
  links?: LinkInfo[];
}

const isActivityArray = (value: unknown): value is Activity[] => {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as Activity).time === "string" &&
        typeof (item as Activity).title === "string" &&
        ((item as Activity).description === undefined ||
          typeof (item as Activity).description === "string") &&
        ((item as Activity).emoji === undefined ||
          typeof (item as Activity).emoji === "string"),
    )
  );
};

const isAccommodation = (value: unknown): value is Accommodation | null => {
  if (value === null) return true;

  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Accommodation).name === "string" &&
    Array.isArray((value as Accommodation).options) &&
    (value as Accommodation).options.every(
      (option) => typeof option === "string",
    ) &&
    ((value as Accommodation).note === undefined ||
      (value as Accommodation).note === null ||
      typeof (value as Accommodation).note === "string")
  );
};

const isLinkArray = (value: unknown): value is LinkInfo[] => {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as LinkInfo).label === "string" &&
        typeof (item as LinkInfo).url === "string",
    )
  );
};

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  let body: UpdateScheduleBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const updates: UpdateScheduleBody = {};

  if ("activities" in body) {
    if (!isActivityArray(body.activities)) {
      return NextResponse.json(
        { error: "activities 형식이 올바르지 않습니다." },
        { status: 400 },
      );
    }
    updates.activities = body.activities;
  }

  if ("accommodation" in body) {
    if (!isAccommodation(body.accommodation)) {
      return NextResponse.json(
        { error: "accommodation 형식이 올바르지 않습니다." },
        { status: 400 },
      );
    }
    updates.accommodation = body.accommodation;
  }

  if ("links" in body) {
    if (!isLinkArray(body.links)) {
      return NextResponse.json(
        { error: "links 형식이 올바르지 않습니다." },
        { status: 400 },
      );
    }
    updates.links = body.links;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "변경할 데이터가 없습니다." },
      { status: 400 },
    );
  }

  const { id } = await context.params;
  const dayId = Number(id);

  if (!Number.isInteger(dayId)) {
    return NextResponse.json(
      { error: "잘못된 일정 ID입니다." },
      { status: 400 },
    );
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("schedules")
      .update(updates)
      .eq("id", dayId)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "일정 저장에 실패했습니다." },
        { status: 500 },
      );
    }

    return NextResponse.json({ schedule: data as DaySchedule });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("SUPABASE_SERVICE_ROLE_KEY")
    ) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "일정 저장 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
