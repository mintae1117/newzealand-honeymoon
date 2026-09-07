# Honeymoon New Zealand

신혼여행(뉴질랜드)에서 개인적으로 사용할 모바일 웹 앱.
여행 중 필요한 정보 확인, 일정 관리, 여행 기록을 위한 용도.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Backend/DB**: Supabase (Database)
- **Deployment**: Vercel
- **Package Manager**: npm
- **Icons**: lucide-react

## Project Structure

```
app/                  # Next.js App Router 페이지 및 레이아웃
  layout.tsx          # 루트 레이아웃 (모바일 viewport, max-w-lg, 손글씨 폰트 지연 로더)
  page.tsx            # 홈 페이지 (일정 리스트, 뜬 뒤 유휴 시간에 14일 상세 프리페치)
  error.tsx           # 렌더 오류(JS 조각 로드 실패 등) 시 빈 화면 대신 "다시 불러오기" 화면
  globals.css         # 글로벌 스타일
  day/[id]/
    page.tsx          # 서버 래퍼: generateStaticParams 로 14일 상세를 정적 프리렌더(●)
    DayPageClient.tsx # 상세 화면 클라이언트 (스토어에서 day 조회 → DayDetail)
    map/page.tsx      # 서버 래퍼 (정적 프리렌더) → DayMapClient.tsx (전체화면 지도)
  api/auth/           # 비밀번호 인증 API
    route.ts          # POST (로그인) / DELETE (로그아웃)
    check/route.ts    # GET (인증 상태 확인)
  api/schedules/[id]/route.ts  # PATCH 일정 수정 (service role)
components/           # UI 컴포넌트
  Header.tsx          # 상단 헤더 + 지역 필터 (전체/남섬/북섬/이동) + 데이터 소스 토글
  DayCard.tsx         # 리스트 카드
  DayDetail.tsx       # 상세 화면 (타임라인, 팁, 숙소, 링크, 지도, 메모)
  MapSection.tsx      # Leaflet 지도 (카드/전체화면 공용, ssr:false)
  DateLeaf.tsx        # 달력 낱장 날짜 뱃지
  HandwritingFontLoader.tsx  # 손글씨 폰트(1MB)를 페이지 로드 후 FontFace API로 등록
  MemoSection.tsx     # 날짜별 메모 CRUD
  PasswordModal.tsx   # 비밀번호 입력 모달
hooks/                # 커스텀 훅
  useAuth.ts          # 인증 상태 관리 훅
store/                # Zustand 스토어
  schedule-store.ts   # 일정 fetch, 필터, 메모, 데이터 소스(실데이터/목데이터) 및 폴백 관리
lib/                  # 유틸리티
  supabase.ts         # Supabase 클라이언트
  mock-data.ts        # DB 스냅샷 목데이터 (폴백/목데이터 모드용)
types/                # 타입 정의
  schedule.ts         # DaySchedule, Memo 등
scripts/              # 스크립트
  seed.ts             # Supabase 데이터 시드
public/               # 정적 파일
```

## Supabase Tables

- **schedules**: 14일 일정 데이터 (activities, tips, accommodation, links는 JSONB)
- **memos**: 날짜별 메모 (day_id로 schedules 참조)

## Commands

- `npm run dev` — 개발 서버 실행 (port 3002)
- `npm run build` — 프로덕션 빌드
- `npm run start` — 프로덕션 서버 실행
- `npm run lint` — ESLint 실행

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `EDIT_PASSWORD` — 수정/삭제 보호용 비밀번호 (서버 전용, NEXT_PUBLIC_ 없음)
- `.env.local` 파일에 저장 (절대 커밋하지 않음)

## Architecture Guidelines

### Mobile First
- 이 앱은 모바일 뷰가 핵심. 모든 UI는 모바일(375px~) 기준으로 먼저 설계
- 데스크톱 대응은 불필요. 모바일 최적화에 집중
- 터치 인터랙션, 적절한 탭 타겟 크기(최소 44px), 스크롤 동작 고려

### Path Alias
- `@/*` 경로 별칭 사용 (tsconfig.json에 설정됨)

### Styling
- Tailwind CSS 유틸리티 클래스 사용
- 인라인 스타일이나 CSS 모듈 지양
- 다크모드 지원 (`dark:` prefix 활용)

### State Management (Zustand)
- 글로벌 상태는 Zustand store로 관리
- store 파일은 `store/` 디렉토리에 배치

### Supabase
- 클라이언트 설정은 `lib/supabase.ts`
- RLS 정책 적용됨 (개인 앱이므로 anon 접근 허용)

### Mock Data Fallback (목데이터 폴백)
- 조회가 5초 타임아웃되거나 실패하면 `lib/mock-data.ts` 스냅샷으로 자동 폴백 (`isFallback: true`)
- 폴백/목데이터 모드에서는 일정 수정·메모 작성/삭제가 모두 차단됨
- 헤더 우측 토글로 실데이터 ↔ 목데이터 수동 전환 가능, 선택은 localStorage(`honeymoon-data-source`)에 유지됨
- **중요**: DB의 schedules/memos 데이터를 변경하면 `lib/mock-data.ts`도 DB 조회 결과로 재생성해서 항상 동일하게 유지할 것

### 느린 해외 네트워크 대비 (여행 중 로밍/호텔 와이파이 기준)
- `/day/[id]`, `/day/[id]/map` 은 반드시 정적(●)으로 유지: `page.tsx`(서버)에서 `generateStaticParams` export, 클라이언트 로직은 `*Client.tsx`에.
  동적(ƒ)이 되면 날짜 이동마다 서버 응답을 기다려 네트워크가 나쁠 때 멈춘 듯 보이고, 라우터 캐시도 0초가 됨
- 날짜 간 이동(카드, 이전/다음, 돌아가기)은 `<Link prefetch>`로. `router.push`는 미리 받아두지 않아 오프라인 이동이 안 됨
- 리스트가 뜨면 `page.tsx`가 유휴 시간에 14일 상세를 모두 프리페치 → 이후 네트워크가 끊겨도 날짜 이동은 캐시로 동작
- 손글씨 폰트는 CSS `@font-face`로 선언하지 말 것. 1MB라 첫 화면 JS와 대역폭을 경쟁해 1Mbps에서 첫 로드가 15초까지 늘어남(지연 로드 시 4초)
- 폴백(`isFallback`) 중에는 메모도 네트워크 조회 없이 스냅샷 사용 (날짜마다 5초 타임아웃을 다시 기다리지 않도록)
- `app/error.tsx`는 새로고침만 제공: Next `reset()`은 실패한 JS 조각 로드를 다시 시도하지 못함(React.lazy가 실패를 기억)

### Components
- 재사용 가능한 UI 컴포넌트는 `components/` 디렉토리에 배치
- 컴포넌트 파일명은 PascalCase (예: `DayCard.tsx`)

### Code Style
- 한국어 주석 사용 가능
- 함수형 컴포넌트 + 화살표 함수 선호
- `'use client'` 디렉티브는 필요한 컴포넌트에만 명시
