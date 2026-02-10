'use client';

import { useState, useRef, useEffect } from 'react';
import { Lock, X, Eye, EyeOff } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
  login: (password: string) => Promise<boolean>;
}

const PasswordModal = ({ isOpen, onSuccess, onClose, login }: PasswordModalProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError('');
      setShowPassword(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!password.trim() || loading) return;
    setLoading(true);
    setError('');

    const success = await login(password);
    setLoading(false);

    if (success) {
      onSuccess();
    } else {
      setError('비밀번호가 틀렸습니다');
      setPassword('');
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 모달 */}
      <div className="relative w-full max-w-xs bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-xl border border-zinc-200 dark:border-zinc-800">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 active:opacity-60 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <Lock size={14} className="text-zinc-500" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
            비밀번호 입력
          </h3>
        </div>

        <div className="relative">
          <input
            ref={inputRef}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="비밀번호를 입력하세요"
            className="w-full px-3 py-2.5 pr-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 active:opacity-60 transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-500 mt-2">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={!password.trim() || loading}
          className="w-full mt-3 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium disabled:opacity-30 active:scale-[0.98] transition-all"
        >
          {loading ? '확인 중...' : '확인'}
        </button>
      </div>
    </div>
  );
};

export default PasswordModal;
