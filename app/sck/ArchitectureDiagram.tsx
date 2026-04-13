"use client";

/**
 * SCK 플랫폼 통신 아키텍처 애니메이션 다이어그램
 * 장비서버 → 관리서버 → 웹 간 데이터 흐름을 시각화
 *
 * 애니메이션/패킷 스타일은 하이드레이션 미스매치 방지를 위해
 * 인라인 <style> 대신 ./sck.css에 정의되어 있음 (page.tsx에서 import)
 */
export default function ArchitectureDiagram() {
  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-4 py-6 shadow-xl">
      {/* 장비서버 노드 */}
      <div className="relative flex items-center justify-center">
        <div className="sck-pulse-blue w-full rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-600/90 to-cyan-600/90 px-4 py-3 text-white backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏭</span>
            <div>
              <div className="text-sm font-bold">sck-project</div>
              <div className="text-[10px] opacity-80">
                장비서버 (Worker/Sender/Controller)
              </div>
            </div>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {["NIO.2", "SQLite", "FTP", "Kafka"].map((t) => (
              <span
                key={t}
                className="rounded bg-white/20 px-1.5 py-0.5 text-[9px] font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 연결선 1: 장비서버 → 관리서버 */}
      <div className="relative mx-auto h-20 w-full">
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-400/60 to-green-400/60" />
        <div className="sck-packet sck-packet-blue sck-packet-down-25" />
        <div className="sck-packet sck-packet-orange sck-packet-down-25-d08" />
        <div className="sck-packet sck-packet-blue sck-packet-down-25-d16" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-zinc-900/95 px-2 py-1 text-[10px] font-mono text-orange-300 ring-1 ring-orange-400/30 whitespace-nowrap">
          Kafka → Flink → HTTP
        </div>
      </div>

      {/* 관리서버 노드 */}
      <div className="relative">
        <div className="sck-pulse-green w-full rounded-xl border border-green-400/30 bg-gradient-to-br from-green-600/90 to-emerald-600/90 px-4 py-3 text-white backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            <div>
              <div className="text-sm font-bold">sck-server-spring</div>
              <div className="text-[10px] opacity-80">
                관리서버 + Flink + Redis
              </div>
            </div>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {["Spring", "MyBatis", "stdf4j", "Redis", "PostgreSQL"].map((t) => (
              <span
                key={t}
                className="rounded bg-white/20 px-1.5 py-0.5 text-[9px] font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 연결선 2: 관리서버 → 웹 */}
      <div className="relative mx-auto h-20 w-full">
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-green-400/60 to-purple-400/60" />
        <div className="sck-packet sck-packet-green sck-packet-down-15" />
        <div className="sck-packet sck-packet-green sck-packet-down-15-d04" />
        <div className="sck-packet sck-packet-pink sck-packet-down-15-d08" />
        <div className="sck-packet sck-packet-green sck-packet-down-15-d12" />
        <div className="sck-packet sck-packet-up-3" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-zinc-900/95 px-2 py-1 text-[10px] font-mono text-green-300 ring-1 ring-green-400/30 whitespace-nowrap">
          SSE (EventSource) ↓ · REST ↑
        </div>
      </div>

      {/* 웹 노드 */}
      <div className="relative">
        <div className="sck-pulse-purple w-full rounded-xl border border-purple-400/30 bg-gradient-to-br from-purple-600/90 to-pink-600/90 px-4 py-3 text-white backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🖥️</span>
            <div>
              <div className="text-sm font-bold">sck-server-react</div>
              <div className="text-[10px] opacity-80">관리서버 Frontend</div>
            </div>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {["Vite", "React 18", "Zustand", "React Query"].map((t) => (
              <span
                key={t}
                className="rounded bg-white/20 px-1.5 py-0.5 text-[9px] font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 범례 */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[10px] text-zinc-400">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_6px_#60a5fa]" />
          <span>file-ready</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_6px_#fb923c]" />
          <span>HTTP API</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
          <span>SSE stream</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_6px_#a78bfa]" />
          <span>REST request</span>
        </div>
      </div>
    </div>
  );
}
