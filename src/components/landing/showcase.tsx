"use client";

import { useState } from "react";
import { PhoneMockup } from "@/components/landing/phone-mockup";
import { Container, SectionBadge, SectionTitle, cx } from "@/components/landing/ui";

const TABS = [
  {
    id: "Responsive",
    title: "Everything, from any device.",
    body: "Full coach dashboard on desktop, tablet, or phone — review check-ins and manage athletes wherever you are.",
    background: "/images/showcase-responsive-bg.png",
    backgroundPosition: "center",
    visual: "devices" as const,
  },
  {
    id: "Athlete’s view",
    title: "Everything they need, in one app.",
    body: "Diet, training, check-ins, protocols, planning, bloodwork — athletes log their day and see their progress without pinging you for updates.",
    background: "/images/showcase-athlete-bg.png",
    backgroundPosition: "center 35%",
    visual: "phone" as const,
  },
  {
    id: "Brand custom",
    title: "Your logo. Your colors. Your platform.",
    body: "Athletes open an app that looks like yours — logo, brand color, and favicon, end to end.",
    background: "/images/showcase-brand-bg.png",
    backgroundPosition: "center",
    visual: "brand" as const,
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

function BrandVisual() {
  return (
    <div className="absolute right-6 top-[56px] z-10 hidden w-[318px] md:block lg:right-10 lg:top-[72px]">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex size-[153px] items-center justify-center overflow-hidden rounded-[30px] bg-[#0048b0]">
          <img src="/images/showcase-brand-icon-light.svg" alt="" width={68} height={65} className="size-[68px]" />
        </div>
        <div className="flex size-[153px] items-center justify-center overflow-hidden rounded-[30px] bg-[#f7f7f7]">
          <img src="/images/showcase-brand-icon-dark.svg" alt="" width={68} height={65} className="size-[68px]" />
        </div>
        <div className="flex items-center">
          <img src="/images/showcase-brand-ascend.svg" alt="ascend" width={123} height={25} className="h-[25px] w-[123px]" />
        </div>
        <div className="h-[65px] rounded-[30px] bg-[#0048b0]" />
        <div className="col-span-2 h-[65px] rounded-[30px] bg-[#f7f7f7]" />
      </div>
    </div>
  );
}

function DevicesVisual() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] md:block">
      <div className="absolute right-[-24px] top-[48px] w-[min(534px,92%)] overflow-hidden rounded-lg bg-white p-2.5 lg:right-[-8px] lg:top-[68px]">
        <img
          src="/images/showcase-responsive-desktop.png"
          alt="Coach dashboard on desktop"
          className="aspect-[3420/2146] w-full object-cover object-top"
        />
      </div>
      <div className="absolute bottom-[-80px] left-[6%] lg:bottom-[-90px] lg:left-[12%]">
        <PhoneMockup
          src="/images/showcase-responsive-phone.png"
          alt="Athlete planning on mobile"
          width={249}
          height={515}
          screenRadius={36}
        />
      </div>
    </div>
  );
}

function PhoneVisual() {
  return (
    <div className="absolute right-[-10px] top-[90px] hidden md:block lg:right-[40px]">
      <PhoneMockup
        src="/images/showcase-athlete-phone.png"
        alt="Athlete daily overview"
        width={249}
        height={515}
        screenRadius={36}
      />
    </div>
  );
}

export function ShowcaseSection() {
  const [tab, setTab] = useState<TabId>("Athlete’s view");
  const active = TABS.find((item) => item.id === tab) ?? TABS[1];

  return (
    <section id="use-case" className="mt-[80px] w-full md:mt-[135px]">
      <Container className="flex flex-col items-center gap-12">
        <div className="flex w-full flex-col items-center gap-2">
          <SectionBadge>Fits every needs</SectionBadge>
          <SectionTitle align="center">
            An app that keeps
            <br />
            your coaching clear.
          </SectionTitle>
        </div>

        <div className="flex w-full flex-col items-center gap-7">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {TABS.map((item) => {
              const selected = item.id === tab;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setTab(item.id)}
                  className={cx(
                    "flex h-12 items-center justify-center rounded-xl border px-4 py-3 text-base font-bold tracking-[-0.32px]",
                    selected
                      ? "border-black/80 bg-chip text-[#131515]"
                      : "border-black/10 bg-page text-muted",
                  )}
                >
                  {item.id}
                </button>
              );
            })}
          </div>

          <div className="relative flex h-[360px] w-full items-end justify-between overflow-hidden rounded-3xl p-6 md:h-[475px] md:p-10">
            <img
              key={active.background}
              src={active.background}
              alt=""
              className="absolute inset-0 size-full object-cover"
              style={{ objectPosition: active.backgroundPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
            <div
              key={active.id}
              className="relative z-10 max-w-[395px] rounded-2xl border border-white/20 bg-black/20 p-6 text-white backdrop-blur-[17px]"
            >
              <p className="text-xl font-bold tracking-[-0.4px]">{active.title}</p>
              <p className="mt-2 text-base font-medium leading-[1.3] tracking-[-0.32px] text-white/60">
                {active.body}
              </p>
            </div>
            {active.visual === "phone" ? <PhoneVisual /> : null}
            {active.visual === "devices" ? <DevicesVisual /> : null}
            {active.visual === "brand" ? <BrandVisual /> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
