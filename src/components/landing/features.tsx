import { PhoneMockup } from "@/components/landing/phone-mockup";
import { Asset, Button, Container, SectionBadge, SectionTitle } from "@/components/landing/ui";

function HoursLeftRing() {
  const size = 139.577;
  const stroke = 14.4608;
  const radius = (size - stroke) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = 0.72;
  const dash = circumference * progress;
  const gap = circumference - dash;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 overflow-visible"
        fill="none"
        aria-hidden
      >
        <circle cx={center} cy={center} r={radius} stroke="#E8E8E8" strokeWidth={stroke} />
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#0023FF"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${gap}`}
          transform={`rotate(-90 ${center} ${center})`}
          style={{ filter: "drop-shadow(0 0 14px rgba(0, 26, 255, 0.55))" }}
        />
      </svg>
      <p className="absolute left-1/2 top-[35.79px] -translate-x-1/2 whitespace-nowrap text-[32px] font-bold tracking-[-0.64px] text-ink">
        6
      </p>
      <p className="absolute left-1/2 top-[78.79px] -translate-x-1/2 whitespace-nowrap text-center text-xs font-bold leading-[1.3] tracking-[-0.24px] text-muted">
        Hours left
      </p>
    </div>
  );
}

function DayPill({ label, tone }: { label: string; tone: "done" | "today" | "idle" }) {
  const bg = tone === "done" ? "bg-[#0db596] text-white" : tone === "today" ? "bg-blue text-white" : "bg-chip text-ink";
  return (
    <div className={`relative size-10 shrink-0 overflow-hidden rounded-full ${bg}`}>
      <span className="absolute left-1/2 top-[9px] -translate-x-1/2 text-base font-bold tracking-[-0.32px]">
        {label}
      </span>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="mt-[80px] w-full md:mt-[135px]">
      <Container className="flex flex-col gap-[53px]">
        <div className="flex flex-col items-start gap-2">
          <SectionBadge>What&apos;s inside</SectionBadge>
          <SectionTitle>
            An app that keeps
            <br />
            your coaching clear.
          </SectionTitle>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <article className="flex flex-col gap-8 overflow-hidden rounded-3xl bg-chip p-8 md:p-10">
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold tracking-[-0.48px] text-ink">Check-in templates, built your way</h3>
                <p className="text-base font-medium leading-[1.3] tracking-[-0.32px] text-muted">
                  Custom fields, per bodybuilding category, per athlete.
                  <br />
                  Build the check-in once, like a form.
                </p>
              </div>
              <div className="relative h-[320px] overflow-hidden rounded-2xl bg-white md:h-[376px]">
                <div className="absolute left-1/2 top-1/2 flex w-[232px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6">
                  <HoursLeftRing />
                  <div className="flex w-[172px] flex-col items-center gap-1 text-center">
                    <p className="text-base font-bold tracking-[-0.32px] text-ink">Check-in Due</p>
                    <p className="text-xs font-bold leading-[1.3] tracking-[-0.24px] text-muted">
                      Extended by your coach — +6h
                    </p>
                  </div>
                  <div className="flex w-full items-center gap-2">
                    <DayPill label="M" tone="done" />
                    <DayPill label="T" tone="done" />
                    <DayPill label="W" tone="today" />
                    <DayPill label="T" tone="idle" />
                    <DayPill label="F" tone="idle" />
                  </div>
                </div>
              </div>
            </article>

            <article className="relative flex h-full min-h-[520px] flex-col gap-8 overflow-hidden rounded-3xl p-8 md:min-h-[574px] md:p-10">
              <img
                src="/images/day-glance-bg.png"
                alt=""
                className="absolute inset-0 size-full object-cover"
              />
              <div className="relative flex flex-col gap-3">
                <h3 className="text-2xl font-bold tracking-[-0.48px] text-white">Your day, at a glance!</h3>
                <p className="text-base font-medium leading-[1.3] tracking-[-0.32px] text-white/60">
                  One dashboard shows what actually needs you — pending check-ins, open requests, nothing else.
                </p>
              </div>
              <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/20 [clip-path:inset(0_round_16px)]">
                <div className="flex flex-col gap-2 rounded-t-2xl bg-black/60 p-4 backdrop-blur-[12px]">
                  <p className="text-lg font-medium tracking-[-0.36px] text-white">Good Morning Jake!</p>
                  <p className="text-base font-medium tracking-[-0.32px] text-white/60">Tuesday, 25 Aug</p>
                </div>
                <div className="h-px w-full shrink-0 bg-white/20" />
                <div className="flex flex-1 flex-col gap-4 overflow-hidden rounded-b-2xl bg-black/60 px-4 py-6 backdrop-blur-[12px]">
                  {[
                    ["Pending Check-ins", "3"],
                    ["Check-in due", "2"],
                    ["Pending subscriptions", "2"],
                    ["Open requests", "7"],
                  ].map(([label, count], i, arr) => (
                    <div key={label}>
                      <div className="flex items-center justify-between">
                        <span className="flex h-8 items-center rounded-full border border-black/10 bg-white/30 px-2.5 font-[family-name:var(--font-cabinet)] text-base font-bold tracking-[-0.32px] text-white">
                          {label}
                        </span>
                        <span className="font-[family-name:var(--font-cabinet)] text-base font-bold tracking-[-0.32px] text-white">
                          {count}
                        </span>
                      </div>
                      {i < arr.length - 1 ? (
                        <div className="mt-4 h-px w-full bg-white/20">
                          <Asset src="/icons/line.svg" alt="" width={475} height={1} className="hidden" />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>

          <article className="relative h-[420px] overflow-hidden rounded-3xl bg-black p-8 md:h-[478px] md:p-10">
            <img
              src="/images/metrics-bg.png"
              alt=""
              className="absolute left-0 top-[-51%] h-[222%] w-[75%] max-w-none object-cover"
            />
            <div className="relative z-10 flex max-w-[258px] flex-col gap-3">
              <h3 className="text-2xl font-bold tracking-[-0.48px] text-white">Track every metrics</h3>
              <p className="text-base font-medium leading-[1.3] tracking-[-0.32px] text-white/60">
                A clear read on the week — weight, markers, and adherence — so adjustments come from a pattern, not a
                guess.
              </p>
            </div>
            <Button href="mailto:hello@forge.app" variant="solid-white" className="relative z-10 mt-8">
              Start Now
            </Button>
            <div className="absolute right-[-20px] top-[40px] hidden md:block lg:right-[40px] lg:top-[80px]">
              <PhoneMockup src="/images/phone-weight.png" alt="Weight trends" screenRadius={48} />
            </div>
          </article>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className="relative h-[441px] overflow-hidden rounded-3xl bg-chip p-8 md:p-10">
              <div className="relative z-10 flex flex-col gap-3">
                <h3 className="text-2xl font-bold tracking-[-0.48px] text-ink">Create, save diet plans and meals</h3>
                <p className="text-base font-medium leading-[1.3] tracking-[-0.32px] text-muted">
                  Add foods, macros and calories update on their own. Build a training-day and rest-day variant once —
                  your athlete just sees the one that applies today.
                </p>
              </div>
              <div className="absolute left-[72px] top-[214px] h-[294px] w-[401px] overflow-hidden rounded-[18.5px] max-md:left-6 max-md:w-[calc(100%-48px)]">
                <img
                  src="/images/diet-plan.png"
                  alt="Diet plan"
                  className="absolute left-[-4.43%] top-[-87.26%] h-[321.77%] w-[108.9%] max-w-none"
                />
              </div>
            </article>

            <article className="relative h-[441px] overflow-hidden rounded-3xl bg-chip p-8 md:p-10">
              <div className="relative z-10 flex flex-col gap-3">
                <h3 className="text-2xl font-bold tracking-[-0.48px] text-ink">Logged in real time, set by set</h3>
                <p className="text-base font-medium leading-[1.3] tracking-[-0.32px] text-muted">
                  Athletes log weight and reps as they train. You see the session fill in live — not a summary days
                  later.
                </p>
              </div>
              <div className="absolute bottom-0 left-1/2 h-[289px] w-[min(427px,calc(100%-48px))] -translate-x-1/2 overflow-hidden rounded-[18px]">
                <img
                  src="/images/workout-log.png"
                  alt="Workout log"
                  className="absolute inset-0 size-full object-cover object-top"
                />
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
