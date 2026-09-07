"use client";

// 페이지 렌더 중 오류(네트워크 불안정으로 JS 조각을 못 받은 경우 등)가 나면
// 빈 화면 대신 다시 불러올 수 있는 화면을 보여준다.
// Next의 reset()은 실패한 JS 조각 로드를 다시 시도하지 않아(React.lazy가 실패를 기억) 새로고침으로 복구한다.
export default function Error() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-disp text-xl font-black text-[var(--ink)]">
        화면을 불러오지 못했어요
      </p>
      <p className="text-xs text-[var(--ink)]/50 leading-relaxed">
        네트워크가 불안정하면 생길 수 있어요.
        <br />
        연결을 확인한 뒤 다시 불러와 주세요.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-5 py-2.5 rounded-xl bg-[var(--ink)] text-[var(--paper)] text-sm font-semibold active:opacity-70"
      >
        다시 불러오기
      </button>
    </div>
  );
}
