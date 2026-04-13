# SCK Analysis Page

회사에서 유지보수/개발 중인 **SCK (Semiconductor Chip Kit) 플랫폼**의 기술 구조를 모바일 1페이지에 시각화한 정적 분석 랜딩. 신혼여행 앱과는 별개 목적의 포트폴리오성 서브 페이지.

경로: `/sck`

---

## SCK 플랫폼이란

반도체 테스트 장비(프로버/테스터)에서 생성되는 **STDF(Standard Test Data Format) 파일**을 실시간으로 수집·파싱·분석·시각화하는 사내 플랫폼. 3개의 핵심 리포지토리로 구성된 이벤트 기반 파이프라인:

```
[반도체 테스트 장비] → Kafka → Flink → Spring → Redis → React
```

핵심 특성:
- **장비서버(sck-project)**는 생산 라인 장비 옆에 설치되는 경량 에이전트
- **관리서버(sck-server-spring)**는 여러 장비서버로부터 데이터를 수집·저장·분석, 실시간 SSE로 웹에 푸시
- **Flink 서브모듈**이 Kafka→HTTP 브릿지 역할 (체크포인트로 이벤트 유실 방지)
- 웹 UI(React + Vite)는 실시간 대시보드, 장비 관리, Lot 분석, 알람 UI를 제공

---

## 리포지토리 1: sck-project (장비서버)

생산 라인 장비 옆에서 돌아가는 경량 서버. 파일 감지 → Kafka 발행 → FTP 제공.

### 기술 스택
- **Language**: Java 17 toolchain, Java 8 bytecode (구형 장비 호환 위해 `options.release = 8`)
- **Framework**: Spring Boot 2.7.18 (Controller 모듈만 사용, 나머지는 순수 Java)
- **DB**: SQLite 3.45 (단일 파일 `agent.db`)
- **FTP**: Apache FtpServer 1.2 + Apache MINA 2.2
- **Messaging**: Kafka 3.6 (pure `kafka-clients`, Spring Kafka 미사용)
- **STDF Parser**: 자체 `stdf-parser-core-1.0.0.jar`
- **Compression**: GZIP / LZ4 / ZSTD (JNI 기반)

### 5개 서브모듈

| 모듈 | 타입 | 포트 | 역할 |
|---|---|---|---|
| **controller** | Spring Boot | 30080 | 중앙 REST API, WebSocket(STOMP over SockJS `/ws`), 모듈 오케스트레이션, React 프론트엔드 호스팅 |
| **worker** | 순수 Java JAR | — | NIO.2 WatchService 파일 감지, Kafka 발행, STDF 스트리밍 파싱(옵션) |
| **sender** | 순수 Java JAR | 30021 (FTP) | Apache FtpServer 기반 FTP, GZIP/LZ4/ZSTD 투명 압축 |
| **operator** | 순수 Java JAR | — | 향후 운영 기능용 (현재 미구현 placeholder) |
| **daemon** | 순수 Java JAR | — | Controller 프로세스 감시, JAR 핫패치 + 롤백 |
| **common** | 라이브러리 | — | ConfigLoader(`${key:default}` 플레이스홀더), DatabaseManager(SQLite JDBC 래퍼), SingleInstanceLock, EventLogger |

### 핵심 기술 (왜 이렇게 만들었는가)

1. **파일 감지 — Java NIO.2 WatchService**: 폴링이 아니라 커널 이벤트 기반, sub-second 반응.
2. **RENAME 처리**: WatchService는 RENAME을 직접 못 주므로, 2초 window로 CREATE/DELETE 쌍을 coalesce해서 이름 변경으로 간주.
3. **OVERFLOW 복구**: 이벤트 큐가 오버플로우하면 10분 주기 disk↔DB 전체 동기화로 보강.
4. **STDF 파싱(옵션)**: 장비서버에서도 PRR/PTR/TSR을 스트리밍 파싱해 Kafka `stdf.record.{equipmentId}`로 발행 가능. 기본은 관리서버에서 파싱.
5. **FTP 투명 압축**: `AutoCompressFileSystemView`가 클라이언트가 요청한 확장자(.gz/.lz4/.zst)에 맞춰 on-the-fly 압축. 원본 파일은 그대로 두고 네트워크만 아낌.
6. **Kafka 버퍼링**: Kafka 장애 시 SQLite `tb_kfk_evt_bf`에 버퍼링 후 재전송. 이벤트 유실 방지.
7. **JAR 핫패치**: daemon이 `.patch` 마커 파일 감지 → 원자 swap (`current → .bak`, `.new → final`) → 30초 내 프로세스 exit 시 자동 롤백.
8. **이벤트 로깅 2중 채널**:
   - ① ERROR/WARN은 즉시 `WebClient.postAsync()`로 관리서버 `POST /api/manager/events/event-log` 전송
   - ② Health Check(30초 주기)가 `snt_yn='N'`인 로그를 배치 전송 → `POST /api/manager/events/equipment-health-check`

### SQLite 주요 테이블

| 테이블 | 용도 |
|---|---|
| `tb_eqpt_mdul` | 장비 모듈 상태 및 버전 |
| `tb_sd_file` | STDF 파일 메타데이터 및 파싱 상태 |
| `tb_ftp_usr` | FTP 사용자 자격증명 |
| `tb_evt_log` | 감사/이벤트 로그 (`snt_yn`으로 전송 추적) |
| `tb_eqpt` | 장비 정보 |
| `tb_kfk_evt_bf` | Kafka 전송 실패 시 버퍼 |

### 프론트엔드 (장비서버 내장)

Controller 모듈 안에 별도 React 프론트엔드(Vite)가 내장. 주로 장비 현장에서 모듈을 제어하는 운영 UI:
- `pages/Modules.tsx` — 모듈 제어 UI (start/stop/restart)
- `pages/Patch.tsx` — JAR 업로드 패칭
- `lib/useModuleSocket.ts` — 실시간 상태용 WebSocket 훅 (`/topic/module/status`)

`./gradlew :controller:bootJar`에 Gradle node 플러그인이 npm install + vite build를 자동 연결.

---

## 리포지토리 2: sck-server-spring (관리서버 Backend)

여러 장비서버로부터 STDF 데이터를 수집, 실시간 분석/알람, 웹 UI 제공. **핵심 비즈니스 로직이 여기에 집중**.

### 기술 스택
- **Language**: Java 17
- **Framework**: Spring Boot 3.1.6
- **ORM**: MyBatis 3.0.2 (JPA 아님 — XML Mapper + 인터페이스)
- **DB**: PostgreSQL — `sckte`(운영) + `sckpe_dev`(Trino 분석)
- **Cache/Pub-Sub**: Spring Data Redis (channel: `realtime-record`)
- **HTTP Client**: Spring WebFlux WebClient
- **Auth**: JJWT 0.12.3 (JWT 4시간 유효)
- **Config 암호화**: Jasypt
- **STDF Parser**: 자체 `stdf4j-0.0.3-SNAPSHOT.jar` (PipedStream 스트리밍)
- **API Doc**: Springdoc OpenAPI 2.2
- **Airflow 연동**: pyrolite 4.30 (Python pickle 디시리얼라이즈)

### 패키지 구조 (`com.dutchboy.demo`)

```
aspect/                              # AOP
  └── UserIdInjectAspect             # SaveDTO에 registerId/updateId 자동 주입, 로깅/에러 AOP
client/                              # 외부 API 클라이언트 (Airflow, Module)
code/
config/                              # DataSource(reader/writer 이중), Redis, JWT, Swagger
controller/                          # REST API
  ├── manager/                       # 장비·파일·알람·실시간 API
  ├── system/                        # 권한·메뉴·사용자 API
  ├── lot/
  └── airflow/
exception/
ftp/                                 # FTP 파일 처리 (장비서버에서 다운로드)
kafka/                               # Kafka 컨슈머 (현재는 주로 Redis Pub/Sub 사용)
model/
  ├── dto/
  │   └── realtime/                  # 실시간 DTO (MIR/PRR/MRR 등)
  ├── repository/                    # MyBatis Mapper 인터페이스
  │   ├── reader/                    # 읽기 전용
  │   ├── writer/                    # primary write
  │   └── analysis/                  # Trino 분석용
  └── service/
      ├── manager/alarm/             # 알람 전략/평가 (10+ 전략)
      ├── realtime/                  # Redis→메트릭→SSE 파이프라인
      ├── sse/                       # SSE 퍼블리셔 (6개)
      └── impl/                      # Service 구현체
scheduler/                           # 4개 스케줄러
util/
  ├── JwtInterceptor                 # ThreadLocal UserContext 주입
  └── typehandler/                   # Bytea, LocalDateTime, StringArray, SmallIntArray
```

리소스:
```
resources/
├── application.yaml                 # Spring 설정
├── globals.properties
├── logback-spring.xml
├── i18n/*.yaml                      # 다국어 메시지 (messageKey 관리)
└── sqlmap/mapper/
    ├── reader/**/*.xml
    ├── writer/**/*.xml
    └── analysis/**/*.xml
```

### 3개 DataSource (읽기/쓰기/분석 격리)

| DataSource | 용도 | 접속 |
|---|---|---|
| `readerDataSource` | 읽기 전용 replica | `rnd3.ai-biz.net:5432/sckte` |
| `writerDataSource` | primary write | `rnd3.ai-biz.net:5432/sckte` |
| `analysisReaderDataSource` | Trino 분석용 | `rnd3.ai-biz.net:15432/sckpe_dev` |

Custom TypeHandler: `ByteaTypeHandler`, `LocalDateTimeTypeHandler`, `StringArrayTypeHandler`, `SmallIntArrayTypeHandler`.

### STDF 주요 테이블

`tb_stdf_file`, `tb_stdf_part`, `tb_lot`, `tb_wafer`, `tb_bin`, `tb_sdr`, `tb_product`

### 실시간 메트릭 파이프라인 (플랫폼 심장)

```
Redis Pub/Sub channel "realtime-record"
  ↓
RedisRealtimeSubscriber           ← MIR/PRR/MRR 레코드 수신 (JSON single/array/newline-delimited)
  ↓
RealtimeSessionStateService       ← 장비별 fileSno 기반 in-memory 스냅샷
                                    (PRR 첫 수신 시 DB에서 lazy load, MRR 시 refresh)
  ↓
RealtimeMetricsAggregator         ← 4개 워커 스레드, 500ms마다 dirty 메트릭 배치 publish
                                    (total yield%, hard/soft bin rate, site yield 병합)
  ↓                   ↓
DashboardSseService   EquipmentSseService
                      RuleAlarmEvaluator → AlarmSseService
```

실제 구현 클래스 (요약 말고 전체):
- `RedisRealtimeSubscriber` — Redis Pub/Sub 수신
- `RealtimeSessionStateService` — 장비별 세션 상태
- `RealtimeMetricsAggregator` — 배치 집계 (핵심)
- `RealtimeMetricsPublisher` — SSE 송출
- `RealtimeBinSnapshotResolver` / `RealtimeSiteSnapshotResolver` — 스냅샷 해결
- `PartDeltaMapper`, `PrrGapTracker` — Part delta / PRR 공백 추적
- `StreamingActivityTracker` — 스트리밍 활성도
- `MetricsDirtyListener` — dirty 마킹 리스너
- `MiniHeatmapPreviewMetaCacheService` — 미니 히트맵 프리뷰 캐시

페이지에서는 4단계로 **의도적으로 단순화**해서 보여줌.

### SSE 서비스 6종 (백엔드)

| 서비스 | 엔드포인트 | 역할 |
|---|---|---|
| `DashboardSseService` | `/api/manager/equipment/real-time/sse` | 전체 장비 overview (yield/상태) |
| `EquipmentSseService` | (장비별) | 장비 상세 메트릭 |
| `ManagementSseService` | `/api/manager/equipment/management/sse` | 패치/관리 업데이트 |
| `AlarmSseService` | `/api/alarms/unconfirmed/sse` | 알람 이벤트 스트림 |
| `EventLogSseService` | `/api/manager/equipment/{sno}/event-logs/sse` | 이벤트 로그 |
| `EventLogSsePublisher` | (내부) | 이벤트 로그 퍼블리시 브리지 |

### 알람/규칙 시스템

**`RuleStrategyCatalog` 팩토리**로 전략 패턴 관리. 새 규칙 추가가 플러그인처럼 쉬움. 실제 10개 전략:

**Bin 계열 (5)**
- `BinCountOverStrategy` — Bin 카운트 초과
- `BinRateStrategy` — Bin 비율 초과
- `BinConsecutiveStrategy` — 연속 Bin 발생
- `BinDetectedStrategy` — Bin 감지
- `DefectBinConsecutiveStrategy` — 불량 Bin 연속

**Yield / Time / 기타 (5)**
- `YieldBelowStrategy` — 수율 임계치 미만
- `SiteYieldBelowStrategy` — Site별 수율 미만
- `TestTimeShortStrategy` — 테스트 시간 짧음
- `DeltaAboveStrategy` — 변화량 초과
- `StreamingTimeOutStrategy` — 스트리밍 타임아웃

지원 클래스: `BinRuleSupport`, `PrrSequenceSupport`, `RuleConfigValueSupport`, `RuleEvaluationContext`, `RuleEvaluationStrategy`, `StreamingTimeoutSnapshot`.

**상태 머신**: `NORMAL → ALERT → ACKNOWLEDGE → SUPPRESS`
- `ConcurrentHashMap` 기반 `stateMap`
- 규칙 캐시 30초 TTL

페이지 mockdata는 대표 9개만 보여줌(`BinDetectedStrategy` 생략).

### Scheduler 4종

| 스케줄러 | 역할 |
|---|---|
| `EquipmentHealthCheckScheduler` | 30초 주기 장비 상태 체크 + 이벤트 로그 배치 전송 |
| `PrrGapRecoveryScheduler` | PRR 시퀀스 공백 복구 |
| `StreamingTimeOutScheduler` | 스트리밍 타임아웃 감지 |
| `RealtimeConnectionStatusScheduler` | 실시간 연결 상태 추적 |

### STDF 스트리밍 파싱

- **FTP 동기화**: `FtpSyncController` + `FtpClientWrapper`로 장비서버 Sender에서 다운로드
- **스트리밍 파싱**: `StdfChunkRealtimeBuffer` (max batch 300, max keys 2000) + `StdfRealtimeRecordHandler`
- **아키텍처**: `PipedInputStream`/`PipedOutputStream` — 다운로드와 파싱이 동시 진행
- **RecordVisitor 패턴**: 파싱과 처리 로직 분리

### 인증

- **JWT**: 4시간 유효, `Authorization: Bearer <token>`
- **JwtInterceptor**: 요청마다 ThreadLocal `UserContext` 주입
- **UserIdInjectAspect (AOP)**: SaveDTO 상속 객체에 `registerId`/`updateId` 자동 세팅 (없으면 "SYSTEM")
- **Exclusions**: `/api/login`, `/api/renew`, `/api/manager/ftp/**`, `/api/manager/events/**`

### 설정 값

- WS metrics flush: **500ms**
- Part flush: **200ms**
- Redis: `rnd3.ai-biz.net:6380`
- Airflow: `https://airflow.sft1.ai-biz.net`

### 코드 컨벤션 요약
- `@RequiredArgsConstructor`, `@Slf4j` 필수
- 상수: `static final` + UPPER_SNAKE_CASE
- Empty/null check: `StringUtils`, `CollectionUtils` (static import 안 함)
- 주석과 커뮤니케이션은 한국어
- Controller URI: RESTful, 2단어 이상 시 kebab-case
- Swagger: 클래스에 `@Tag` + `@SecurityRequirement(name = "bearerAuth")`, 메서드에 `@Operation(summary)`
- DTO: 필드명 2번째 글자가 대문자면 `@JsonProperty` 명시 (예: `aName` → `@JsonProperty("aName")`)
- 예외: `DemoException(HttpStatus, messageKey, args...)` 사용, messageKey는 `i18n/*.yaml`에 정의

---

## 리포지토리 3: flink-job (Streaming 서브모듈)

`sck-server-spring` 안에 서브모듈로 포함. **Kafka → Spring HTTP API 브릿지**. STDF 자체 파싱은 하지 않음.

### 기술 스택
- Apache Flink 1.20
- Java 17
- `flink-connector-kafka 4.0.0-2.0`
- Jackson, Apache Commons Net
- Shadow JAR (fat jar)

### 단일 Job: `FileIngestJob`

```
Kafka source (topic: file-ready)
  ↓ JsonToEvent       ← FileReadyEvent 파싱
  ↓ CallApiSyncFn     ← HTTP POST /api/manager/ftp/stream/{equipmentId}
  ↓ EventToJson
  ↓ Kafka sink (topic: file-status)
```

### 핵심 수치
- **체크포인트**: 10초 간격 (at-least-once)
- **HTTP 타임아웃**: 10분 (대용량 STDF 대응)
- **설정 우선순위**: CLI args → env/sysprop → OS defaults

### 왜 Flink인가?
단순 브릿지처럼 보이지만 **체크포인트 기반 fault tolerance가 핵심**. file-ready 이벤트가 소실되지 않고, API 호출 실패 시 재처리 보장.

---

## 리포지토리 4: sck-server-react (관리서버 Frontend)

`sck-server-spring/src/main/frontend` 경로에 위치 — **백엔드 레포 내부에 공존**. GitLab 상으로는 별도 프로젝트 ID 70(`sck-server-react`)로도 관리.

### 기술 스택

| 분류 | 기술 |
|---|---|
| Build | **Vite 7** |
| UI | React 18.2 + TypeScript 5.9 (strict) |
| 상태 | Zustand 5 (전역) + TanStack React Query 5.8 (서버) |
| 스타일 | Styled Components 6 (Theme 시스템) + Tailwind CSS 3.3 (PostCSS) |
| 테이블 | TanStack Table 8 + TanStack Virtual 3 |
| 차트 | Chart.js / Billboard.js / D3.js / Plotly.js |
| i18n | react-i18next 14 (ko/en) |
| DnD | react-dnd 16 |
| 레이아웃 | react-resizable-panels 3 |
| 테스트 | Vitest 4 + React Testing Library + MSW 2.7 + Storybook 10.2 |

### 개발 명령어
```bash
npm run dev          # http://localhost:3000, /api → http://localhost:8080 프록시
npm run build        # tsc + vite build
npm run preview
npm test             # Vitest
npm run storybook    # http://localhost:6006
```

### 환경변수
- Vite 방식: `import.meta.env.VITE_*` (CRA의 `process.env.REACT_APP_*` 금지)
- 주요 변수: `VITE_MODE`, `VITE_GRAFANA_TOKEN`
- 파일: `.env` / `.env.local` / `.env.development` / `.env.production`

### 경로 별칭
`tsconfig.json`의 `baseUrl: "src"`로 절대 import:
```typescript
import { useAuthStore } from 'stores';  // ✅
import { useAuthStore } from '../../../stores';  // ❌
```

### 프로젝트 구조

```
src/
├── apis/                    # API 레이어
│   ├── queries/             # useQuery 훅
│   │   ├── equipmentmanagement/
│   │   ├── equipmentstate/
│   │   └── system/
│   ├── mutations/           # useMutation 훅
│   ├── apiKeyConfig.ts      # 쿼리 키 정의
│   └── apiUrlConfig.ts      # API URL 정의
├── components/              # 공통 컴포넌트
│   ├── common/              # Button, Input, StateDisplay, TruncatedText 등
│   ├── datatable/           # 레거시 Table (유지보수용)
│   ├── table/               # DataTable (신규 권장)
│   ├── layout/              # ResizablePanelLayout, PanelContainer, PanelContent
│   ├── modal/
│   ├── charts/
│   └── equipment/           # EquipmentStatus, AlarmRealtime, ModuleList
├── features/frame/          # 화면별 도메인
│   ├── RealtimeDashboard/
│   ├── EquipmentManagement/
│   ├── DataAnalysis/
│   ├── system/
│   ├── DS/                  # 실험적 기능
│   └── Frame.tsx            # programId → 컴포넌트 매핑 라우터
├── hooks/                   # 공통 훅 (SSE 등)
├── models/
│   ├── interfaces/
│   ├── types/
│   └── defaults/
├── stores/                  # Zustand 16+ 스토어
│   ├── base/
│   ├── system/
│   └── [feature]Store.ts
├── styles/theme.ts          # lightTheme / darkTheme
├── context/ThemeContext.tsx # 다크모드 (localStorage: sck-theme-mode)
├── utils/
├── i18n/locales/
└── vite-env.d.ts
```

### Frame 아키텍처

**`Frame.tsx`가 programId → 컴포넌트 매핑 라우터** 역할. 각 sub-frame은 표준 구조(`components/`, `hooks/`, `index.ts` barrel export) 따름.

#### RealtimeDashboard (4 sub-frames)
- `RealtimeDashboard` — 메인 대시보드 (grid/list 뷰)
- `EquipmentDetail` — 장비 상세 (WaferMap, HeatmapGrid, 토글 탭)
- `EditLayout` — 그리드 레이아웃 편집
- `Config` — 설정

#### EquipmentManagement (6 sub-frames)
- `ManagementList` — 장비 CRUD
- `ModuleDeploy` — 모듈 배포
- `FileList` — 파일 목록
- `Rule` — 규칙 관리 (+ `ruleTypeDefinitions.ts`)
- `Alarm` — 알람
- `FileExplorer` — 파일 탐색기 (자체 `useControllerSSE` 훅)

#### DataAnalysis (4 sub-frames)
- `LotOverview`, `LotAnalysis`, `LotDetail`, `EquipmentAnalysis`

#### system (16 sub-frames, 관리자 화면)
`authority`, `commonCode`, `commonCodeType`, `department`, `errorHistory`, `loginHistory`, `menu`, `menuAuthority`, `message`, `program`, `searchCombo`, `searchPopup`, `systemHistory`, `userAuthMapping`, `userAuthority`, `userInfo`

### 실시간 SSE 훅 (프론트)

4개 훅이 React Query 캐시를 직접 업데이트:

| 훅 | 엔드포인트 | 역할 |
|---|---|---|
| `useDashboardSSE` | `/api/manager/equipment/real-time/sse` | 실시간 yield/상태, exponential backoff 재연결 (1s→30s) |
| `useManagementSSE` | `/api/manager/equipment/management/sse` | 패치/관리 업데이트 |
| `useAlarmSSE` | `/api/alarms/unconfirmed/sse` | 알람 + 토스트 |
| `useEventLogSSE` | `/api/manager/equipment/{sno}/event-logs/sse` | 이벤트 로그, infinite scroll prepend, evtSno dedup |

### Zustand Store (총 18개)

**Base (4)** — sessionStorage persist
- `authStore`, `menuStore`, `selectStore`, `layoutStore`

**도메인 (10)**
- `equipmentStateStore`, `equipmentManagementStore`
- `alarmStore`, `patchStore`, `moduleVersionStore`
- `sharedEquipmentStore`, `ruleStore`
- `lotAnalysisStore`, `lotDetailStore`, `lotOverviewStore`

**System (4)**
- `formManagementStore`, `historyManagementStore`, `standardInformationStore`, `systemConfigurationStore`

**유틸리티**
- `resetAllStores()` — 로그아웃 시 전체 리셋

### 테마 시스템

- styled-components `ThemeProvider` 기반
- localStorage: `sck-theme-mode`
- HTML `data-theme` 속성 적용
- `GlobalStyle.tsx`에서 다크모드 시 Tailwind 유틸리티 색상 오버라이드

주요 테마 색상:

| 용도 | 키 | 라이트 | 다크 |
|---|---|---|---|
| 배경 | `surface` | `#ffffff` | `#111827` |
| 대체 배경 | `surfaceAlt` | `#f9fafb` | `#1f2937` |
| 선택/강조 | `surfaceMuted` | `#f3f4f6` | `#273044` |
| 기본 텍스트 | `textPrimary` | `#111827` | `#f9fafb` |
| 보조 텍스트 | `textSecondary` | `#374151` | `#e5e7eb` |
| 기본 테두리 | `borderDefault` | `#e5e7eb` | `#334155` |
| 브랜드 액센트 | `brandAccent` | `#3b82f6` | `#60a5fa` |

### i18n 전략
메뉴 ID 기반 key 매핑 (예: `"1000300": "레이아웃 편집"`). `menu.*`, `equipmentState.*`, `lot.*`, `system.*` 같은 도메인별 네임스페이스.

### 코딩 패턴 요약
- **List 페이지**: Loading/Error/Empty 3상태 처리 → 본문은 `ResizablePanelLayout` (왼쪽 테이블 + 오른쪽 InfoPanel)
- **커스텀 훅**: 반환 타입 인터페이스 export 필수 (`UseFeatureListReturn`)
- **컴포넌트**: Props 타입 export, Named export + default export 병행
- **Barrel export** (`index.ts`): 필수 — Frame별 components/, hooks/
- **Store**: `create()(persist(..., { name, storage: createJSONStorage(() => sessionStorage), partialize }))`, reset 함수 필수
- **API Query**: `[feature]Keys = { all, list, detail }` 구조, `client.get/post` 래퍼 사용
- **API Mutation**: 내부 함수도 `use` 접두사(`useFeatureSaveMutation`), export는 `useSaveFeature` 형태, 성공 시 `queryClient.invalidateQueries`

### 명명 규칙

| 구분 | 패턴 | 예시 |
|---|---|---|
| 컴포넌트 | PascalCase | `ManagementTable` |
| 커스텀 훅 | `use` + PascalCase | `useEquipmentStateList` |
| Store | `use` + Feature + Store | `useEquipmentStateStore` |
| Query 훅 | `use` + Feature + Query | `useEquipmentListQuery` |
| Mutation 훅 | `useSave/useDelete` + Feature | `useSaveEquipment` |
| 타입/인터페이스 | `I` + PascalCase | `IEquipment` |
| Props 타입 | Component + `Props` | `ManagementTableProps` |
| Hook 반환 타입 | `Use` + Hook + `Return` | `UseEquipmentStateListReturn` |

---

## STDF 파일의 여정 (전체 플로우 한 눈에)

1. **장비**가 STDF 파일 생성 → 디스크에 저장
2. **sck-project Worker**가 NIO.2 WatchService로 감지 → SQLite `tb_sd_file` insert → Kafka `file-ready` 발행
3. **flink-job**이 `file-ready` 소비 → `sck-server-spring` `POST /api/manager/ftp/stream/{equipmentId}` 호출 (체크포인트 10초로 유실 방지)
4. **sck-server-spring**이 장비서버 Sender에 FTP 접속 → 파일 다운로드 (on-the-fly 압축)
5. **stdf4j 스트리밍 파서**가 PipedStream으로 레코드 파싱 (MIR/PRR/MRR/PTR…) → **PostgreSQL** 저장
6. 파싱 중 레코드를 **Redis channel `realtime-record`**에 publish
7. `RedisRealtimeSubscriber` 수신 → `RealtimeSessionStateService` 상태 업데이트 → `RealtimeMetricsAggregator`가 500ms 배치 → `RuleAlarmEvaluator` 평가
8. **SSE**로 프론트엔드에 push → React Query 캐시 업데이트 → UI 리렌더 (WaferMap, 차트, 알람)

---

## 신뢰성 메커니즘 (계층별 Fault Tolerance)

| 계층 | 전략 |
|---|---|
| 장비서버 (sck-project) | Kafka 장애 시 SQLite 버퍼링(`tb_kfk_evt_bf`), JAR 핫패치 30초 롤백, FTP graceful shutdown, daemon 60초 내 5회 실패 시 exit (무한 재시작 방지) |
| Flink | 체크포인트 10초 (at-least-once), HTTP 타임아웃 10분 (대용량 대응) |
| 관리서버 | Reader/Writer DB 분리, 알람 규칙 30초 TTL 캐시, Redis 세션 상태 복구, SSE exponential backoff 재연결 |
| 프론트엔드 | SSE dedup (`evtSno`), Infinite scroll prepend, Zustand sessionStorage persist, React Query 캐시 invalidation |

---

## 핵심 설계 포인트 (왜 이렇게 만들었는가)

1. **하이브리드 메시징** — Flink는 체크포인트가 필요한 `file-ready` 처리에, Redis Pub/Sub은 저지연 메트릭 전파에. 각각 다른 보증 수준을 상황에 맞게 활용.
2. **장비서버 경량화** — Worker/Sender/Operator/Daemon은 순수 Java (Spring 없음), Controller만 Spring Boot. 낡은 장비 리소스 고려한 설계.
3. **STDF 파싱 이중화** — Worker에서 옵션으로 파싱하거나, 관리서버에서 FTP 받아 파싱. 유연한 배치 전략.
4. **알람 전략 패턴** — 10+ 규칙 타입을 `RuleStrategyCatalog` 팩토리로 플러그인처럼 추가. 새 Bin/Yield 규칙 넣어도 기존 코드 수정 최소.
5. **SSE 선택 (WebSocket 아님)** — 단방향 방송에 적합, HTTP 인프라 재활용, 브라우저 자동 재연결 이득.
6. **MyBatis + 3개 DataSource** — 읽기(replica) / 쓰기(primary) / 분석(Trino) 분리로 워크로드 격리.
7. **DB 2개 운영** — `sckte`(운영 트랜잭션) vs `sckpe_dev`(Trino 분석). 분석 쿼리가 운영 OLTP에 영향 안 주도록 물리적 격리.

---

## 플랫폼 지표 (mockdata.ts의 metrics)

- 50k+ LOC
- 30+ 화면 (프론트 Frame)
- 40+ Query/Mutation 훅
- 18개 Zustand store
- 10개 알람 전략 (페이지는 9개만 표시)
- 3개 DataSource
- 6종 SSE 서비스 (프론트 훅은 4종)
- 5개 서브모듈 (장비서버)

---

## 이 페이지 자체의 기술 구조

### 파일 구조

```
app/sck/
├── page.tsx                 # 1페이지 랜딩 (섹션 11개)
├── ArchitectureDiagram.tsx  # 장비서버 → 관리서버 → 웹 3-레이어 애니메이션 다이어그램
├── mockdata.ts              # 모든 섹션 데이터 (단일 소스)
├── sck.css                  # @keyframes / 패킷 애니메이션 (⚠️ 인라인 style 금지)
└── CLAUDE.md                # 이 파일
```

### 섹션 ↔ mockdata export 매핑

| 섹션 | export | 내용 |
|---|---|---|
| Hero 지표 | `metrics` | 핵심 지표 카드 그리드 |
| Architecture 다이어그램 | (하드코딩) | `ArchitectureDiagram.tsx` 내부 |
| 4개 리포지토리 구성 | `repos` | 탭 전환 UI |
| STDF 파일의 여정 | `dataFlow` | 7 step timeline |
| sck-project 상세 | `equipSubModules` + `equipCoreTech` + `equipTables` | 서브모듈 표 + 핵심 기술 8개 + SQLite 6 테이블 |
| 관리서버 패키지 구조 | `springPackages` | `com.dutchboy.demo` 트리 |
| 실시간 메트릭 파이프라인 | `realtimePipeline` | 4단계 (요약본) |
| 4종 SSE 엔드포인트 | `sseHooks` | 프론트 훅 4개 기준 |
| 알람 전략 패턴 | `alarmStrategies` + `alarmStateMachine` | 9개 + 상태머신 |
| Frame 구조 | `frames` | 5 카테고리 |
| Zustand Store | `zustandStores` | Base/도메인/System 3 카테고리 |
| 신뢰성 메커니즘 | `reliability` | 4 계층 |
| 핵심 설계 포인트 | `designDecisions` | 7개 |

### 실제 레포와 mockdata 간 의도적 갭

페이지는 **모바일 요약 UI**라 실제 구조를 단순화함. 업데이트 시 참고:

- 알람 전략: 실제 **10개** ↔ mockdata **9개** (`BinDetectedStrategy` 생략)
- SSE 서비스: 실제 백엔드 **6개** ↔ mockdata는 **프론트 훅 4종** 기준 표시
- Scheduler: 실제 **4개** ↔ mockdata는 언급 **3개**
- Realtime 서비스: 실제 **11개 클래스** ↔ mockdata는 **4단계** 요약
- System sub-frames: 실제 **16개** ↔ mockdata는 대표 5개 + "15+" 표기

정확도가 더 필요해지면 이 CLAUDE.md의 위쪽 섹션들(ground truth)을 참고해서 mockdata만 업데이트하면 됨. page.tsx 수정 불필요.

### 스타일링 — 하이드레이션 대응 ⚠️

**클라이언트 컴포넌트 JSX 내부에 `<style>{...}</style>` 태그 금지.** React 19 + Next.js 16에서 style hoisting과 SSR 사이에 미스매치가 발생해 `"tree hydrated but some attributes...didn't match"` 에러를 유발함 (실제로 한 번 겪고 고친 이슈).

#### Do
- 애니메이션/keyframes는 **`sck.css`에 정의**, page.tsx 상단에서 `import "./sck.css"`
- `style={{ ... }}` inline prop은 **정적 데이터로 계산된 값만** 허용 (예: `paddingLeft` 인덴트 계산)

#### Don't
- JSX 안에 `<style>` 직접 작성
- `style={{ animation: '...', animationDelay: '...' }}` 로 인라인 애니메이션
- Tailwind arbitrary value로 `animate-[keyframeName_...]` 쓰고 keyframe을 JSX `<style>`에 정의하기

#### 준비된 클래스 (sck.css)
`sck-fade-in`, `sck-pulse-blue/green/purple`, `sck-packet`, `sck-packet-blue/orange/green/pink`, `sck-packet-down-25/-d08/-d16`, `sck-packet-down-15/-d04/-d08/-d12`, `sck-packet-up-3`

새 애니메이션 필요하면 같은 패턴으로 `sck.css`에 추가.

### 번들러 — Turbopack 금지 ⚠️

Next.js 16 기본 Turbopack 개발 서버가 이 페이지 컴파일 중 **64GB RAM 먹고 맥 다운된 전적** 있음. 루트 `package.json`의 dev 스크립트에 `--webpack` 플래그 유지:

```json
"dev": "next dev --webpack --port 3002"
```

프로덕션 빌드는 상관없지만 개발 중에는 반드시 webpack.

### 수정 가이드

- **내용 변경**: `mockdata.ts`의 해당 export만 수정. page.tsx는 render 로직이라 거의 건드릴 일 없음.
- **섹션 추가**: mockdata에 export 추가 → page.tsx에서 import → `SectionHeader` 패턴으로 새 `<section>` 삽입. 다크 테마 zinc-900/800 기조, 섹션마다 색 계열 한 가지로 통일:
  - 녹색 = 데이터/백엔드
  - 보라/핑크 = 프론트/Frame
  - 빨강/주황 = 알람
  - 노랑/앰버 = SSE/실시간
  - 시안 = 상태/기본

---

## 부모 프로젝트와의 관계

이 폴더는 **honeymoon-newzealand** (개인 신혼여행 앱) 안의 독립 하위 페이지. 루트 `CLAUDE.md`의 모바일 우선, Tailwind, Zustand, Supabase 규칙 중 일부만 적용:

| 루트 규칙 | SCK 페이지 적용 여부 |
|---|---|
| 모바일 우선 (`max-w-lg`) | ✅ 적용 |
| Tailwind CSS | ✅ 적용 |
| Zustand | ❌ 미사용 (로컬 `useState`만) |
| Supabase | ❌ 미사용 (정적 mockdata) |
| i18n `t()` 함수 (루트 feedback 메모리) | ❌ 이 페이지는 한국어 하드코딩. 포트폴리오성이라 다국어 처리 안 함. **루트 메모리 `feedback_i18n_rule.md`는 honeymoon 본체에만 해당.** |

공유하는 건 모바일 레이아웃 기조와 dark 테마 정도.
