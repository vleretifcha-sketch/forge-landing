"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaqSection } from "@/components/landing/faq";
import { FeaturesSection } from "@/components/landing/features";
import { FooterBlur, Header, Hero } from "@/components/landing/hero";
import { PricingSection } from "@/components/landing/pricing";
import { ShowcaseSection } from "@/components/landing/showcase";
import { TestimonialsSection } from "@/components/landing/testimonials";
import { TrackingSection } from "@/components/landing/tracking";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function LandingPage() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero.from(".hero-copy > *", { y: 28, opacity: 0, duration: 0.8, stagger: 0.12 });
      hero.from(".hero-dashboard", { y: 64, opacity: 0, duration: 1 }, "-=0.4");

      gsap.utils.toArray<HTMLElement>("section:not(#top)").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 28 },
          {
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

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
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
    </div>
  );
}
