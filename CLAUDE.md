# Honeymoon New Zealand

신혼여행(뉴질랜드)에서 개인적으로 사용할 모바일 웹 앱.
여행 중 필요한 정보 확인, 일정 관리, 여행 기록을 위한 용도.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Backend/DB**: Supabase (Auth, Database, Storage)
- **Deployment**: Vercel
- **Package Manager**: npm

## Project Structure

```
app/                  # Next.js App Router 페이지 및 레이아웃
  layout.tsx          # 루트 레이아웃
  page.tsx            # 홈 페이지
  globals.css         # 글로벌 스타일
public/               # 정적 파일
```

## Commands

- `npm run dev` — 개발 서버 실행
- `npm run build` — 프로덕션 빌드
- `npm run start` — 프로덕션 서버 실행
- `npm run lint` — ESLint 실행

## Architecture Guidelines

### Mobile First
- 이 앱은 모바일 뷰가 핵심. 모든 UI는 모바일(375px~) 기준으로 먼저 설계
- 데스크톱 대응은 불필요. 모바일 최적화에 집중
- 터치 인터랙션, 적절한 탭 타겟 크기(최소 44px), 스크롤 동작 고려

### Path Alias
- `@/*` 경로 별칭 사용 (tsconfig.json에 설정됨)
- 예: `import { something } from '@/lib/utils'`

### Styling
- Tailwind CSS 유틸리티 클래스 사용
- 인라인 스타일이나 CSS 모듈 지양
- 다크모드 지원 (`dark:` prefix 활용)

### State Management (Zustand)
- 글로벌 상태는 Zustand store로 관리
- store 파일은 `store/` 디렉토리에 배치
- 슬라이스 패턴으로 도메인별 분리

### Supabase
- Supabase 클라이언트 설정은 `lib/supabase.ts`에 배치
- 서버 컴포넌트에서는 서버용 클라이언트, 클라이언트 컴포넌트에서는 브라우저용 클라이언트 사용
- 환경 변수: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `.env.local` 파일에 환경변수 저장 (절대 커밋하지 않음)

### Components
- 재사용 가능한 UI 컴포넌트는 `components/` 디렉토리에 배치
- 페이지 전용 컴포넌트는 해당 라우트 디렉토리 내에 배치
- 컴포넌트 파일명은 PascalCase (예: `TripCard.tsx`)

### Code Style
- 한국어 주석 사용 가능
- 함수형 컴포넌트 + 화살표 함수 선호
- `'use client'` 디렉티브는 필요한 컴포넌트에만 명시
