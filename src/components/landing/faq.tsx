"use client";

import { useState } from "react";
import { MailIcon, MinusIcon, PlusIcon } from "@/components/landing/icons";
import { Button, Container, SectionBadge, SectionTitle } from "@/components/landing/ui";

const QUESTIONS = [
  {
    q: "Is the app white-labeled as my brand?",
    a: "Yes. Your logo, colors, and favicon sit on login, the tab bar, and buttons. Athletes open an app that looks like yours — not a generic tool with someone else’s name on it.",
  },
  {
    q: "What do I get on the founding plan?",
    a: "Everything: check-ins, diets, training, PEDs, supplements, bloodwork, and unlimited clients. 990 AUD setup, then 49 AUD/month locked for life. After founding spots close, the monthly rate is 99 AUD.",
  },
  {
    q: "How do athletes actually use it?",
    a: "They open their phone and see what’s due today — check-in, meals to tick off, steps, cardio, and the next session. They log weight and reps set by set while they train. You see it fill in live.",
  },
  {
    q: "I manage a coaching team. Can we run Forge together?",
    a: "Yes. Multi-coach hierarchy and custom architecture are built around your structure. Book a 20-minute discovery call — no commitment.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="mt-[80px] w-full md:mt-[135px]">
      <Container>
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_555px] lg:grid-rows-[auto_1fr] lg:gap-x-[31px] lg:gap-y-14">
          <div className="flex flex-col items-start gap-2">
            <SectionBadge>Common questions</SectionBadge>
            <SectionTitle>
              Frequently
              <br />
              asked questions
            </SectionTitle>
          </div>

          <div className="flex w-full flex-col gap-[9px] lg:col-start-2 lg:row-span-2">
            {QUESTIONS.map((item, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={item.q}
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full flex-col items-start gap-4 rounded-3xl bg-white p-6 text-left shadow-[0px_14px_12px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="pr-3 text-base font-bold leading-[1.3] tracking-[-0.32px] text-[#131515] md:text-lg md:tracking-[-0.36px]">
                      {item.q}
                    </span>
                    <span className="flex size-8 items-center justify-center rounded-full bg-chip">
                      {isOpen ? <MinusIcon size={20} /> : <PlusIcon size={24} />}
                    </span>
                  </div>
                  {isOpen ? (
                    <p className="text-sm font-medium leading-[1.4] tracking-[-0.28px] text-muted md:text-lg md:leading-[1.3] md:tracking-[-0.36px]">
                      {item.a}
                    </p>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="flex w-full max-w-[365px] flex-col items-start gap-6 rounded-3xl bg-white p-6 shadow-[0px_14px_12px_rgba(0,0,0,0.05)]">
            <div className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-[#0b2cff]">
              <MailIcon size={24} />
            </div>
            <p className="text-2xl font-bold leading-[1.3] tracking-[-0.48px] text-[#131515]">
              Can’t find your answer?
            </p>
            <Button href="#contact" variant="solid-dark">
              Contact us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
