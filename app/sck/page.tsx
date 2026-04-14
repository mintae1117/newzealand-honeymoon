"use client";

import { useState, useEffect, useCallback } from "react";
import ArchitectureDiagram from "./ArchitectureDiagram";
import "./sck.css";
import {
  repos,
  dataFlow,
  realtimePipeline,
  alarmStrategies,
  frames,
  reliability,
  designDecisions,
  metrics,
  equipSubModules,
  equipCoreTech,
  equipTables,
  springPackages,
  sseHooks,
  zustandStores,
  alarmStateMachine,
} from "./mockdata";

export default function SckAnalysisPage() {
  const [selectedRepo, setSelectedRepo] = useState(repos[0].id);
  const currentRepo = repos.find((r) => r.id === selectedRepo) ?? repos[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-10 pt-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-[11px] font-mono text-blue-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
            Technical Analysis
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight">
            SCK
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
              Platform
            </span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            반도체 테스트 데이터(STDF) 실시간 수집·파싱·분석 플랫폼.
            <br />
            <span className="text-zinc-300">
              장비(STDF) → Worker(파싱) → Kafka → Flink(FTP+파싱+DB) →
              Redis → Spring(SSE) → React
            </span>
          </p>

          {/* 핵심 지표 */}
          <div className="mt-6 grid grid-cols-2 gap-2">
            {Object.entries(metrics).map(([key, value]) => (
              <div
                key={key}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-2.5 backdrop-blur"
              >
                <div className="text-sm font-bold text-zinc-100">{value}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wider text-zinc-500">
                  {key}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 아키텍처 다이어그램 */}
      <section className="px-4 py-6">
        <SectionHeader
          icon="🔌"
          label="Architecture"
          title="5-레이어 파이프라인"
        />
        <p className="mb-4 text-xs text-zinc-400">
          장비서버 → Kafka → Flink → Spring → 웹 실시간 데이터 흐름
        </p>
        <ArchitectureDiagram />
      </section>

      {/* 리포지토리 구조 */}
      <section className="px-4 py-8">
        <SectionHeader
          icon="📦"
          label="Repositories"
          title="4개 리포지토리 구성"
        />

        {/* Tab switcher */}
        <div className="mt-4 flex gap-1.5 overflow-x-auto pb-2 -mx-1 px-1">
          {repos.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRepo(r.id)}
              className={`flex-shrink-0 rounded-lg border px-3 py-2 text-left text-[11px] transition-all ${
                selectedRepo === r.id
                  ? "border-zinc-600 bg-zinc-800 shadow-lg"
                  : "border-zinc-800 bg-zinc-900/50 opacity-60"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-base">{r.icon}</span>
                <span className="font-bold">{r.name.replace("sck-", "")}</span>
              </div>
              <div className="mt-0.5 text-[9px] text-zinc-400">{r.role}</div>
            </button>
          ))}
        </div>

        {/* Selected repo detail */}
        <div
          key={currentRepo.id}
          className="sck-fade-in mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur"
        >
          <div
            className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-br ${currentRepo.color} px-3 py-1.5 text-xs font-bold text-white shadow-lg`}
          >
            <span className="text-lg">{currentRepo.icon}</span>
            {currentRepo.name}
          </div>
          <div className="mt-2 text-xs text-zinc-400">{currentRepo.role}</div>

          {/* Tech Stack */}
          <div className="mt-4">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Stack
            </div>
            <div className="space-y-1.5">
              {currentRepo.stack.map((s) => (
                <div
                  key={s.label}
                  className="flex items-start gap-2 rounded-md bg-zinc-950/50 px-2.5 py-1.5"
                >
                  <div className="min-w-[70px] text-[10px] font-mono uppercase text-zinc-500">
                    {s.label}
                  </div>
                  <div className="flex-1 text-[11px] text-zinc-200">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="mt-4">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Highlights
            </div>
            <div className="space-y-1.5">
              {currentRepo.highlights.map((h) => (
                <div
                  key={h.title}
                  className="rounded-md border border-zinc-800/80 bg-zinc-950/50 px-2.5 py-2"
                >
                  <div className="text-[11px] font-bold text-zinc-100">
                    ⚡ {h.title}
                  </div>
                  <div className="mt-0.5 text-[11px] leading-relaxed text-zinc-400">
                    {h.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STDF 파이프라인 스텝퍼 */}
      <section className="px-4 py-8">
        <SectionHeader
          icon="🔁"
          label="Data Pipeline"
          title="STDF 파일의 여정"
        />
        <p className="mb-4 text-xs text-zinc-400">
          테스트 장비에서 생성된 파일이 웹 UI까지 — 단계별로 살펴보기
        </p>
        <PipelineStepper />
      </section>

      {/* 장비서버 심화 */}
      <section className="px-4 py-8">
        <SectionHeader
          icon="🏭"
          label="Equipment Server"
          title="sck-project 상세"
        />
        <p className="mb-4 text-xs text-zinc-400">
          5개 서브모듈 · NIO.2 기반 파일 감지 · JAR 핫패치
        </p>

        {/* 서브모듈 표 */}
        <div className="mb-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60">
          <div className="border-b border-zinc-800 bg-zinc-900/80 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            5개 서브모듈
          </div>
          <div className="divide-y divide-zinc-800">
            {equipSubModules.map((m) => (
              <div key={m.name} className="flex items-start gap-2 px-3 py-2">
                <div className="min-w-[72px]">
                  <div className="font-mono text-[11px] font-bold text-zinc-100">
                    {m.name}
                  </div>
                  <div
                    className={`mt-0.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-bold ${
                      m.type === "spring"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-orange-500/20 text-orange-300"
                    }`}
                  >
                    {m.type === "spring" ? "Spring Boot" : "Pure Java"}
                  </div>
                </div>
                <div className="min-w-[58px] pt-0.5 font-mono text-[10px] text-cyan-300">
                  {m.port}
                </div>
                <div className="flex-1 pt-0.5 text-[11px] leading-relaxed text-zinc-300">
                  {m.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 핵심 기술 */}
        <div className="space-y-1.5">
          {equipCoreTech.map((t) => (
            <div
              key={t.title}
              className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-2.5 py-2"
            >
              <div className="text-[11px] font-bold text-blue-300">
                ⚡ {t.title}
              </div>
              <div className="mt-0.5 text-[11px] leading-relaxed text-zinc-300">
                {t.desc}
              </div>
            </div>
          ))}
        </div>

        {/* SQLite 테이블 */}
        <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            SQLite 테이블
          </div>
          <div className="flex flex-wrap gap-1">
            {equipTables.map((t) => (
              <span
                key={t}
                className="rounded border border-cyan-400/30 bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[10px] text-cyan-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 관리서버 패키지 구조 */}
      <section className="px-4 py-8">
        <SectionHeader
          icon="📁"
          label="Backend Packages"
          title="관리서버 패키지 구조"
        />
        <p className="mb-4 text-xs text-zinc-400">
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-300">
            com.dutchboy.demo
          </code>{" "}
          Spring Boot 3.1.6 / MyBatis 3
        </p>
        <div className="rounded-xl border border-green-400/20 bg-gradient-to-br from-green-950/30 to-emerald-950/20 p-3 font-mono text-[11px] leading-relaxed">
          {springPackages.map((p, i) => (
            <div
              key={i}
              className="flex items-start gap-2 py-0.5"
              style={{ paddingLeft: `${(p.indent ?? 0) * 14}px` }}
            >
              <span className="whitespace-nowrap text-green-300">{p.name}</span>
              {p.desc && (
                <span className="text-[10px] text-zinc-400">— {p.desc}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 실시간 파이프라인 */}
      <section className="px-4 py-8">
        <SectionHeader
          icon="⚡"
          label="Real-time"
          title="실시간 메트릭 파이프라인"
        />
        <p className="mb-4 text-xs text-zinc-400">
          Redis → Session → Aggregator → SSE
        </p>

        <div className="space-y-2">
          {realtimePipeline.map((p, i) => (
            <div
              key={p.title}
              className="relative rounded-xl border border-green-400/20 bg-gradient-to-br from-green-950/40 to-emerald-950/40 p-3"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-[10px] font-bold text-green-400">
                  {i + 1}
                </div>
                <div className="text-sm font-bold text-green-300">
                  {p.title}
                </div>
              </div>
              <ul className="mt-2 space-y-1 pl-8">
                {p.items.map((item) => (
                  <li
                    key={item}
                    className="text-[11px] leading-relaxed text-zinc-300 before:mr-1.5 before:text-green-500 before:content-['›']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              {i < realtimePipeline.length - 1 && (
                <div className="flex justify-center pt-2">
                  <div className="text-green-500 animate-bounce">↓</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SSE 엔드포인트 */}
      <section className="px-4 py-8">
        <SectionHeader icon="📡" label="SSE" title="6종 SSE 엔드포인트" />
        <p className="mb-4 text-xs text-zinc-400">
          React Query 캐시를 직접 업데이트하는 EventSource 훅
        </p>
        <div className="space-y-2">
          {sseHooks.map((s) => (
            <div
              key={s.hook}
              className="rounded-xl border border-yellow-400/20 bg-gradient-to-br from-yellow-950/30 to-amber-950/20 p-3"
            >
              <div className="font-mono text-[12px] font-bold text-yellow-300">
                {s.hook}
              </div>
              <div className="mt-1 break-all font-mono text-[10px] text-zinc-400">
                {s.endpoint}
              </div>
              <div className="mt-1.5 text-[11px] leading-relaxed text-zinc-300">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 알람 전략 */}
      <section className="px-4 py-8">
        <SectionHeader icon="🚨" label="Alarm" title="알람 전략 패턴" />
        <p className="mb-4 text-xs text-zinc-400">
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-300">
            RuleStrategyCatalog
          </code>{" "}
          팩토리로 관리되는 9개 전략
        </p>

        <div className="grid grid-cols-2 gap-2">
          {alarmStrategies.map((a) => (
            <div
              key={a.name}
              className="rounded-lg border border-red-400/20 bg-red-950/20 p-2.5"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${getBadgeColor(a.type)}`}
                >
                  {a.type}
                </span>
              </div>
              <div className="mt-1.5 font-mono text-[10px] leading-tight text-zinc-200">
                {a.name}
              </div>
              <div className="mt-1 text-[10px] text-zinc-400">{a.desc}</div>
            </div>
          ))}
        </div>

        {/* 상태 머신 */}
        <div className="mt-4 rounded-xl border border-red-400/30 bg-gradient-to-r from-red-950/40 to-orange-950/30 p-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-red-300">
            상태 머신
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
            {alarmStateMachine.states.map((s, i) => (
              <span key={s} className="flex items-center gap-1.5">
                <span className="rounded bg-red-500/20 px-2 py-0.5 font-bold text-red-200">
                  {s}
                </span>
                {i < alarmStateMachine.states.length - 1 && (
                  <span className="text-red-400">→</span>
                )}
              </span>
            ))}
          </div>
          <div className="mt-2 text-[10px] text-zinc-400">
            {alarmStateMachine.note}
          </div>
        </div>
      </section>

      {/* Frame 구조 */}
      <section className="px-4 py-8">
        <SectionHeader
          icon="🎨"
          label="Frontend"
          title="Frame 구조 (30+ 화면)"
        />
        <p className="mb-4 text-xs text-zinc-400">
          programId 기반 Frame.tsx 라우팅, 최근 폴더 구조 리팩토링
        </p>

        <div className="space-y-2">
          {frames.map((f) => (
            <div
              key={f.category}
              className="rounded-xl border border-purple-400/20 bg-gradient-to-br from-purple-950/30 to-pink-950/20 p-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{f.icon}</span>
                <span className="text-sm font-bold text-purple-300">
                  {f.category}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {f.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-purple-400/30 bg-purple-500/10 px-2 py-0.5 font-mono text-[10px] text-purple-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Zustand Store */}
      <section className="px-4 py-8">
        <SectionHeader icon="🗂️" label="State" title="Zustand Store 16+" />
        <p className="mb-4 text-xs text-zinc-400">
          도메인별 분리, 로그아웃 시{" "}
          <code className="rounded bg-zinc-800 px-1 text-[10px]">
            resetAllStores()
          </code>
        </p>
        <div className="space-y-2">
          {zustandStores.map((z) => (
            <div
              key={z.category}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3"
            >
              <div
                className={`text-xs font-bold ${
                  z.color === "cyan"
                    ? "text-cyan-300"
                    : z.color === "green"
                      ? "text-green-300"
                      : "text-purple-300"
                }`}
              >
                {z.category}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {z.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-zinc-700 bg-zinc-950/60 px-1.5 py-0.5 font-mono text-[10px] text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
              {z.note && (
                <div className="mt-2 text-[10px] text-zinc-500">※ {z.note}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 신뢰성 메커니즘 */}
      <section className="px-4 py-8">
        <SectionHeader icon="🛡️" label="Reliability" title="신뢰성 메커니즘" />
        <p className="mb-4 text-xs text-zinc-400">
          각 레이어의 fault tolerance 전략
        </p>

        <div className="space-y-2">
          {reliability.map((r) => (
            <div
              key={r.layer}
              className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-3"
            >
              <div className="text-xs font-bold text-cyan-300">{r.layer}</div>
              <ul className="mt-2 space-y-1">
                {r.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[11px]">
                    <span className="mt-0.5 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400/60" />
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 설계 결정 */}
      <section className="px-4 py-8">
        <SectionHeader icon="💡" label="Decisions" title="핵심 설계 포인트" />
        <p className="mb-4 text-xs text-zinc-400">왜 이렇게 만들었는가</p>

        <div className="space-y-2">
          {designDecisions.map((d, i) => (
            <div
              key={d.title}
              className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 transition-all hover:border-zinc-600"
            >
              <div className="absolute -left-2 -top-2 text-5xl font-black text-zinc-800/40 select-none">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="relative">
                <div className="text-sm font-bold text-amber-300">
                  {d.title}
                </div>
                <div className="mt-1.5 text-[11px] leading-relaxed text-zinc-300">
                  {d.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="px-4 pb-20 pt-8">
        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-5 text-center">
          <div className="text-2xl">🎯</div>
          <div className="mt-2 text-sm font-bold text-zinc-100">
            SCK Platform
          </div>
          <div className="mt-1 text-[11px] text-zinc-500">
            Semiconductor Chip Kit — 반도체 생산 라인 실시간 모니터링
          </div>
          <div className="mt-4 flex justify-center gap-1.5">
            {["Java", "Spring", "Flink", "Kafka", "Redis", "React", "Vite"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[9px] text-zinc-400"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

function SectionHeader({
  icon,
  label,
  title,
}: {
  icon: string;
  label: string;
  title: string;
}) {
  return (
    <div>
      <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
        <span>{icon}</span>
        {label}
      </div>
      <h2 className="mt-2 text-xl font-bold text-zinc-100">{title}</h2>
    </div>
  );
}

// ─────────────────────────────────────────────
// Pipeline Stepper — 자동 재생 스텝별 시각화
// ─────────────────────────────────────────────
const STEPS = [
  {
    icon: "🔬",
    label: "STDF 생성",
    title: "반도체 테스트 장비",
    desc: "프로버/테스터가 웨이퍼의 각 다이(Die)를 테스트하고, 결과를 STDF 바이너리 파일로 디스크에 기록한다.",
    visual: (
      <div className="sck-binary-stream rounded-lg border border-blue-400/20 p-3">
        <div className="text-[10px] font-mono text-blue-300 mb-1.5">
          STDF Binary Record Stream
        </div>
        <div className="flex flex-wrap gap-1">
          {["FAR", "MIR", "SDR", "WIR", "WCR"].map((r) => (
            <span
              key={r}
              className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[9px] font-mono text-blue-200"
            >
              {r}
            </span>
          ))}
          <span className="text-[9px] text-zinc-500">→</span>
          {["PRR", "PRR", "PRR"].map((r, i) => (
            <span
              key={i}
              className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[9px] font-mono text-cyan-200"
            >
              {r}
            </span>
          ))}
          <span className="text-[9px] text-zinc-500">× N →</span>
          <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-mono text-amber-200">
            MRR
          </span>
        </div>
        <div className="mt-2 text-[9px] text-zinc-500">
          바이너리 포맷 · 4바이트 헤더(RecLen + Type + SubType) + 페이로드
        </div>
      </div>
    ),
    color: "border-blue-400/40",
    dotColor: "bg-blue-400",
  },
  {
    icon: "👁️",
    label: "Worker 감지",
    title: "sck-project Worker",
    desc: "Java NIO.2 WatchService가 파일 생성을 sub-second로 감지. StdfFileProcessor가 바이너리를 실시간 스트리밍 파싱한다.",
    visual: (
      <div className="space-y-2">
        <div className="rounded-lg border border-cyan-400/20 bg-cyan-950/30 p-2.5">
          <div className="text-[10px] font-bold text-cyan-300 mb-1">
            StdfFileProcessor (direct-parsing)
          </div>
          <div className="flex items-center gap-1 text-[9px] font-mono">
            <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
              StdfFileChunkReader
            </span>
            <span className="text-zinc-500">→</span>
            <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
              RecordVisitor
            </span>
            <span className="text-zinc-500">→</span>
            <span className="rounded bg-cyan-800 px-1.5 py-0.5 text-cyan-200">
              파싱 결과
            </span>
          </div>
        </div>
        <div className="flex gap-1.5 text-[9px]">
          <span className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-zinc-400">
            tb_sd_file INSERT
          </span>
          <span className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-zinc-400">
            NIO.2 sub-second
          </span>
        </div>
      </div>
    ),
    color: "border-cyan-400/40",
    dotColor: "bg-cyan-400",
  },
  {
    icon: "📨",
    label: "Kafka 발행",
    title: "Worker → Kafka",
    desc: "파싱된 STDF 레코드를 stdf.record.{equipmentId} 토픽으로, 파일 이벤트를 file-ready 토픽으로 발행. 장애 시 SQLite 버퍼링.",
    visual: (
      <div className="space-y-1.5">
        {[
          {
            topic: "stdf.record.{id}",
            data: "FAR/MIR/PRR/MRR 파싱 레코드",
            c: "text-orange-300 border-orange-400/30",
          },
          {
            topic: "file-ready",
            data: "파일 메타 (name, size, path)",
            c: "text-blue-300 border-blue-400/30",
          },
          {
            topic: "file-status",
            data: "STREAMING → COMPLETED/ERROR",
            c: "text-green-300 border-green-400/30",
          },
        ].map((t) => (
          <div
            key={t.topic}
            className={`flex items-center gap-2 rounded-md border bg-zinc-950/60 px-2.5 py-1.5 ${t.c}`}
          >
            <span className="min-w-[110px] text-[10px] font-mono font-bold">
              {t.topic}
            </span>
            <span className="text-[9px] text-zinc-400">{t.data}</span>
          </div>
        ))}
        <div className="text-[9px] text-zinc-500 mt-1">
          실패 시 SQLite tb_kfk_evt_bf에 버퍼링 → 재연결 후 자동 flush
        </div>
      </div>
    ),
    color: "border-orange-400/40",
    dotColor: "bg-orange-400",
  },
  {
    icon: "⚡",
    label: "Flink 파싱",
    title: "sck-flink FileIngestJob",
    desc: "file-ready를 소비해 장비서버 FTP에 직접 접속. 1MB 청크 단위로 다운로드하며 stdf4j로 바이너리를 스트리밍 파싱한다.",
    visual: (
      <div className="rounded-lg border border-red-400/20 bg-red-950/20 p-2.5">
        <div className="text-[10px] font-bold text-red-300 mb-1.5">
          Pipeline: Validation → Download → Parsing
        </div>
        <div className="space-y-1 text-[9px] font-mono">
          <div className="flex items-center gap-1">
            <span className="text-zinc-500">1.</span>
            <span className="text-zinc-300">FtpDBCheckFunction</span>
            <span className="text-zinc-600">— DB 검증 + 등록</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-zinc-500">2.</span>
            <span className="text-zinc-300">FtpChunkReaderFunction</span>
            <span className="text-zinc-600">— 1MB FTP 스트리밍</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-zinc-500">3.</span>
            <span className="text-red-300">StdfParserFunction</span>
            <span className="text-zinc-600">— stdf4j PipedStream</span>
          </div>
        </div>
        <div className="mt-2 rounded bg-zinc-950/60 px-2 py-1.5 text-[9px]">
          <span className="text-amber-300">stdf4j</span>
          <span className="text-zinc-500">
            {" "}
            — StdfChunkRealtimeBuffer (4MB 누적) → PipedOutputStream →
            별도 스레드에서 STDFReader가 RecordVisitor 콜백
          </span>
        </div>
      </div>
    ),
    color: "border-red-400/40",
    dotColor: "bg-red-400",
  },
  {
    icon: "💾",
    label: "DB 저장",
    title: "sck-flink RecordWriterJob",
    desc: "parsing-result / stdf.record.* 토픽을 소비해 PostgreSQL에 직접 저장. 3회 실패 시 DLQ로 격리.",
    visual: (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-1">
          {[
            "tb_lot",
            "tb_wafer",
            "tb_stdf_part",
            "tb_bin",
            "tb_product",
            "tb_program",
            "tb_sdr",
            "tb_stdf_file",
          ].map((t) => (
            <span
              key={t}
              className="rounded border border-green-400/20 bg-green-500/10 px-1.5 py-0.5 text-[9px] font-mono text-green-200"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-2 text-[9px]">
          <span className="rounded bg-green-900/30 px-2 py-0.5 text-green-300">
            HikariCP + JDBC
          </span>
          <span className="rounded bg-red-900/30 px-2 py-0.5 text-red-300">
            DLQ (3회 실패)
          </span>
        </div>
      </div>
    ),
    color: "border-green-400/40",
    dotColor: "bg-green-400",
  },
  {
    icon: "📡",
    label: "Redis→SSE",
    title: "sck-server-spring 실시간",
    desc: "Flink가 Redis realtime-record 채널에 직접 publish. Spring이 구독해서 세션 상태 → 메트릭 집계 → 알람 평가 → SSE 6종 발행.",
    visual: (
      <div className="space-y-1.5 text-[9px] font-mono">
        {[
          {
            name: "RedisRealtimeSubscriber",
            arrow: "→",
            desc: "MIR/PRR/MRR 수신",
            c: "text-red-300",
          },
          {
            name: "RealtimeSessionStateService",
            arrow: "→",
            desc: "장비별 in-memory 상태",
            c: "text-cyan-300",
          },
          {
            name: "RealtimeMetricsAggregator",
            arrow: "→",
            desc: "yield/bin/site 집계",
            c: "text-green-300",
          },
          {
            name: "RuleAlarmEvaluator",
            arrow: "→",
            desc: "10개 전략 평가",
            c: "text-amber-300",
          },
          {
            name: "SSE 6종 Publisher",
            arrow: "→",
            desc: "Dashboard/Equipment/Alarm/...",
            c: "text-purple-300",
          },
        ].map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-1.5 rounded bg-zinc-950/50 px-2 py-1"
          >
            <span className={`min-w-0 truncate font-bold ${s.c}`}>
              {s.name}
            </span>
            <span className="text-zinc-600 flex-shrink-0">{s.desc}</span>
          </div>
        ))}
      </div>
    ),
    color: "border-purple-400/40",
    dotColor: "bg-purple-400",
  },
  {
    icon: "🖥️",
    label: "실시간 UI",
    title: "sck-server-react",
    desc: "6개 SSE 훅이 EventSource로 수신, React Query 캐시를 직접 업데이트해서 WaferMap, Yield 차트, 알람 토스트를 실시간 리렌더.",
    visual: (
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { name: "WaferMap", icon: "🔵" },
          { name: "Yield 차트", icon: "📊" },
          { name: "알람 토스트", icon: "🔔" },
          { name: "Bin 분포", icon: "📈" },
          { name: "장비 상태", icon: "⚙️" },
          { name: "이벤트 로그", icon: "📋" },
        ].map((w) => (
          <div
            key={w.name}
            className="flex flex-col items-center rounded-lg border border-purple-400/20 bg-purple-950/20 px-2 py-2"
          >
            <span className="text-lg">{w.icon}</span>
            <span className="mt-0.5 text-[8px] text-purple-200">
              {w.name}
            </span>
          </div>
        ))}
      </div>
    ),
    color: "border-pink-400/40",
    dotColor: "bg-pink-400",
  },
];

function PipelineStepper() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  const next = useCallback(
    () => setCurrent((s) => (s + 1) % STEPS.length),
    [],
  );
  const prev = useCallback(
    () => setCurrent((s) => (s - 1 + STEPS.length) % STEPS.length),
    [],
  );

  useEffect(() => {
    if (!playing) return;
    const ms = 4000 / speed;
    const timer = setInterval(next, ms);
    return () => clearInterval(timer);
  }, [playing, speed, next]);

  const step = STEPS[current];

  return (
    <div className="space-y-3">
      {/* ── 스텝 프로그레스 바 ── */}
      <div className="relative flex items-center justify-between px-1">
        {/* 연결선 */}
        <div className="absolute top-1/2 left-3 right-3 h-px bg-zinc-700 -translate-y-1/2" />
        <div
          className="sck-progress-bar absolute top-1/2 left-3 h-px bg-amber-400/60 -translate-y-1/2"
          style={{
            width: `${(current / (STEPS.length - 1)) * (100 - 4)}%`,
          }}
        />

        {/* 스텝 점 */}
        {STEPS.map((s, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i);
              setPlaying(false);
            }}
            className="relative z-10 flex flex-col items-center gap-1"
          >
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-all ${
                i === current
                  ? "sck-step-active-dot border-amber-400 bg-amber-400 text-zinc-900 scale-110"
                  : i < current
                    ? `border-amber-400/50 ${s.dotColor} text-white`
                    : "border-zinc-600 bg-zinc-800 text-zinc-500"
              }`}
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span
              className={`text-[8px] leading-tight max-w-[42px] text-center ${
                i === current
                  ? "text-amber-300 font-bold"
                  : i < current
                    ? "text-zinc-400"
                    : "text-zinc-600"
              }`}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>

      {/* ── 현재 스텝 내용 ── */}
      <div
        key={current}
        className={`sck-step-enter rounded-2xl border bg-zinc-900/70 p-4 backdrop-blur ${step.color}`}
      >
        {/* 헤더 */}
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${step.dotColor}`}
          >
            {step.icon}
          </span>
          <div>
            <div className="text-[10px] font-mono text-amber-400/80">
              Step {current + 1} / {STEPS.length}
            </div>
            <div className="text-sm font-bold text-zinc-100">{step.title}</div>
          </div>
        </div>

        {/* 설명 */}
        <p className="mb-3 text-[11px] leading-relaxed text-zinc-400">
          {step.desc}
        </p>

        {/* 비주얼 */}
        {step.visual}
      </div>

      {/* ── 재생 컨트롤 ── */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <button
            onClick={prev}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs"
          >
            ‹
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-400/50 bg-amber-400/10 text-amber-300 text-xs"
          >
            {playing ? "❚❚" : "▶"}
          </button>
          <button
            onClick={next}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs"
          >
            ›
          </button>
        </div>

        <div className="text-[10px] font-mono text-zinc-500">
          {current + 1} / {STEPS.length}
        </div>

        <div className="flex items-center gap-1">
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`rounded px-1.5 py-0.5 text-[10px] font-mono ${
                speed === s
                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function getBadgeColor(type: string) {
  switch (type) {
    case "Bin":
      return "bg-orange-500/20 text-orange-300";
    case "Yield":
      return "bg-green-500/20 text-green-300";
    case "Time":
      return "bg-blue-500/20 text-blue-300";
    case "Delta":
      return "bg-purple-500/20 text-purple-300";
    case "Timeout":
      return "bg-red-500/20 text-red-300";
    default:
      return "bg-zinc-500/20 text-zinc-300";
  }
}
