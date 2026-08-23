"use client";

import { useState } from "react";
import { MailIcon, MinusIcon, PlusIcon } from "@/components/landing/icons";
import { Button, Container, SectionBadge, SectionTitle } from "@/components/landing/ui";

const QUESTIONS = [
  {
    q: "Question 1",
    a: "Athletes log weight and reps as they train.",
  },
  {
    q: "Question 1",
    a: "Athletes log weight and reps as they train.",
  },
  {
    q: "Question 1",
    a: "Athletes log weight and reps as they train.",
  },
  {
    q: "Question 1",
    a: "Athletes log weight and reps as they train.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="mt-[80px] w-full pb-[120px] md:mt-[135px] md:pb-[160px]">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-[31px]">
          <div className="flex flex-1 flex-col gap-14">
            <div className="flex flex-col items-start gap-2">
              <SectionBadge>Common questions</SectionBadge>
              <SectionTitle>
                Frequently
                <br />
                asked questions
              </SectionTitle>
            </div>
            <div className="flex w-full max-w-[365px] flex-col items-start gap-6 rounded-3xl bg-white p-6 shadow-[0px_14px_12px_rgba(0,0,0,0.05)]">
              <div className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-[#0b2cff]">
                <MailIcon size={24} />
              </div>
              <p className="text-2xl font-bold leading-[1.3] tracking-[-0.48px] text-[#131515]">
                Can’t find your answer?
              </p>
              <Button href="mailto:hello@forge.app" variant="solid-dark">
                Contact us
              </Button>
            </div>
          </div>

          <div className="flex w-full flex-col gap-[9px] lg:w-[555px] lg:shrink-0">
            {QUESTIONS.map((item, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full flex-col items-start gap-4 rounded-3xl bg-white p-6 text-left shadow-[0px_14px_12px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-lg font-bold leading-[1.3] tracking-[-0.36px] text-[#131515]">{item.q}</span>
                    <span className="flex size-8 items-center justify-center rounded-full bg-chip">
                      {isOpen ? <MinusIcon size={20} /> : <PlusIcon size={24} />}
                    </span>
                  </div>
                  {isOpen ? (
                    <p className="text-lg font-medium leading-[1.3] tracking-[-0.36px] text-muted">{item.a}</p>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
