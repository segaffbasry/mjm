"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Logo } from "./ui";
import { useMotion } from "./SmoothScroll";

export default function Preloader() {
  const { setReady } = useMotion();
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const counter = { v: 0 };
    const num = root.current!.querySelector<HTMLElement>("[data-num]")!;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onComplete: () => setDone(true),
      });
      tl.fromTo("[data-logo]", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.6 })
        .fromTo("[data-bar]", { scaleX: 0 }, { scaleX: 1, duration: 2.1, ease: "power3.inOut" }, 0)
        .to(
          counter,
          {
            v: 100,
            duration: 2.1,
            ease: "power3.inOut",
            onUpdate: () => (num.textContent = String(Math.round(counter.v)).padStart(3, "0")),
          },
          0,
        )
        .to("[data-inner]", { yPercent: -40, autoAlpha: 0, duration: 1.1, ease: "expo.in" }, 2.2)
        .add(() => setReady(true), 2.75)
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 1.3 }, 2.75);
    }, root);
    return () => ctx.revert();
  }, [setReady]);

  if (done) return null;

  return (
    <div
      ref={root}
      className="grain fixed inset-0 z-[100] overflow-hidden bg-navy text-white"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden
    >
      <div data-inner className="absolute inset-0 flex flex-col items-center justify-center">
        <div data-logo>
          <Logo className="w-[150px] md:w-[190px]" />
        </div>
        <div className="mt-10 h-px w-[180px] bg-white/15">
          <div data-bar className="h-full w-full origin-left bg-teal" />
        </div>
        <div className="eyebrow mt-6 flex w-[180px] justify-between text-white/50">
          <span>MJM Marine</span>
          <span data-num className="font-cond text-[13px] tracking-[0.2em] text-white">
            000
          </span>
        </div>
      </div>
    </div>
  );
}
