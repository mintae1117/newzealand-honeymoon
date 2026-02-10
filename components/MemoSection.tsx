'use client';

import { useState } from 'react';
import { MessageSquarePlus, Trash2, StickyNote } from 'lucide-react';
import { useScheduleStore } from '@/store/schedule-store';
import PasswordModal from '@/components/PasswordModal';

interface MemoSectionProps {
  dayId: number;
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
}

const MemoSection = ({ dayId, isAuthenticated, login }: MemoSectionProps) => {
  const { memos, memosLoading, addMemo, deleteMemo } = useScheduleStore();
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

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
    setInput('');
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
    <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
        <StickyNote size={16} />
        메모
      </h2>

      {/* 입력 */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="메모를 남겨보세요..."
          className="flex-1 min-w-0 px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600"
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || sending}
          className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 disabled:opacity-30 active:scale-95 transition-all"
        >
          <MessageSquarePlus size={18} />
        </button>
      </div>

      {/* 메모 리스트 */}
      {memosLoading ? (
        <p className="text-xs text-zinc-400 text-center py-4">불러오는 중...</p>
      ) : memos.length === 0 ? (
        <p className="text-xs text-zinc-300 dark:text-zinc-600 text-center py-4">
          아직 메모가 없어요
        </p>
      ) : (
        <div className="space-y-2">
          {memos.map((memo) => (
            <div
              key={memo.id}
              className="flex items-start justify-between gap-2 px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap break-words">
                  {memo.content}
                </p>
                <p className="text-[10px] text-zinc-300 dark:text-zinc-600 mt-1">
                  {new Date(memo.created_at).toLocaleString('ko-KR', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <button
                onClick={() => handleDelete(memo.id)}
                className="shrink-0 p-1.5 text-zinc-300 dark:text-zinc-600 active:text-red-500 transition-colors"
              >
                <Trash2 size={14} />
              </button>
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
