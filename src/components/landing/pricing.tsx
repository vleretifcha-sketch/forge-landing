import { Button, Container, SectionBadge, SectionTitle, cx } from "@/components/landing/ui";

const SOLO_PERKS = [
  "Fully white-labeled app, your brand",
  "All features included",
  "Unlimited client tracking",
  "Your rate never changes, even as Forge grows",
];

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="mt-0.5 shrink-0">
      <circle cx="10" cy="10" r="10" fill="#0023ff" />
      <path d="M6 10.2 8.6 12.8 14 7.4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlanBadge({ children, tone }: { children: string; tone: "light" | "dark" }) {
  return (
    <div
      className={cx(
        "inline-flex h-8 w-fit items-center justify-center rounded-full px-2.5",
        tone === "light"
          ? "border border-black/10 bg-chip"
          : "border border-white/20 bg-white/10",
      )}
    >
      <span
        className={cx(
          "font-[family-name:var(--font-cabinet)] text-base font-bold tracking-[-0.32px]",
          tone === "light" ? "text-ink" : "text-white",
        )}
      >
        {children}
      </span>
    </div>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="mt-[80px] w-full md:mt-[135px]">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col items-center gap-2">
          <SectionBadge>Pricing</SectionBadge>
          <SectionTitle align="center">
            Your app.
            <br />
            Your rate, locked in.
          </SectionTitle>
        </div>

        <div className="grid items-stretch gap-4 lg:grid-cols-2">
          <article className="flex flex-col gap-8 rounded-3xl bg-white p-8 shadow-[0px_14px_12px_rgba(0,0,0,0.05)] md:p-10">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <PlanBadge tone="light">Solo Coach</PlanBadge>
                <div className="inline-flex h-8 w-fit items-center justify-center rounded-full bg-blue-badge px-2.5">
                  <span className="font-[family-name:var(--font-cabinet)] text-base font-bold tracking-[-0.32px] text-white">
                    25 spots available
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold tracking-[-0.48px] text-ink">Founding Member Offer*</h3>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-lg font-medium tracking-[-0.36px] text-muted">
                <span className="font-bold text-ink">990 AUD</span>
                <span className="ml-2">One-time setup</span>
              </p>
              <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
                <p className="text-[48px] font-bold leading-none tracking-[-1.2px] text-ink md:text-[56px]">
                  <span className="price-counter inline-block min-w-[1.35em] tabular-nums" data-target="49">
                    49
                  </span>{" "}
                  AUD
                </p>
                <span className="pb-1 text-lg font-medium leading-none tracking-[-0.36px] text-muted">
                  /month · Locked for life
                </span>
              </div>
            </div>

            <ul className="flex flex-col gap-3">
              {SOLO_PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-base font-medium leading-[1.3] tracking-[-0.32px] text-ink">
                  <CheckIcon />
                  {perk}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-4">
              <Button href="#contact-founding" variant="solid-dark" className="w-full">
                Claim my spot
              </Button>
              <p className="text-sm font-medium leading-[1.4] tracking-[-0.28px] text-muted">
                *After founding spots close: 99 AUD/month
                <br />
                Your rate freezes the moment you sign up. Forever.
              </p>
            </div>
          </article>

          <article className="relative flex min-h-[560px] flex-col justify-between gap-10 overflow-hidden rounded-3xl p-8 md:min-h-[640px] md:p-10 lg:min-h-0">
            <img
              src="/images/gym-hero.png"
              alt=""
              className="pointer-events-none absolute -inset-1 h-[calc(100%+8px)] w-[calc(100%+8px)] max-w-none object-cover object-[center_18%]"
            />
            <div className="pointer-events-none absolute -inset-1 bg-gradient-to-b from-black/80 via-black/40 to-black/45" />
            <div className="relative z-10 flex flex-col gap-4">
              <PlanBadge tone="dark">Multi-Coaches</PlanBadge>
              <h3 className="text-2xl font-bold tracking-[-0.48px] text-white">Managing a coaching team?</h3>
              <p className="max-w-[420px] text-base font-medium leading-[1.4] tracking-[-0.32px] text-white/80">
                Multi-coach hierarchy, custom development, architecture built around your structure.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-3">
              <Button href="#book" variant="solid-white" className="w-full">
                Book a discovery call
              </Button>
              <p className="text-sm font-medium tracking-[-0.28px] text-white/70">20 min, no commitment.</p>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
