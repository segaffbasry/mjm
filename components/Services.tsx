"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { services } from "@/lib/content";
import { Arrow, Split } from "./ui";

export default function Services() {
  const cursor = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLUListElement>(null);

  // a soft disc trails the pointer across the tiles
  useEffect(() => {
    const c = cursor.current!;
    const g = grid.current!;
    if (!matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(c, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(c, "y", { duration: 0.6, ease: "power3" });
    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const enter = (e: PointerEvent) => {
      gsap.set(c, { x: e.clientX, y: e.clientY });
      gsap.to(c, { scale: 1, autoAlpha: 1, duration: 0.7, ease: "expo.out" });
    };
    const leave = () => gsap.to(c, { scale: 0, autoAlpha: 0, duration: 0.5, ease: "expo.out" });
    g.addEventListener("pointermove", move);
    g.addEventListener("pointerenter", enter);
    g.addEventListener("pointerleave", leave);
    return () => {
      g.removeEventListener("pointermove", move);
      g.removeEventListener("pointerenter", enter);
      g.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section id="services" className="grain relative overflow-hidden bg-navy px-[var(--gutter)] py-[clamp(100px,13vw,200px)] text-white">
      <div className="relative mx-auto max-w-[1600px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div data-reveal="up" className="mb-8 flex items-center gap-4">
              <span className="font-cond text-sm tracking-[0.2em] text-teal-mist">03</span>
              <span className="h-px w-12 bg-white/30" />
            </div>
            <h2 data-reveal="words" className="display text-[clamp(56px,8vw,150px)] italic">
              <Split text={services.title} />
            </h2>
          </div>
          <p data-reveal="up" className="max-w-[46ch] text-[16px] leading-[1.75] text-white/70 lg:col-span-4 lg:col-start-9 lg:pb-4">
            {services.text}
          </p>
        </div>

        <ul ref={grid} className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 md:mt-24 lg:grid-cols-4 lg:gap-5">
          {services.items.map((s, i) => (
            <li key={s.title} className={i % 2 ? "mt-10 lg:mt-24" : ""}>
              <a href={s.href} className="group block cursor-none">
                <div
                  data-reveal="clip"
                  data-delay={i * 0.12}
                  className={`relative aspect-[3/4.2] overflow-hidden ${s.logo ? "bg-vyv" : "bg-navy-2"}`}
                >
                  <div className="absolute inset-0 transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.07]">
                    {s.logo ? (
                      <Image
                        src={s.image}
                        alt={s.title}
                        width={s.width}
                        height={s.height}
                        className="absolute left-1/2 top-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2"
                      />
                    ) : (
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent opacity-70 transition-opacity duration-1000 group-hover:opacity-100" />
                  <span className="font-cond absolute left-4 top-4 text-sm sm:left-6 sm:top-6 tracking-[0.2em] text-white/80">
                    0{i + 1}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-teal transition-transform duration-[1100ms] ease-[var(--ease-expo)] group-hover:scale-x-100" />
                  <div className="absolute inset-x-4 bottom-5 flex flex-col items-start justify-between gap-3 sm:inset-x-6 sm:bottom-7 sm:flex-row sm:items-end">
                    <h3 className="display text-[clamp(19px,2.1vw,34px)] leading-[1.02] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-1.5">
                      {s.title}
                    </h3>
                    <span className="hidden h-11 w-11 shrink-0 sm:flex items-center justify-center overflow-hidden rounded-full border border-white/40 transition-[background-color,border-color] duration-700 group-hover:border-teal group-hover:bg-teal">
                      <Arrow className="-rotate-45 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:rotate-0" />
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={cursor}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] -ml-12 -mt-12 flex h-24 w-24 scale-0 items-center justify-center rounded-full bg-paper text-navy opacity-0"
      >
        <Arrow />
      </div>
    </section>
  );
}
