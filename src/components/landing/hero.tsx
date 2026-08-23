"use client";

import { useEffect, useState } from "react";
import { ForgeLogo } from "@/components/landing/icons";
import { ActionButton, Asset, Button, cx } from "@/components/landing/ui";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Demo" },
  { href: "#pricing", label: "Pricing" },
];

const BLUR_LAYERS = [
  { blur: 1, stops: "#000 0%, #000 40%, transparent 100%" },
  { blur: 2, stops: "#000 0%, #000 25%, transparent 70%" },
  { blur: 4, stops: "#000 0%, #000 16%, transparent 50%" },
  { blur: 8, stops: "#000 0%, #000 10%, transparent 36%" },
  { blur: 16, stops: "#000 0%, #000 6%, transparent 22%" },
  { blur: 32, stops: "#000 0%, transparent 12%" },
];

function ProgressiveBlur({ edge }: { edge: "top" | "bottom" }) {
  const dir = edge === "top" ? "to bottom" : "to top";

  return (
    <div className={cx("progressive-blur", edge === "bottom" && "progressive-blur-bottom")} aria-hidden>
      {BLUR_LAYERS.map((layer) => {
        const mask = `linear-gradient(${dir}, ${layer.stops})`;
        return (
          <span
            key={layer.blur}
            style={{
              backdropFilter: `blur(${layer.blur}px)`,
              WebkitBackdropFilter: `blur(${layer.blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}

export function FooterBlur() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 h-[180px]">
      <ProgressiveBlur edge="bottom" />
    </div>
  );
}

function WatchDemo() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <ActionButton type="button" variant="ghost-dark" className="w-full md:w-auto" onClick={() => setOpen(true)}>
        <Asset src="/icons/play.svg" alt="" width={24} height={24} />
        Watch demo
      </ActionButton>
      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-5"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Forge demo"
            className="relative w-full max-w-[1100px] overflow-hidden rounded-2xl bg-black shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close demo"
              className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-white text-xl font-bold text-ink"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <video src="/videos/demo.mp4" controls autoPlay playsInline className="max-h-[85vh] w-full bg-black" />
          </div>
        </div>
      ) : null}
    </>
  );
}

export function Header({ onDark = true }: { onDark?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <ProgressiveBlur edge="top" />
      <div className="relative mx-auto flex w-full max-w-[1728px] justify-center px-5 pt-4 md:px-[80px] md:pt-[75px]">
        <div className="relative flex w-full max-w-[1125px] items-center justify-between gap-3">
          <a
            href="#top"
            aria-label="Forge"
            className="flex h-12 shrink-0 items-center rounded-xl bg-white px-3.5 text-ink"
          >
            <ForgeLogo className="h-4 w-auto" />
          </a>

          <nav className="hidden h-12 items-center gap-8 rounded-xl bg-white px-6 font-bold tracking-[-0.32px] text-ink md:flex">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-base hover:opacity-70">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Button
                href="#contact"
                variant={onDark ? "ghost-dark" : "ghost-light"}
                className={cx(onDark && "shadow-none")}
              >
                Contact
              </Button>
            </div>
            <button
              type="button"
              className="flex size-12 items-center justify-center rounded-xl bg-white md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="font-bold text-ink">{open ? "×" : "☰"}</span>
            </button>
          </div>

          {open ? (
            <div className="absolute left-0 right-0 top-14 flex flex-col gap-2 rounded-2xl bg-white p-4 md:hidden">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-2 text-base font-bold text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="rounded-xl px-3 py-2 text-base font-bold text-ink"
                onClick={() => setOpen(false)}
              >
                Contact
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative flex flex-col overflow-hidden bg-ink md:min-h-[100svh]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] overflow-hidden md:bottom-[-160px] md:h-[70%]">
        <img
          src="/images/hero-glow.svg"
          alt=""
          className="absolute left-1/2 top-0 h-full w-[140%] max-w-none -translate-x-1/2"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-black via-black/55 to-transparent md:h-[40%] md:via-black/35" />

      <div className="relative mx-auto flex w-full max-w-[1728px] flex-col items-center px-5 pt-4 md:flex-1 md:px-[80px] md:pt-[75px]">
        <div className="h-12 w-full max-w-[1125px] shrink-0" aria-hidden />

        <div className="hero-copy mb-12 mt-10 flex w-full max-w-[361px] flex-col items-center gap-6 py-0 md:my-auto md:max-w-[938px] md:gap-8 md:py-24">
          <div className="flex items-center gap-3 rounded-full border border-white/24 bg-white/12 py-1 pr-3 pl-1">
            <div className="flex h-6 w-12 items-center justify-center rounded-full bg-blue-badge">
              <span className="font-[family-name:var(--font-cabinet)] text-base font-bold tracking-[-0.32px] text-white">
                New
              </span>
            </div>
            <p className="text-sm font-medium tracking-[-0.28px] text-white">A better way to coach</p>
          </div>

          <h1 className="font-[family-name:var(--font-cabinet)] text-center text-[48px] font-medium leading-none tracking-[-0.96px] text-white md:text-[72px] md:tracking-[-1.92px] lg:text-[96px]">
            <span className="md:hidden">
              Your athletes
              <br />
              deserve one
              <br />
              place. Not five.
            </span>
            <span className="hidden md:inline">Your athletes deserve one place. Not five.</span>
          </h1>

          <p className="text-center text-base font-medium tracking-[-0.32px] text-white/60 md:max-w-[600px] md:text-2xl md:tracking-[-0.48px]">
            Replace the spreadsheets, the shared docs, and the five different apps — with one platform that&apos;s
            actually yours.
          </p>

          <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:flex-wrap md:items-center md:justify-center">
            <WatchDemo />
            <Button href="#contact" variant="solid-white" className="w-full md:w-auto">
              Get your own app
            </Button>
          </div>
        </div>
      </div>

      <div
        id="product"
        className="relative mx-auto w-full max-h-[180px] overflow-hidden rounded-t-[20px] bg-white p-2 pb-0 md:w-[min(1480px,86vw)] md:max-h-[min(38vh,460px)] md:rounded-t-[30px] md:p-3 md:pb-0"
      >
        <div className="hero-dashboard relative overflow-hidden rounded-t-[16px] md:rounded-t-[20px]" style={{ aspectRatio: "3306 / 1073" }}>
          <img
            src="/images/dashboard.png"
            alt="Forge coach dashboard"
            width={1900}
            height={1233}
            className="absolute inset-0 h-[200%] w-full max-w-none object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
