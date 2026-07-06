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
  layout.tsx          # 루트 레이아웃 (모바일 viewport, max-w-lg)
  page.tsx            # 홈 페이지 (리스트 ↔ 디테일 전환)
  globals.css         # 글로벌 스타일
  api/auth/           # 비밀번호 인증 API
    route.ts          # POST (로그인) / DELETE (로그아웃)
    check/route.ts    # GET (인증 상태 확인)
components/           # UI 컴포넌트
  Header.tsx          # 상단 헤더 + 지역 필터 (전체/남섬/북섬/이동) + 데이터 소스 토글
  DayCard.tsx         # 리스트 카드
  DayDetail.tsx       # 상세 화면 (타임라인, 팁, 숙소, 링크, 메모)
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

### Components
- 재사용 가능한 UI 컴포넌트는 `components/` 디렉토리에 배치
- 컴포넌트 파일명은 PascalCase (예: `DayCard.tsx`)

### Code Style
- 한국어 주석 사용 가능
- 함수형 컴포넌트 + 화살표 함수 선호
- `'use client'` 디렉티브는 필요한 컴포넌트에만 명시
