"use client";

import { useEffect, useState } from "react";
import { MessageSquarePlus, Trash2, StickyNote } from "lucide-react";
import { useScheduleStore } from "@/store/schedule-store";
import PasswordModal from "@/components/PasswordModal";

interface MemoSectionProps {
  dayId: number;
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
}

const MemoSection = ({ dayId, isAuthenticated, login }: MemoSectionProps) => {
  const {
    memos,
    memosLoading,
    isFallback,
    dataSource,
    fetchMemos,
    addMemo,
    deleteMemo,
  } = useScheduleStore();
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    fetchMemos(dayId);
  }, [dayId, fetchMemos]);

  const requireAuth = (action: () => void) => {
    if (isAuthenticated) {
      action();
    } else {
      setPendingAction(() => action);
      setShowPasswordModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowPasswordModal(false);
    pendingAction?.();
    setPendingAction(null);
  };

  const doSubmit = async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;
    setSending(true);
    await addMemo(dayId, trimmed);
    setInput("");
    setSending(false);
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    requireAuth(doSubmit);
  };

  const handleDelete = (memoId: string) => {
    requireAuth(() => deleteMemo(memoId));
  };

  return (
    <section className="bg-[var(--card)] rounded-2xl p-4 border border-[var(--line-soft)] shadow-[0_1px_2px_rgba(38,34,27,0.06)]">
      <h2 className="font-disp text-[18px] font-black text-[var(--ink)] mb-3 flex items-center gap-2">
        <StickyNote size={16} className="text-[var(--fern)]" />
        여행 기록
      </h2>

      {/* 입력 (폴백 모드에서는 수정 불가) */}
      {isFallback ? (
        <p className="text-xs text-[var(--road-deep)] mb-3">
          {dataSource === "mock"
            ? "목데이터 모드에서는 기록을 남길 수 없어요."
            : "서버 연결이 원활하지 않아 기록 작성이 잠시 불가능해요."}
        </p>
      ) : (
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="오늘의 한 줄을 남겨보세요..."
            className="flex-1 min-w-0 px-3 py-2.5 rounded-xl bg-[var(--paper)] text-sm text-[var(--ink)] placeholder-[var(--ink)]/35 border border-[var(--line)] focus:outline-none focus:border-[var(--ink)]/40"
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || sending}
            className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--ink)] text-[var(--paper)] disabled:opacity-30 active:scale-95 transition-all"
          >
            <MessageSquarePlus size={18} />
          </button>
        </div>
      )}

      {/* 메모 리스트 — 손글씨 일기 */}
      {memosLoading ? (
        <p className="text-xs text-[var(--ink)]/40 text-center py-4">
          불러오는 중...
        </p>
      ) : memos.length === 0 ? (
        <p className="font-hand text-lg text-[var(--ink)]/35 text-center py-4">
          아직 기록이 없어요. 첫 줄을 남겨보세요 ✏️
        </p>
      ) : (
        <div className="space-y-2">
          {memos.map((memo) => (
            <div
              key={memo.id}
              className="flex items-start justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[var(--paper)] border border-[var(--line-soft)]"
            >
              <div className="min-w-0 flex-1">
                <p className="font-hand text-[19px] leading-snug text-[var(--ink)]/85 whitespace-pre-wrap wrap-break-word">
                  {memo.content}
                </p>
                <p className="text-[10px] text-[var(--ink)]/30 mt-1">
                  {new Date(memo.created_at).toLocaleString("ko-KR", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {!isFallback && (
                <button
                  onClick={() => handleDelete(memo.id)}
                  className="shrink-0 p-1.5 text-[var(--ink)]/25 active:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {/* 비밀번호 모달 */}
      <PasswordModal
        isOpen={showPasswordModal}
        onSuccess={handleAuthSuccess}
        onClose={() => {
          setShowPasswordModal(false);
          setPendingAction(null);
        }}
        login={login}
      />
    </section>
  );
};

export default MemoSection;
