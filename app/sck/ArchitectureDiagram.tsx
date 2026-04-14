"use client";

/**
 * SCK 플랫폼 5-레이어 아키텍처 다이어그램
 * sck-project → Kafka → sck-flink → sck-server-spring → Frontend
 *
 * 듀얼 파싱 경로(Worker 직접파싱 vs Flink FTP파싱)를 시각화
 * 애니메이션은 ./sck.css에 정의 (하이드레이션 미스매치 방지)
 */
export default function ArchitectureDiagram() {
  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-4 py-5 shadow-xl">
      {/* ── 1. sck-project (장비서버) ── */}
      <div className="relative">
        <div className="sck-pulse-blue w-full rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-600/90 to-cyan-600/90 px-3 py-2.5 text-white backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏭</span>
            <div>
              <div className="text-[13px] font-bold">sck-project</div>
              <div className="text-[9px] opacity-80">
                Worker: STDF 감지+파싱 · Sender: FTP 서버
              </div>
            </div>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {["NIO.2 감지", "STDF 파싱", "SQLite", "FTP"].map((t) => (
              <span
                key={t}
                className="rounded bg-white/20 px-1.5 py-0.5 text-[8px] font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 연결 1: 장비서버 → Kafka ── */}
      <Connector
        gradientFrom="blue"
        gradientTo="orange"
        packets={[
          "sck-packet-blue sck-packet-short",
          "sck-packet-orange sck-packet-short-d04",
          "sck-packet-blue sck-packet-short-d08",
        ]}
      >
        <div className="flex gap-1">
          <span className="sck-branch-label bg-blue-500/20 text-blue-300">
            file-ready
          </span>
          <span className="sck-branch-label bg-orange-500/20 text-orange-300">
            stdf.record.*
          </span>
        </div>
      </Connector>

      {/* ── 2. Kafka (메시지 허브) ── */}
      <div className="relative">
        <div className="sck-pulse-orange w-full rounded-xl border border-orange-400/30 bg-gradient-to-br from-orange-600/80 to-amber-600/80 px-3 py-2 text-white backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-xl">📨</span>
            <div>
              <div className="text-[13px] font-bold">Kafka</div>
              <div className="text-[9px] opacity-80">
                6개 토픽 · 이벤트 허브
              </div>
            </div>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {[
              "file-ready",
              "stdf.record.*",
              "file-status",
              "parsing-result",
              "DLQ",
            ].map((t) => (
              <span
                key={t}
                className="rounded bg-white/15 px-1.5 py-0.5 text-[8px] font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 연결 2: Kafka → Flink ── */}
      <Connector
        gradientFrom="orange"
        gradientTo="red"
        packets={[
          "sck-packet-orange sck-packet-short",
          "sck-packet-orange sck-packet-short-d08",
        ]}
      >
        <div className="flex gap-1">
          <span className="sck-branch-label bg-red-500/20 text-red-300">
            FTP 다운로드+파싱+DB
          </span>
        </div>
      </Connector>

      {/* ── 3. sck-flink ── */}
      <div className="relative">
        <div className="sck-pulse-red w-full rounded-xl border border-red-400/30 bg-gradient-to-br from-red-600/80 to-orange-600/80 px-3 py-2.5 text-white backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <div>
              <div className="text-[13px] font-bold">sck-flink</div>
              <div className="text-[9px] opacity-80">
                FileIngestJob · RecordWriterJob
              </div>
            </div>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {["Flink 2.0", "FTP→파싱", "PostgreSQL", "Redis Pub"].map((t) => (
              <span
                key={t}
                className="rounded bg-white/20 px-1.5 py-0.5 text-[8px] font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 연결 3: Flink → Spring ── */}
      <Connector
        gradientFrom="red"
        gradientTo="green"
        packets={[
          "sck-packet-green sck-packet-short",
          "sck-packet-green sck-packet-short-d04",
          "sck-packet-green sck-packet-short-d08",
        ]}
      >
        <span className="sck-branch-label bg-green-500/20 text-green-300">
          Redis realtime-record
        </span>
      </Connector>

      {/* ── 4. sck-server-spring ── */}
      <div className="relative">
        <div className="sck-pulse-green w-full rounded-xl border border-green-400/30 bg-gradient-to-br from-green-600/90 to-emerald-600/90 px-3 py-2.5 text-white backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <div>
              <div className="text-[13px] font-bold">sck-server-spring</div>
              <div className="text-[9px] opacity-80">
                Redis→메트릭 집계→SSE 6종 발행
              </div>
            </div>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {["Redis Sub", "Aggregator", "SSE 6종", "알람 10전략"].map((t) => (
              <span
                key={t}
                className="rounded bg-white/20 px-1.5 py-0.5 text-[8px] font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 연결 4: Spring → Frontend ── */}
      <Connector
        gradientFrom="green"
        gradientTo="purple"
        packets={[
          "sck-packet-green sck-packet-short",
          "sck-packet-green sck-packet-short-d04",
          "sck-packet-pink sck-packet-short-d08",
          "sck-packet-green sck-packet-short-d12",
        ]}
      >
        <span className="sck-branch-label bg-purple-500/20 text-purple-300">
          SSE (EventSource) ↓
        </span>
      </Connector>

      {/* ── 5. Frontend ── */}
      <div className="relative">
        <div className="sck-pulse-purple w-full rounded-xl border border-purple-400/30 bg-gradient-to-br from-purple-600/90 to-pink-600/90 px-3 py-2.5 text-white backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-xl">🖥️</span>
            <div>
              <div className="text-[13px] font-bold">sck-server-react</div>
              <div className="text-[9px] opacity-80">
                실시간 대시보드 · WaferMap · 알람
              </div>
            </div>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {["React 18", "Zustand", "SSE 6훅", "Chart.js/D3"].map((t) => (
              <span
                key={t}
                className="rounded bg-white/20 px-1.5 py-0.5 text-[8px] font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 범례 ── */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-[9px] text-zinc-400">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_6px_#60a5fa]" />
          <span>file-ready</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_6px_#fb923c]" />
          <span>stdf.record</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
          <span>Redis/SSE</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_6px_#f472b6]" />
          <span>Alarm</span>
        </div>
      </div>

      {/* ── 듀얼 경로 설명 ── */}
      <div className="mt-3 rounded-lg border border-zinc-700/60 bg-zinc-950/50 p-2.5">
        <div className="text-[10px] font-bold text-amber-300">
          듀얼 파싱 경로
        </div>
        <div className="mt-1.5 space-y-1 text-[9px] leading-relaxed text-zinc-400">
          <div className="flex gap-1.5">
            <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" />
            <span>
              <span className="text-blue-300 font-bold">경로 A</span> — Worker
              직접 파싱 → Kafka → RecordWriterJob DB 저장{" "}
              <span className="text-zinc-500">(빠름, 실시간 우선)</span>
            </span>
          </div>
          <div className="flex gap-1.5">
            <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
            <span>
              <span className="text-red-300 font-bold">경로 B</span> — Flink
              FTP 다운로드+파싱 → DB+Redis{" "}
              <span className="text-zinc-500">(체크포인트, 신뢰성 우선)</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 두 노드 사이의 연결선 + 패킷 애니메이션 */
function Connector({
  gradientFrom,
  gradientTo,
  packets,
  children,
}: {
  gradientFrom: string;
  gradientTo: string;
  packets: string[];
  children: React.ReactNode;
}) {
  const fromColor =
    gradientFrom === "blue"
      ? "from-blue-400/60"
      : gradientFrom === "orange"
        ? "from-orange-400/60"
        : gradientFrom === "red"
          ? "from-red-400/60"
          : "from-green-400/60";
  const toColor =
    gradientTo === "orange"
      ? "to-orange-400/60"
      : gradientTo === "red"
        ? "to-red-400/60"
        : gradientTo === "green"
          ? "to-green-400/60"
          : "to-purple-400/60";

  return (
    <div className="relative mx-auto h-14 w-full">
      <div
        className={`absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b ${fromColor} ${toColor}`}
      />
      {packets.map((cls, i) => (
        <div key={i} className={`sck-packet ${cls}`} />
      ))}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
}
