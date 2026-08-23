"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactSection } from "@/components/landing/contact";
import { FaqSection } from "@/components/landing/faq";
import { FeaturesSection } from "@/components/landing/features";
import { SiteFooter } from "@/components/landing/footer";
import { FooterBlur, Header, Hero } from "@/components/landing/hero";
import { PricingSection } from "@/components/landing/pricing";
import { ShowcaseSection } from "@/components/landing/showcase";
import { TrackingSection } from "@/components/landing/tracking";

gsap.registerPlugin(useGSAP, ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export function LandingPage() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero.from(".hero-copy > *", { y: 28, opacity: 0, duration: 0.8, stagger: 0.12 });
      hero.from(".hero-dashboard", { y: 64, opacity: 0, duration: 1 }, "-=0.4");

      const ring = gsap.utils.toArray<SVGCircleElement>(".hours-ring-progress")[0];
      if (ring) {
        const length = ring.getTotalLength();
        const progress = Number(ring.dataset.progress ?? 0.72);
        gsap.fromTo(
          ring,
          { attr: { "stroke-dashoffset": length } },
          {
            attr: { "stroke-dashoffset": length * (1 - progress) },
            duration: 1.45,
            ease: "power2.out",
            immediateRender: true,
            scrollTrigger: {
              trigger: ring,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      const glance = gsap.utils.toArray<HTMLElement>(".day-glance-card")[0];
      if (glance) {
        const glanceTl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: glance,
            start: "top 82%",
            once: true,
          },
        });

        glanceTl
          .from(".day-glance-hello", { y: 14, autoAlpha: 0, duration: 0.48 })
          .from(".day-glance-date", { y: 10, autoAlpha: 0, duration: 0.4 }, "-=0.3")
          .from(".day-glance-card > .day-glance-rule", { scaleX: 0, duration: 0.42, ease: "power2.inOut" }, "-=0.18");

        gsap.utils.toArray<HTMLElement>(".day-glance-row").forEach((row, i) => {
          const chip = row.querySelector(".day-glance-chip");
          const count = row.querySelector(".day-glance-count");
          const rule = row.querySelector(".day-glance-rule");
          glanceTl
            .from(chip, { x: -18, autoAlpha: 0, duration: 0.42 }, i === 0 ? "-=0.12" : "-=0.28")
            .from(count, { x: 14, autoAlpha: 0, duration: 0.42 }, "<");
          if (rule) {
            glanceTl.from(rule, { scaleX: 0, duration: 0.32, ease: "power2.out" }, "-=0.22");
          }
        });

        glanceTl.eventCallback("onComplete", () => {
          gsap.set(
            ".day-glance-hello, .day-glance-date, .day-glance-chip, .day-glance-count, .day-glance-rule",
            { clearProps: "transform" },
          );
        });
      }

      const metricsCard = gsap.utils.toArray<HTMLElement>(".metrics-phone-card")[0];
      if (metricsCard) {
        gsap.from(".metrics-phone", {
          yPercent: 55,
          duration: 1.15,
          ease: "power3.out",
          immediateRender: true,
          scrollTrigger: {
            trigger: metricsCard,
            start: "top 78%",
            once: true,
          },
        });
      }

      const price = gsap.utils.toArray<HTMLElement>(".price-counter")[0];
      if (price) {
        const target = Number(price.dataset.target ?? 49);
        const counter = { value: 0 };
        price.textContent = "0";
        gsap.to(counter, {
          value: target,
          duration: 1.35,
          ease: "power2.out",
          snap: { value: 1 },
          onUpdate: () => {
            price.textContent = String(Math.round(counter.value));
          },
          scrollTrigger: {
            trigger: price,
            start: "top 85%",
            once: true,
          },
        });
      }

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="min-h-screen overflow-x-clip bg-page">
      <Header />
      <FooterBlur />
      <Hero />
      <TrackingSection />
      <FeaturesSection />
      <ShowcaseSection />
      <PricingSection />
      <FaqSection />
      <ContactSection />
      <SiteFooter />
    </div>
  );
}
