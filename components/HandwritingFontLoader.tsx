"use client";

import { useEffect } from "react";

// 손글씨 폰트(온글잎 박다현체, ≈1MB)를 페이지 로드가 끝난 뒤에 받는다.
// CSS @font-face로 두면 첫 화면을 그리는 JS와 대역폭을 놓고 경쟁해, 느린 해외 네트워크(1Mbps)에서는
// 일정 카드가 뜨기까지 15초 가까이 걸렸다(폰트를 빼면 4초). 폰트는 늦게 와도 글자만 바뀌므로 뒤로 미룬다.
// 그 전까지는 시스템 폰트로 먼저 보인다(font-display: swap과 같은 동작).
const FONT_FAMILY = "Ownglyph_ParkDaHyun";
const FONT_URL =
  "https://cdn.jsdelivr.net/gh/projectnoonnu/2411-3@1.0/Ownglyph_ParkDaHyun.woff2";

const HandwritingFontLoader = () => {
  useEffect(() => {
    if (typeof FontFace === "undefined" || !document.fonts) return;
    if ([...document.fonts].some((f) => f.family === FONT_FAMILY)) return;

    let cancelled = false;
    const load = () => {
      if (cancelled) return;
      const face = new FontFace(FONT_FAMILY, `url(${FONT_URL}) format("woff2")`, {
        display: "swap",
      });
      face
        .load()
        .then((loaded) => {
          if (!cancelled) document.fonts.add(loaded);
        })
        .catch(() => {
          // 폰트를 못 받아도 시스템 폰트로 계속 보이므로 무시
        });
    };

    if (document.readyState === "complete") {
      load();
      return;
    }
    window.addEventListener("load", load, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", load);
    };
  }, []);

  return null;
};

export default HandwritingFontLoader;
