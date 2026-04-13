"use client";

import { useState } from "react";
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
            반도체 테스트 데이터(STDF) 실시간 수집·분석 플랫폼.
            <br />
            <span className="text-zinc-300">
              장비 → Kafka → Flink → Spring → Redis → React
            </span>
            로 이어지는 이벤트 기반 파이프라인.
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
        <SectionHeader icon="🔌" label="Architecture" title="시스템 간 통신" />
        <p className="mb-4 text-xs text-zinc-400">
          장비 → 메인서버 → 웹 실시간 데이터 흐름
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

      {/* 데이터 흐름 (Step by Step) */}
      <section className="px-4 py-8">
        <SectionHeader icon="🔁" label="Data Flow" title="STDF 파일의 여정" />
        <p className="mb-4 text-xs text-zinc-400">
          테스트 장비에서 생성된 파일이 웹 UI까지
        </p>

        <div className="relative space-y-3">
          {/* 세로 라인 */}
          <div className="absolute left-[18px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-blue-500/60 via-green-500/60 to-purple-500/60" />

          {dataFlow.map((step) => (
            <div key={step.step} className="relative flex gap-3">
              <div className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-green-500 text-xs font-bold text-white shadow-lg ring-4 ring-zinc-950">
                {step.step}
              </div>
              <div className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-zinc-300">
                    {step.from}
                  </span>
                  <span className="text-zinc-500">→</span>
                  <span className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-zinc-300">
                    {step.to}
                  </span>
                </div>
                <div className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  {step.protocol}
                </div>
                <div className="mt-1 text-xs leading-relaxed text-zinc-300">
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
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
        <SectionHeader icon="📡" label="SSE" title="4종 SSE 엔드포인트" />
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
