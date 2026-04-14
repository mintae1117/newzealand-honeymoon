// SCK 플랫폼 기술 분석 데이터

export interface Repo {
  id: string;
  name: string;
  role: string;
  icon: string;
  color: string;
  stack: { label: string; value: string }[];
  highlights: { title: string; desc: string }[];
}

export interface DataFlowStep {
  step: number;
  from: string;
  to: string;
  protocol: string;
  desc: string;
}

export interface TechDetail {
  title: string;
  items: string[];
}

export const repos: Repo[] = [
  {
    id: "sck-project",
    name: "sck-project",
    role: "장비서버",
    icon: "🏭",
    color: "from-blue-500 to-cyan-500",
    stack: [
      { label: "Language", value: "Java 17 (bytecode 8)" },
      { label: "Framework", value: "Spring Boot 2.7.18 (Controller only)" },
      { label: "DB", value: "SQLite 3.45 (단일 파일)" },
      { label: "FTP", value: "Apache FtpServer 1.2 + MINA 2.2" },
      { label: "Messaging", value: "Kafka 3.6 (pure kafka-clients)" },
      { label: "STDF Parser", value: "stdf-parser-core-1.0.0.jar" },
      { label: "Compression", value: "GZIP / LZ4 / ZSTD (JNI)" },
    ],
    highlights: [
      { title: "NIO.2 WatchService", desc: "폴링 아닌 sub-second 파일 감지" },
      {
        title: "STDF 실시간 파싱",
        desc: "direct-parsing 모드: Worker가 직접 STDF 파싱 → Kafka stdf.record.{id} 발행",
      },
      {
        title: "투명 압축 FTP",
        desc: "클라이언트 요청 확장자에 맞춰 on-the-fly 압축",
      },
      { title: "Kafka 버퍼링", desc: "장애 시 SQLite에 버퍼링 후 재전송" },
      { title: "JAR 핫패치", desc: "daemon이 원자 swap + 30초 rule 롤백" },
    ],
  },
  {
    id: "sck-server-spring",
    name: "sck-server-spring",
    role: "관리서버 (Backend)",
    icon: "⚙️",
    color: "from-green-500 to-emerald-500",
    stack: [
      { label: "Language", value: "Java 17" },
      { label: "Framework", value: "Spring Boot 3.1.6" },
      { label: "ORM", value: "MyBatis 3.0.2 (JPA 아님)" },
      { label: "DB", value: "PostgreSQL (sckte + sckpe_dev)" },
      { label: "Cache/Pub-Sub", value: "Redis (channel: realtime-record)" },
      { label: "Auth", value: "JJWT 0.12.3 (4h 유효)" },
      { label: "API Doc", value: "Springdoc OpenAPI 2.2" },
      { label: "STDF", value: "stdf4j-0.0.3 (PipedStream 스트리밍)" },
    ],
    highlights: [
      {
        title: "3개 DataSource",
        desc: "reader / writer / analysis (Trino) 분리",
      },
      {
        title: "실시간 파이프라인",
        desc: "Redis → Session → Aggregator → SSE (비동기 배치, 200ms flush)",
      },
      {
        title: "알람 전략 패턴",
        desc: "8개+ 규칙 전략 (Bin/Yield/Delta/Timeout)",
      },
      {
        title: "UserIdInject AOP",
        desc: "SaveDTO에 registerId/updateId 자동 주입",
      },
    ],
  },
  {
    id: "sck-flink",
    name: "sck-flink",
    role: "Streaming (독립 프로젝트)",
    icon: "⚡",
    color: "from-orange-500 to-red-500",
    stack: [
      { label: "Engine", value: "Apache Flink 2.0" },
      { label: "Language", value: "Java 17" },
      { label: "Kafka", value: "flink-connector-kafka 4.0.0-2.0" },
      { label: "DB", value: "PostgreSQL (HikariCP + commons-dbutils)" },
      { label: "Redis", value: "Lettuce 6.3 (커스텀 PubSub Sink)" },
      { label: "FTP", value: "Commons Net 3.8 (직접 다운로드)" },
      { label: "STDF", value: "stdf-parser-core 서브모듈" },
      { label: "Build", value: "Shadow JAR (fat jar)" },
    ],
    highlights: [
      {
        title: "2개 Job",
        desc: "FileIngestJob(FTP+파싱) + RecordWriterJob(DB 저장)",
      },
      {
        title: "FTP 청크 다운로드",
        desc: "1MB 단위 스트리밍 + 이어받기(Resume) 지원",
      },
      {
        title: "STDF 파싱",
        desc: "PipedStream 기반 스트리밍 파싱 + Pre-injection 복구",
      },
      {
        title: "DLQ",
        desc: "3회 실패 시 Dead Letter Queue → DB 저장",
      },
      {
        title: "6개 Kafka 토픽",
        desc: "file-ready/completion/status, parsing-result, realtime-record, DLQ",
      },
    ],
  },
  {
    id: "frontend",
    name: "sck-server-react",
    role: "관리서버 Frontend",
    icon: "🖥️",
    color: "from-purple-500 to-pink-500",
    stack: [
      { label: "Build", value: "Vite 7" },
      { label: "UI", value: "React 18.2 + TypeScript 5.9 strict" },
      { label: "State", value: "Zustand 5 + React Query 5.8" },
      { label: "Style", value: "Styled Components 6 + Tailwind 3.3" },
      { label: "Table", value: "TanStack Table 8 + Virtual 3" },
      { label: "Charts", value: "Chart.js / Billboard / D3 / Plotly" },
      { label: "i18n", value: "react-i18next 14 (ko/en)" },
      { label: "Test", value: "Vitest 4 + MSW 2.7 + Storybook 10.2" },
    ],
    highlights: [
      {
        title: "Frame 라우팅",
        desc: "programId 기반 Frame.tsx 매핑 (~30개 화면)",
      },
      { title: "SSE 6종", desc: "Dashboard / Equipment / Management / Alarm / EventLog / Controller" },
      {
        title: "Zustand 16+ stores",
        desc: "도메인별 분리, sessionStorage persist",
      },
      { title: "테마 시스템", desc: "light/dark + Tailwind 오버라이드" },
    ],
  },
];

export const dataFlow: DataFlowStep[] = [
  {
    step: 1,
    from: "반도체 테스트 장비",
    to: "장비서버 디스크",
    protocol: "File I/O",
    desc: "테스트 장비가 STDF 파일을 디스크에 저장",
  },
  {
    step: 2,
    from: "Worker",
    to: "SQLite + Kafka",
    protocol: "NIO.2 WatchService",
    desc: "파일 감지 → DB insert → STDF 실시간 파싱 → Kafka stdf.record.{id} 발행",
  },
  {
    step: 3,
    from: "sck-flink FileIngestJob",
    to: "Sender (FTP)",
    protocol: "Kafka file-ready → FTP 청크 다운로드",
    desc: "file-ready 소비 → 장비서버 FTP에서 1MB 청크 단위 다운로드 + STDF 파싱",
  },
  {
    step: 4,
    from: "sck-flink",
    to: "Kafka + Redis",
    protocol: "Side Output",
    desc: "파싱 결과 → Kafka parsing-result 발행 + Redis realtime-record PRR 실시간 발행",
  },
  {
    step: 5,
    from: "sck-flink RecordWriterJob",
    to: "PostgreSQL",
    protocol: "HikariCP + JDBC",
    desc: "parsing-result 소비 → Lot/Wafer/Part/Bin 등 DB 저장 + DLQ 처리",
  },
  {
    step: 6,
    from: "Redis Pub/Sub",
    to: "Spring 실시간 파이프라인",
    protocol: "realtime-record 채널",
    desc: "RedisSubscriber → SessionState → MetricsAggregator → RuleAlarmEvaluator",
  },
  {
    step: 7,
    from: "Spring SSE Publisher",
    to: "Frontend",
    protocol: "EventSource (SSE)",
    desc: "6종 SSE 엔드포인트 → React Query 캐시 → WaferMap/차트/알람 리렌더",
  },
];

export const realtimePipeline: TechDetail[] = [
  {
    title: "Redis Pub/Sub",
    items: [
      'Channel: "realtime-record"',
      "RedisRealtimeSubscriber가 MIR/PRR/MRR 레코드 수신",
      "JSON single / array / newline-delimited 지원",
    ],
  },
  {
    title: "Session State",
    items: [
      "RealtimeSessionStateService",
      "장비별 fileSno 기반 in-memory 스냅샷",
      "PRR 첫 수신 시 DB에서 lazy load, MRR 시 refresh",
    ],
  },
  {
    title: "Metrics Aggregator",
    items: [
      "RealtimeMetricsAggregator (4개 워커 스레드)",
      "500ms마다 dirty 메트릭 배치 publish",
      "total yield% / hard-soft bin rate / site yield 병합",
    ],
  },
  {
    title: "SSE Publisher",
    items: [
      "DashboardSseService — 전체 장비 overview",
      "EquipmentSseService — 장비별 상세 메트릭",
      "AlarmSseService — 알람 이벤트 스트림",
    ],
  },
];

export const alarmStrategies = [
  { name: "BinCountOverStrategy", type: "Bin", desc: "Bin 카운트 초과" },
  { name: "BinRateStrategy", type: "Bin", desc: "Bin 비율 초과" },
  { name: "BinConsecutiveStrategy", type: "Bin", desc: "연속 Bin 발생" },
  { name: "DefectBinConsecutiveStrategy", type: "Bin", desc: "불량 Bin 연속" },
  { name: "YieldBelowStrategy", type: "Yield", desc: "수율 임계치 미만" },
  { name: "SiteYieldBelowStrategy", type: "Yield", desc: "Site별 수율 미만" },
  { name: "TestTimeShortStrategy", type: "Time", desc: "테스트 시간 짧음" },
  { name: "DeltaAboveStrategy", type: "Delta", desc: "변화량 초과" },
  {
    name: "StreamingTimeOutStrategy",
    type: "Timeout",
    desc: "스트리밍 타임아웃",
  },
];

export const frames = [
  {
    category: "RealtimeDashboard",
    icon: "📊",
    items: ["RealtimeDashboard", "EquipmentDetail", "EditLayout", "Config"],
  },
  {
    category: "EquipmentManagement",
    icon: "🛠️",
    items: [
      "ManagementList",
      "ModuleDeploy",
      "FileList",
      "Rule",
      "Alarm",
      "FileExplorer",
    ],
  },
  {
    category: "DataAnalysis",
    icon: "📈",
    items: ["LotOverview", "LotAnalysis", "LotDetail", "EquipmentAnalysis"],
  },
  {
    category: "System",
    icon: "⚙️",
    items: [
      "Authority",
      "Menu",
      "UserInfo",
      "CommonCode",
      "Department",
      "...15+",
    ],
  },
  {
    category: "Airflow",
    icon: "🔄",
    items: ["AirflowDag", "AirflowTask"],
  },
];

export const reliability = [
  {
    layer: "장비서버",
    items: [
      "Kafka 장애 시 SQLite 버퍼링",
      "JAR 핫패치 30초 rule 롤백",
      "FTP graceful shutdown (30s)",
      "daemon 무한 재시작 방지 (60s 내 5회 실패 exit)",
    ],
  },
  {
    layer: "Flink",
    items: [
      "체크포인트 10초 간격 (at-least-once)",
      "HTTP 타임아웃 10분 (대용량)",
    ],
  },
  {
    layer: "관리서버",
    items: [
      "Reader/Writer DB 분리",
      "알람 규칙 30초 TTL 캐시",
      "Redis 세션 상태 복구",
      "SSE exponential backoff 재연결",
    ],
  },
  {
    layer: "프론트엔드",
    items: [
      "SSE dedup (evtSno)",
      "Infinite scroll prepend",
      "Zustand sessionStorage persist",
      "React Query 캐시 invalidation",
    ],
  },
];

export const designDecisions = [
  {
    title: "STDF 파싱 삼중 경로",
    desc: "Worker(장비 근처 즉시 파싱), Flink(FTP+파싱+DB), Spring(Flink 호출로 FTP 파싱). 상황별 유연한 배치.",
  },
  {
    title: "Flink 2-Job 분리",
    desc: "FileIngestJob(파싱)과 RecordWriterJob(DB 저장) 독립 스케일링. DLQ로 Poison 메시지 격리.",
  },
  {
    title: "장비서버 경량화",
    desc: "Worker/Sender는 순수 Java (Spring 없음), Controller만 Spring Boot. 낡은 장비 리소스 고려.",
  },
  {
    title: "관리서버 Kafka 제거",
    desc: "Spring에서 Kafka 완전 제거. Redis Pub/Sub만으로 실시간 전파. Flink가 HTTP API로 직접 호출.",
  },
  {
    title: "SSE 6종",
    desc: "WebSocket 아닌 SSE. 단방향 방송에 적합, HTTP 인프라 재활용, 브라우저 자동 재연결.",
  },
  {
    title: "전략 패턴 알람",
    desc: "10개 규칙 타입을 RuleStrategyCatalog 팩토리로 관리. 새 규칙 추가가 플러그인처럼 쉬움.",
  },
  {
    title: "3개 DataSource + DB 2개",
    desc: "reader/writer/analysis(Trino) 분리. sckte(운영) vs sckpe_dev(분석) DB 물리적 격리.",
  },
];

export const metrics = {
  lines: "50k+ LOC",
  frames: "30+ 화면",
  apis: "40+ Query/Mutation",
  stores: "16+ Zustand store",
  strategies: "10개 알람 전략",
  datasources: "3개 DataSource",
  sse: "6종 SSE Hook",
  flinkJobs: "2개 Flink Job",
};

// ─────────────────────────────────────────────
// 장비서버 서브모듈 (sck-project 구성)
// ─────────────────────────────────────────────
export interface SubModule {
  name: string;
  type: "spring" | "java";
  port: string;
  role: string;
}

export const equipSubModules: SubModule[] = [
  {
    name: "controller",
    type: "spring",
    port: "30080",
    role: "REST API · WebSocket · 모듈 오케스트레이션",
  },
  {
    name: "worker",
    type: "java",
    port: "—",
    role: "NIO.2 파일 감지 · Kafka 발행 · STDF 스트리밍 파싱(옵션)",
  },
  {
    name: "sender",
    type: "java",
    port: "30021 FTP",
    role: "FTP 서버 (GZIP/LZ4/ZSTD 투명 압축)",
  },
  {
    name: "operator",
    type: "java",
    port: "—",
    role: "(미구현 placeholder)",
  },
  {
    name: "daemon",
    type: "java",
    port: "—",
    role: "Controller 감시 · JAR 핫패치 + 30초 롤백",
  },
];

// ─────────────────────────────────────────────
// 장비서버 핵심 기술 (NIO.2, RENAME 처리, 핫패치 등)
// ─────────────────────────────────────────────
export const equipCoreTech: { title: string; desc: string }[] = [
  {
    title: "파일 감지",
    desc: "Java NIO.2 WatchService — 폴링 없이 sub-second 반응",
  },
  {
    title: "RENAME 처리",
    desc: "2초 window로 CREATE/DELETE 쌍을 coalesce해서 이름 변경 감지",
  },
  {
    title: "OVERFLOW 복구",
    desc: "WatchService 오버플로우 시 10분 주기 disk↔DB 전체 동기화",
  },
  {
    title: "STDF 실시간 파싱 (direct-parsing)",
    desc: "StdfFileProcessor가 FAR/MIR/PRR/MRR/SDR 등을 스트리밍 파싱 → Kafka stdf.record.{equipmentId} + file-status 발행",
  },
  {
    title: "FTP 투명 압축",
    desc: "AutoCompressFileSystemView — 클라이언트가 요청한 확장자(.gz/.lz4/.zst)에 맞춰 on-the-fly 압축",
  },
  {
    title: "Kafka 버퍼링",
    desc: "Kafka 장애 시 SQLite tb_kfk_evt_bf에 버퍼링 후 재전송",
  },
  {
    title: "이벤트 로깅 2중 채널",
    desc: '① ERROR/WARN은 즉시 WebClient.postAsync()로 관리서버 전송, ② 30초 Health Check로 snt_yn="N" 로그 배치 전송',
  },
  {
    title: "JAR 핫패치",
    desc: "daemon이 .patch 마커 감지 → 원자 swap(current→.bak, .new→final) → 30초 내 exit 시 롤백",
  },
];

// SQLite 테이블 태그
export const equipTables = [
  "tb_eqpt_mdul",
  "tb_sd_file",
  "tb_ftp_usr",
  "tb_evt_log",
  "tb_eqpt",
  "tb_kfk_evt_bf",
];

// ─────────────────────────────────────────────
// 관리서버 패키지 구조 (com.dutchboy.demo)
// ─────────────────────────────────────────────
export const springPackages: { name: string; desc: string; indent?: number }[] =
  [
    {
      name: "aspect/",
      desc: "UserIdInjectAspect (SaveDTO에 userId 자동 주입), 로깅/에러 AOP",
    },
    { name: "client/", desc: "외부 API 클라이언트 (Airflow, Module)" },
    {
      name: "config/",
      desc: "DataSource (reader/writer 이중), Redis, JWT, Swagger",
    },
    { name: "controller/", desc: "manager/, system/, lot/, airflow/ RESTful" },
    { name: "kafka/", desc: "Kafka 컨슈머 (현재는 주로 Redis Pub/Sub 사용)" },
    { name: "model/", desc: "" },
    {
      name: "├── dto/",
      desc: "DTO — @JsonProperty 규칙, typeAliases 자동 등록",
      indent: 1,
    },
    {
      name: "├── repository/",
      desc: "reader/ writer/ analysis/ 세 종류 Mapper",
      indent: 1,
    },
    { name: "└── service/", desc: "", indent: 1 },
    { name: "  ├── manager/alarm/", desc: "알람 전략/평가", indent: 2 },
    {
      name: "  ├── realtime/",
      desc: "Redis → 메트릭 → SSE 파이프라인",
      indent: 2,
    },
    { name: "  └── sse/", desc: "SSE 퍼블리셔", indent: 2 },
    {
      name: "scheduler/",
      desc: "EquipmentHealthCheck, PrrGapRecovery, StreamingTimeOut",
    },
    {
      name: "util/",
      desc: "JwtInterceptor, typehandler/ (Bytea, LocalDateTime, StringArray)",
    },
  ];

// ─────────────────────────────────────────────
// SSE 4종 엔드포인트
// ─────────────────────────────────────────────
export const sseHooks = [
  {
    hook: "useDashboardSSE",
    endpoint: "/manager/equipment/real-time/sse",
    desc: "YIELD_UPDATE, CONNECTION_STATUS, FILE_METADATA, ALARM — backoff 1s→30s",
  },
  {
    hook: "useEquipmentSSE",
    endpoint: "/manager/equipment/{eqptPk}/sse",
    desc: "PART_STATS, METRICS, YIELD_INFO — 장비별 상세 실시간",
  },
  {
    hook: "useManagementSSE",
    endpoint: "/manager/equipment/management/sse",
    desc: "MODULE_STATUS, EQUIPMENT_CONTROL, EVENT_LOG_ALERT",
  },
  {
    hook: "useAlarmSSE",
    endpoint: "/alarms/unconfirmed/sse",
    desc: "ALARM_FIRED / CONFIRMED / DELETED + 토스트",
  },
  {
    hook: "useEventLogSSE",
    endpoint: "/manager/equipment/{sno}/event-logs/sse",
    desc: "EVENT_LOG — infinite scroll prepend, evtSno dedup",
  },
  {
    hook: "useControllerSSE",
    endpoint: "/manager/equipment/management/sse",
    desc: "MODULE_STATUS (mdulSno=4 필터) — FileExplorer 전용",
  },
];

// ─────────────────────────────────────────────
// Zustand Store 16+개 카테고리 분류
// ─────────────────────────────────────────────
export const zustandStores = [
  {
    category: "Base",
    color: "cyan",
    items: ["authStore", "menuStore", "selectStore", "layoutStore"],
    note: "sessionStorage persist",
  },
  {
    category: "도메인",
    color: "green",
    items: [
      "equipmentStateStore",
      "equipmentManagementStore",
      "alarmStore",
      "patchStore",
      "moduleVersionStore",
      "sharedEquipmentStore",
      "ruleStore",
      "lotAnalysisStore",
      "lotDetailStore",
      "lotOverviewStore",
    ],
  },
  {
    category: "System",
    color: "purple",
    items: ["form", "standard", "config", "history"],
    note: "resetAllStores() — 로그아웃 시 전체 리셋",
  },
];

// ─────────────────────────────────────────────
// 알람 상태 머신
// ─────────────────────────────────────────────
export const alarmStateMachine = {
  states: ["NORMAL", "ALERT", "ACKNOWLEDGE", "SUPPRESS"],
  note: "ConcurrentHashMap stateMap · 규칙 캐시 30초 TTL",
};
