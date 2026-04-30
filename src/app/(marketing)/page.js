import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Bug,
  Code2,
  FlaskConical,
  Gauge,
  GitBranch,
  Layers,
  Target,
  Zap,
} from "lucide-react";

const COMPANY_NAMES = ["Stripe", "Vercel", "Google", "Meta", "Shopify"];

const STATS = [
  { value: "5+", label: "Coding Problems" },
  { value: "2", label: "Quiz Packs" },
  { value: "3", label: "Deep Guides" },
  { value: "2", label: "System Design" },
];

const FEATURES = [
  {
    icon: Code2,
    iconBg: "bg-[var(--neo-purple)]",
    iconColor: "text-[var(--text)]",
    href: "/problems",
    title: "Coding Problems",
    description:
      "Implementation and debugging rounds with visible I/O examples and hidden edge-case test suites. Pass all to move on.",
    meta: "5+ problems · Easy / Medium / Hard",
  },
  {
    icon: BrainCircuit,
    iconBg: "bg-[var(--neo-pink)]",
    iconColor: "text-[var(--text)]",
    href: "/quiz",
    title: "Internals Quizzes",
    description:
      "MCQ and spot-the-bug questions that test event loop ordering, reconciler phases, and scheduler priority — with deep explanations.",
    meta: "2 quizzes · MCQ / Spot-the-bug",
  },
  {
    icon: BookOpen,
    iconBg: "bg-[var(--neo-blue)]",
    iconColor: "text-[var(--text)]",
    href: "/guides",
    title: "Deep-Dive Guides",
    description:
      "Long-form architecture and performance reference on React Fiber, TypeScript type system internals, and the browser rendering pipeline.",
    meta: "3 guides · Long-form",
  },
  {
    icon: Layers,
    iconBg: "bg-[var(--neo-green)]",
    iconColor: "text-[var(--text)]",
    href: "/system-design",
    title: "System Design",
    description:
      "Architecture drills: design a component library, spec a real-time collaboration editor, plan a design system API from scratch.",
    meta: "2 scenarios · Frontend Architecture",
  },
];

const WHY_ITEMS = [
  {
    icon: Zap,
    title: "Three difficulty levels",
    desc: "From fundamentals to advanced — Easy, Medium, and Hard problems calibrated for real interview rounds.",
  },
  {
    icon: Target,
    title: "Hidden test cases",
    desc: "Visible tests show I/O examples. Hidden tests validate edge cases — just like real technical interviews.",
  },
  {
    icon: GitBranch,
    title: "React internals coverage",
    desc: "Fiber, lanes, reconciler phases, Suspense boundaries — with test cases that prove deep understanding.",
  },
  {
    icon: Gauge,
    title: "Performance debugging",
    desc: "Layout, reflow, and compositor drills that mirror real production performance incidents.",
  },
  {
    icon: Bug,
    title: "Spot-the-bug problems",
    desc: "Identify subtle bugs in production-realistic code snippets, then explain why and how to fix correctly.",
  },
  {
    icon: FlaskConical,
    title: "In-browser test runner",
    desc: "Your code runs against real test suites with instant pass/fail feedback per case — no waiting.",
  },
];

export default function LandingPage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative pb-16 pt-4 md:pb-24">
        {/* Ambient glow blob */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-36 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-purple-500/[0.07] blur-[90px]"
        />

        <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px]">
          {/* ── Left: copy ─────────────────────────────────────────── */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">
              Senior Frontend Practice Platform
            </p>

            <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-[62px]">
              Deep practice for{" "}
              <span className="hero-gradient-text">Senior, Lead &amp; Staff</span>{" "}
              engineers.
            </h1>

            <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-[color:var(--text-muted)] sm:text-lg">
              Coding problems, architecture drills, and
              internals-heavy quizzes — calibrated for real interviews.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/problems"
                className="btn-land-primary focus-ring inline-flex min-h-[46px] items-center gap-1.5 rounded-xl px-5 font-semibold text-white"
              >
                Start Practicing
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/guides"
                className="btn-land-secondary focus-ring inline-flex min-h-[46px] items-center rounded-xl px-5 font-semibold"
              >
                Browse Guides
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-xs text-[color:var(--text-muted)]">
                Used by engineers at
              </span>
              {COMPANY_NAMES.map((name) => (
                <span key={name} className="company-pill">{name}</span>
              ))}
            </div>
          </div>

          {/* ── Right: editor preview card ─────────────────────────── */}
          <div className="hidden lg:block">
            <div className="panel overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 border-b-2 border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3">
                <span className="h-3 w-3 border-2 border-[var(--border)] bg-[var(--danger)]" aria-hidden="true" />
                <span className="h-3 w-3 border-2 border-[var(--border)] bg-[var(--brand)]" aria-hidden="true" />
                <span className="h-3 w-3 border-2 border-[var(--border)] bg-[var(--success)]" aria-hidden="true" />
                <span className="code-font ml-3 text-xs font-bold text-[var(--text-muted)]">
                  implement-virtual-dom-diff.ts
                </span>
              </div>

              {/* Code body */}
              <div className="code-font select-none p-5 text-[13px] leading-7">
                <p>
                  <span className="text-[color:var(--text-muted)]">{"// Hard · ~60 min · Meta, Vercel"}</span>
                </p>
                <p className="mt-2">
                  <span className="text-violet-400">type </span>
                  <span className="text-cyan-300">VNode</span>
                  <span className="text-[color:var(--text-muted)]"> = {"{"}</span>
                </p>
                <p className="pl-6">
                  <span className="text-purple-300">tag</span>
                  <span className="text-[color:var(--text-muted)]">: string;</span>
                </p>
                <p className="pl-6">
                  <span className="text-purple-300">props</span>
                  <span className="text-[color:var(--text-muted)]">: Record&lt;string, unknown&gt;;</span>
                </p>
                <p className="pl-6">
                  <span className="text-purple-300">children</span>
                  <span className="text-[color:var(--text-muted)]">: VNode[];</span>
                </p>
                <p>
                  <span className="text-[color:var(--text-muted)]">{"}"}</span>
                </p>
                <p className="mt-4">
                  <span className="text-violet-400">export function </span>
                  <span className="text-yellow-300">diff</span>
                  <span className="text-[color:var(--text-muted)]">(</span>
                </p>
                <p className="pl-6">
                  <span className="text-orange-300">oldTree</span>
                  <span className="text-[color:var(--text-muted)]">: </span>
                  <span className="text-cyan-300">VNode</span>
                  <span className="text-[color:var(--text-muted)]">,</span>
                </p>
                <p className="pl-6">
                  <span className="text-orange-300">newTree</span>
                  <span className="text-[color:var(--text-muted)]">: </span>
                  <span className="text-cyan-300">VNode</span>
                </p>
                <p>
                  <span className="text-[color:var(--text-muted)]">): </span>
                  <span className="text-cyan-300">Patch</span>
                  <span className="text-[color:var(--text-muted)]">[] {"{"}</span>
                </p>
                <p className="pl-6">
                  <span className="text-[color:var(--text-muted)]">{"// your implementation"}</span>
                </p>
                <p>
                  <span className="text-[color:var(--text-muted)]">{"}"}</span>
                </p>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between border-t-2 border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-muted)]">
                  <span className="inline-block h-2 w-2 border-2 border-[var(--border)] bg-[var(--text-muted)]" aria-hidden="true" />
                  0 / 8 tests passing
                </span>
                <span className="inline-flex items-center border-2 border-[var(--border)] bg-[var(--neo-pink)] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-[var(--text)]">
                  Hard
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────────── */}
      <section className="panel" aria-label="Platform statistics">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center px-4 py-6${i > 0 ? " border-l-2 border-[var(--border)]" : ""}`}
            >
              <p className="font-[family-name:var(--font-display)] text-[2rem] font-bold leading-none">{stat.value}</p>
              <p className="mt-1.5 text-center text-sm font-bold text-[var(--text-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature cards ─────────────────────────────────────────── */}
      <section className="mt-16" aria-labelledby="practice-modes-heading">
        <div className="mb-8">
          <h2 id="practice-modes-heading" className="font-[family-name:var(--font-display)] text-3xl font-bold">
            Practice modes
          </h2>
          <p className="mt-2 text-[var(--text-muted)]">
            Four surfaces. One mission: advancing careers through deliberate depth.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <Link
                key={f.href}
                href={f.href}
                className="feature-card group block p-5 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[var(--border)] ${f.iconBg}`}
                  >
                    <Icon size={20} className={f.iconColor} aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-[family-name:var(--font-display)] text-base font-bold">{f.title}</h3>
                      <ArrowRight
                        size={15}
                        aria-hidden="true"
                        className="shrink-0 text-[color:var(--text-muted)] transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
                      {f.description}
                    </p>
                    <p className="mt-3 text-xs font-bold text-[var(--text-muted)]">{f.meta}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Why Devpro ────────────────────────────────────────────── */}
      <section className="mt-16" aria-labelledby="why-heading">
        <div className="mb-8">
          <h2 id="why-heading" className="font-[family-name:var(--font-display)] text-3xl font-bold">
            Built for the 5+ year engineer
          </h2>
          <p className="mt-2 text-[var(--text-muted)]">
            Every design decision optimised for depth, not completion rate.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="why-card p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center border-2 border-[var(--border)] bg-[var(--neo-yellow)]">
                  <Icon size={18} className="text-[var(--text)]" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-bold font-[family-name:var(--font-display)]">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────────── */}
      <section className="mb-4 mt-16">
        <div className="cta-banner relative overflow-hidden p-8 text-center md:p-14">
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.18em] font-[family-name:var(--font-display)] text-[var(--text)]">
              Ready to level up?
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-bold sm:text-3xl md:text-4xl">
              Start closing the gap between good and great.
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-[var(--text-muted)]">
              Pick a problem. Run the tests. Ship the understanding.
            </p>
            <Link
              href="/problems"
              className="btn-land-primary focus-ring mt-7 inline-flex min-h-[46px] items-center gap-1.5 px-6 font-bold font-[family-name:var(--font-display)]"
            >
              Open Problem Set
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
