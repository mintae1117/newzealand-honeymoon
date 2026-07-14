"use client";

import { useEffect, useRef, useState } from "react";
import { Lock, X, Eye, EyeOff } from "lucide-react";

interface PasswordModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
  login: (password: string) => Promise<boolean>;
}

interface PasswordModalContentProps {
  onSuccess: () => void;
  onClose: () => void;
  login: (password: string) => Promise<boolean>;
}

const PasswordModalContent = ({
  onSuccess,
  onClose,
  login,
}: PasswordModalContentProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const handleSubmit = async () => {
    if (!password.trim() || loading) return;
    setLoading(true);
    setError("");

    const success = await login(password);
    setLoading(false);

    if (success) {
      onSuccess();
    } else {
      setError("비밀번호가 틀렸습니다");
      setPassword("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/45" onClick={onClose} />

      <div className="relative w-full max-w-xs bg-[var(--card)] rounded-2xl p-5 shadow-xl border border-[var(--line)]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 text-[var(--ink)]/40 hover:text-[var(--ink)]/70 active:opacity-60 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-[var(--fern-tint)] flex items-center justify-center">
            <Lock size={14} className="text-[var(--fern-deep)]" />
          </div>
          <h3 className="font-disp text-sm font-black text-[var(--ink)]">
            비밀번호 입력
          </h3>
        </div>

        <div className="relative">
          <input
            ref={inputRef}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="비밀번호를 입력하세요"
            className="w-full px-3 py-2.5 pr-10 rounded-xl bg-[var(--paper)] text-sm text-[var(--ink)] placeholder-[var(--ink)]/35 border border-[var(--line)] focus:outline-none focus:border-[var(--ink)]/40"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[var(--ink)]/40 hover:text-[var(--ink)]/70 active:opacity-60 transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={!password.trim() || loading}
          className="w-full mt-3 py-2.5 rounded-xl bg-[var(--ink)] text-[var(--paper)] text-sm font-semibold disabled:opacity-30 active:scale-[0.98] transition-all"
        >
          {loading ? "확인 중..." : "확인"}
        </button>
      </div>
    </div>
  );
};

const PasswordModal = ({
  isOpen,
  onSuccess,
  onClose,
  login,
}: PasswordModalProps) => {
  if (!isOpen) return null;

  return (
    <PasswordModalContent
      onSuccess={onSuccess}
      onClose={onClose}
      login={login}
    />
  );
};

export default PasswordModal;
