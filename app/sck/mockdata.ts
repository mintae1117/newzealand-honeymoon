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
      { title: "JAR 핫패치", desc: "daemon이 원자 swap + 30초 rule 롤백" },
      {
        title: "투명 압축 FTP",
        desc: "클라이언트 요청 확장자에 맞춰 on-the-fly 압축",
      },
      { title: "Kafka 버퍼링", desc: "장애 시 SQLite에 버퍼링 후 재전송" },
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
        desc: "Redis → Session → Aggregator → SSE (4 워커, 500ms)",
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
    id: "flink-job",
    name: "flink-job",
    role: "Streaming (서브모듈)",
    icon: "⚡",
    color: "from-orange-500 to-red-500",
    stack: [
      { label: "Engine", value: "Apache Flink 1.20" },
      { label: "Language", value: "Java 17" },
      { label: "Connector", value: "flink-connector-kafka 4.0.0-2.0" },
      { label: "Build", value: "Shadow JAR (fat jar)" },
      { label: "Checkpoint", value: "10초 간격" },
    ],
    highlights: [
      { title: "FileIngestJob", desc: "Kafka → HTTP API 브릿지 (단일 Job)" },
      {
        title: "Fault Tolerance",
        desc: "체크포인트로 file-ready 이벤트 소실 방지",
      },
      { title: "설정 우선순위", desc: "CLI → env → OS 기반 defaults" },
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
      { title: "SSE 4종", desc: "Dashboard / Management / Alarm / EventLog" },
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
    desc: '파일 감지 → tb_sd_file insert → Kafka "file-ready" 발행',
  },
  {
    step: 3,
    from: "Flink Job",
    to: "Spring API",
    protocol: "Kafka → HTTP POST",
    desc: "POST /api/manager/ftp/stream/{equipmentId}",
  },
  {
    step: 4,
    from: "Spring Backend",
    to: "Sender (FTP)",
    protocol: "FTP (투명 압축)",
    desc: "stdf4j 스트리밍 파서가 PipedStream으로 파싱",
  },
  {
    step: 5,
    from: "파서 레코드",
    to: "PostgreSQL + Redis",
    protocol: "JDBC / Pub-Sub",
    desc: 'MIR/PRR/MRR 저장 + Redis "realtime-record" publish',
  },
  {
    step: 6,
    from: "MetricsAggregator",
    to: "SSE",
    protocol: "EventStream",
    desc: "4 워커, 500ms 배치 → Dashboard/Equipment/Alarm SSE",
  },
  {
    step: 7,
    from: "Frontend",
    to: "React Query Cache",
    protocol: "EventSource",
    desc: "SSE 수신 → 캐시 업데이트 → WaferMap/차트 리렌더",
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
    title: "하이브리드 메시징",
    desc: "Flink는 체크포인트가 필요한 file-ready 처리, Redis Pub/Sub은 저지연 메트릭 전파. 서로 다른 보증 수준을 상황별로 활용.",
  },
  {
    title: "장비서버 경량화",
    desc: "Worker/Sender는 순수 Java (Spring 없음), Controller만 Spring Boot. 낡은 장비 리소스 고려한 설계.",
  },
  {
    title: "STDF 파싱 이중화",
    desc: "Worker에서 옵션으로 파싱하거나, 관리서버에서 FTP 받아 파싱. 유연한 배치 전략.",
  },
  {
    title: "SSE 선택",
    desc: "WebSocket 아닌 SSE 사용. 단방향 방송에 적합, HTTP 인프라 재활용, 브라우저 자동 재연결.",
  },
  {
    title: "전략 패턴 알람",
    desc: "8+ 규칙 타입을 RuleStrategyCatalog 팩토리로 관리. 새 규칙 추가가 플러그인처럼 쉬움.",
  },
  {
    title: "3개 DataSource",
    desc: "reader (replica) / writer (primary) / analysis (Trino) 분리로 읽기/쓰기/분석 워크로드 격리.",
  },
  {
    title: "DB 2개 운영",
    desc: "sckte(운영) / sckpe_dev(Trino 분석) 분리. 운영 트랜잭션과 분석 쿼리 워크로드를 DB 단에서 격리.",
  },
];

export const metrics = {
  lines: "50k+ LOC",
  frames: "30+ 화면",
  apis: "40+ Query/Mutation",
  stores: "16+ Zustand store",
  strategies: "8+ 알람 전략",
  datasources: "3개 DataSource",
  sse: "4종 SSE Hook",
  modules: "5개 서브모듈 (장비서버)",
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
    title: "STDF 파싱 (옵션)",
    desc: "PRR/PTR/TSR 스트리밍 파싱 후 Kafka stdf.record.{equipmentId} 발행",
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
    endpoint: "/api/manager/equipment/real-time/sse",
    desc: "실시간 yield/상태 — exponential backoff (1s → 30s)",
  },
  {
    hook: "useManagementSSE",
    endpoint: "/api/manager/equipment/management/sse",
    desc: "패치/관리 업데이트",
  },
  {
    hook: "useAlarmSSE",
    endpoint: "/api/alarms/unconfirmed/sse",
    desc: "알람 + 토스트",
  },
  {
    hook: "useEventLogSSE",
    endpoint: "/api/manager/equipment/{sno}/event-logs/sse",
    desc: "이벤트 로그 — infinite scroll prepend, evtSno dedup",
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
