"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { intro } from "@/lib/content";
import { useMotion } from "./SmoothScroll";

export default function Intro() {
  const { ready } = useMotion();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-para]", start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        },
      );

    }, ref);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden bg-paper px-[var(--gutter)] py-[clamp(110px,18vw,260px)]">

      <div className="relative mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-12 ">
        <div className="lg:col-span-3">
          <div data-reveal="up" className="flex items-center gap-4">
            <span className="font-cond text-sm tracking-[0.2em] text-teal">01</span>
            <span className="h-px w-12 bg-navy/25" />
            <span className="eyebrow text-navy/60">About Us</span>
          </div>
        </div>
        <p
          data-para
          className="display text-[clamp(30px,3.9vw,68px)] leading-[1.08] tracking-[-0.015em] text-navy lg:col-span-9"
        >
          {intro.split(" ").map((w, i) => (
            <span key={i} data-word className={i >= 4 && i <= 11 ? "inline text-teal" : "inline"}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
