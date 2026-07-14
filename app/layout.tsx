import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// 제목·메모의 손글씨(온글잎 박다현체)는 globals.css의 @font-face로 로드한다 —
// 실제 사람 손글씨 폰트라 next/font/google에 없음.

export const metadata: Metadata = {
  title: "뉴질랜드 신혼여행",
  description: "2026.10.31 ~ 11.13 뉴질랜드 신혼여행 일정",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} antialiased max-w-lg mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
