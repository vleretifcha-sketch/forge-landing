"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { PhoneMockup } from "@/components/landing/phone-mockup";
import { Asset, Button, cx } from "@/components/landing/ui";

const TILE_SHADOW = "0px 10px 28px rgba(15,17,21,0.1), 0px 18px 40px rgba(0,0,0,0.04)";

type Metric = {
  label: string;
  icon: string;
  color: string;
  glow: string;
  photo: string;
};

const ROW_ONE: Metric[] = [
  { label: "PEDs", icon: "/icons/dna.svg", color: "#0023ff", glow: "rgba(0,35,255,0.4)", photo: "/images/tile-peds.jpg" },
  { label: "Supps", icon: "/icons/file.svg", color: "#0023ff", glow: "rgba(0,35,255,0.4)", photo: "/images/tile-supps.jpg" },
  { label: "Bloodwork", icon: "/icons/water.svg", color: "#9d00ff", glow: "rgba(115,0,255,0.4)", photo: "/images/tile-bloodwork.jpg" },
  { label: "Check-ins", icon: "/icons/file.svg", color: "#0023ff", glow: "rgba(0,35,255,0.4)", photo: "/images/tile-checkins.jpg" },
  { label: "Weight", icon: "/icons/gym.svg", color: "#0023ff", glow: "rgba(0,35,255,0.4)", photo: "/images/tile-weight.jpg" },
];

const ROW_TWO: Metric[] = [
  { label: "Training", icon: "/icons/gym.svg", color: "#0023ff", glow: "rgba(0,35,255,0.4)", photo: "/images/tile-training.jpg" },
  { label: "Diets", icon: "/icons/meal.svg", color: "#0db596", glow: "rgba(10,223,166,0.4)", photo: "/images/tile-diets.jpg" },
  { label: "Steps", icon: "/icons/walk.svg", color: "#0023ff", glow: "rgba(0,35,255,0.4)", photo: "/images/metric-photo.png" },
  { label: "Cardio", icon: "/icons/heart.svg", color: "#ff0149", glow: "rgba(255,0,68,0.4)", photo: "/images/tile-cardio.jpg" },
  { label: "Sessions", icon: "/icons/gym.svg", color: "#0023ff", glow: "rgba(0,35,255,0.4)", photo: "/images/gym-hero.png" },
];

function IconTile({ metric }: { metric: Metric }) {
  return (
    <div
      className="flex size-[146px] shrink-0 flex-col items-center justify-center gap-4 rounded-2xl bg-white px-[47px] py-2.5"
      style={{ boxShadow: TILE_SHADOW }}
    >
      <div
        className="relative size-[52px] rounded-full"
        style={{ backgroundColor: metric.color, boxShadow: `0px 11px 14px 0px ${metric.glow}` }}
      >
        <Asset
          src={metric.icon}
          alt=""
          width={24}
          height={24}
          className="absolute left-[14px] top-[14px] max-w-none"
        />
      </div>
      <p className="w-full text-center text-base font-bold tracking-[-0.32px] text-ink">{metric.label}</p>
    </div>
  );
}

function PhotoTile({ src }: { src: string }) {
  return (
    <div
      className="relative size-[146px] shrink-0 rounded-2xl"
      style={{ boxShadow: TILE_SHADOW }}
    >
      <img
        src={src}
        alt=""
        width={146}
        height={146}
        className="absolute inset-0 size-full rounded-2xl object-cover"
        decoding="async"
      />
    </div>
  );
}

function MetricRow({ items, clone = false }: { items: Metric[]; clone?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-[19px]" aria-hidden={clone || undefined}>
      {items.map((metric, i) => (
        <div key={`${metric.label}-${i}`} className="flex items-center gap-4">
          <IconTile metric={metric} />
          <PhotoTile src={metric.photo} />
        </div>
      ))}
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  className,
}: {
  items: Metric[];
  direction: "left" | "right";
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;

    const measure = () => {
      const first = el.children[0] as HTMLElement | undefined;
      if (!first) return;
      const gap = Number.parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap) || 0;
      const next = first.offsetWidth + gap;
      if (next < 1) return;
      setShift((prev) => (Math.abs(prev + next) < 1 ? prev : -next));
    };

    measure();

    const images = Array.from(el.querySelectorAll("img"));
    images.forEach((img) => {
      if (!img.complete) img.addEventListener("load", measure);
    });

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    return () => {
      images.forEach((img) => img.removeEventListener("load", measure));
      ro.disconnect();
    };
  }, [direction]);

  const duration = shift < 0 ? Math.abs(shift) / 48 : 0;

  return (
    <div className={cx("min-h-[146px]", className)}>
      <div
        ref={track}
        className="marquee-track flex w-max items-center gap-[19px] py-12"
        style={{
          marginBlock: "-3rem",
          ["--marquee-shift" as string]: `${shift}px`,
          animationDuration: duration ? `${duration}s` : undefined,
          animationDirection: direction === "left" ? "normal" : "reverse",
          animationPlayState: duration ? "running" : "paused",
        }}
      >
        <MetricRow items={items} />
        <MetricRow items={items} clone />
      </div>
    </div>
  );
}

export function TrackingSection() {
  const [role, setRole] = useState<"coach" | "athlete">("athlete");

  return (
    <section className="relative z-10 mt-[72px] flex w-full flex-col items-center gap-[72px] md:mt-[135px]">
      <div className="flex max-w-[935px] flex-col items-center gap-12 px-5">
        <h2 className="max-w-[935px] text-center text-[32px] font-bold leading-normal tracking-[-1.04px] text-ink md:text-[52px]">
          Everything you track{" "}
          <span className="relative inline-block h-[41px] w-[90px] translate-y-1 overflow-hidden rounded-full align-middle">
            <span className="absolute inset-0 bg-[#f71c00]" />
            <img src="/images/pill-watch.png" alt="" className="absolute inset-0 size-full object-cover" />
          </span>{" "}
          in one place your athletes{" "}
          <span className="relative inline-block h-[41px] w-[90px] translate-y-1 overflow-hidden rounded-full align-middle">
            <span className="absolute inset-0 bg-[#f71c00]" />
            <img src="/images/pill-handshake.png" alt="" className="absolute inset-0 size-full object-cover" />
          </span>{" "}
          actually trust.
        </h2>

        <div className="flex max-w-[555px] flex-col items-center gap-4">
          <p className="text-center text-xl font-medium tracking-[-0.48px] text-ink md:text-2xl">
            Used by coaches to improve their workflow.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["#PersonalTrainers", "#Coaches", "#Athletes"].map((tag) => (
              <span
                key={tag}
                className="flex h-8 items-center justify-center rounded-full bg-chip px-2.5 text-base font-bold tracking-[-0.32px] text-ink"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center">
        <div className="flex rounded-full bg-chip p-1">
          {(["coach", "athlete"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRole(value)}
              className={cx(
                "flex h-10 items-center justify-center rounded-full px-4 text-base font-bold tracking-[-0.32px] text-ink",
                role === value ? "bg-page" : "bg-chip",
              )}
            >
              {value === "coach" ? "Coach" : "Athlete"}
            </button>
          ))}
        </div>

        <div className="relative h-[520px] w-full overflow-hidden md:h-[807px]">
          <MarqueeRow
            items={ROW_ONE}
            direction="left"
            className="absolute top-[110px] w-full md:top-[230px]"
          />
          <MarqueeRow
            items={ROW_TWO}
            direction="right"
            className="absolute top-[250px] w-full md:top-[392px]"
          />

          <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 bg-gradient-to-r from-page to-transparent md:w-[22%] md:from-[12%]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-gradient-to-l from-page to-transparent md:w-[22%] md:from-[12%]" />

          <div className="absolute left-1/2 top-[32px] z-10 -translate-x-1/2 md:top-[33px]">
            <div className="md:hidden">
              <PhoneMockup
                src={role === "athlete" ? "/images/phone-athlete.png" : "/images/phone-coach.png"}
                alt={role === "athlete" ? "Athlete daily overview" : "Coach app"}
                width={210}
                height={434}
                screenRadius={role === "athlete" ? 45 : 0}
              />
            </div>
            <div className="hidden md:block">
              <PhoneMockup
                src={role === "athlete" ? "/images/phone-athlete.png" : "/images/phone-coach.png"}
                alt={role === "athlete" ? "Athlete daily overview" : "Coach app"}
                screenRadius={role === "athlete" ? 45 : 0}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href="#contact" variant="ghost-light">
            Contact Us
          </Button>
          <Button href="#contact" variant="solid-dark">
            Get your own app
          </Button>
        </div>
      </div>
    </section>
  );
}
