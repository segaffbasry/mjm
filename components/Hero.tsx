"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { hero } from "@/lib/content";
import { Arrow, Roll, Split } from "./ui";
import { useMotion } from "./SmoothScroll";

const DURATION = 7;

export default function Hero() {
  const { ready, lenis } = useMotion();
  const root = useRef<HTMLElement>(null);
  const slides = useRef<HTMLDivElement[]>([]);
  const [index, setIndex] = useState(0);
  const current = useRef(0);
  const busy = useRef(false);
  const timer = useRef<gsap.core.Tween | null>(null);

  const show = useCallback((next: number) => {
    const prev = current.current;
    if (next === prev || busy.current) return;
    busy.current = true;
    const dir = next > prev || (prev === hero.slides.length - 1 && next === 0) ? 1 : -1;
    const a = slides.current[prev];
    const b = slides.current[next];
    current.current = next;
    setIndex(next);

    gsap.set(slides.current, { zIndex: 0 });
    gsap.set(a, { zIndex: 1 });
    gsap.set(b, { zIndex: 2, clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" });

    gsap
      .timeline()
      .to(b, { clipPath: "inset(0 0% 0 0%)", duration: 1.7, ease: "expo.inOut" })
      .fromTo(
        b.querySelector("img"),
        { scale: 1.35, xPercent: 12 * dir },
        { scale: 1.08, xPercent: 0, duration: 2.2, ease: "expo.inOut" },
        0,
      )
      .to(a.querySelector("img"), { xPercent: -18 * dir, duration: 1.7, ease: "expo.inOut" }, 0)
      .set(a.querySelector("img"), { xPercent: 0 })
      .add(() => void (busy.current = false))
      .to(b.querySelector("img"), { scale: 1, duration: DURATION, ease: "none" });
  }, []);

  // autoplay driven by a tween so the progress bar and slide change stay in lock-step
  const startTimer = useCallback(function run() {
    timer.current?.kill();
    const bar = root.current!.querySelector<HTMLElement>(`[data-progress='${current.current}']`);
    root.current!.querySelectorAll<HTMLElement>("[data-progress]").forEach((el) => gsap.set(el, { scaleX: 0 }));
    timer.current = gsap.to(bar, {
      scaleX: 1,
      duration: DURATION,
      ease: "none",
      onComplete: () => {
        show((current.current + 1) % hero.slides.length);
        run();
      },
    });
  }, [show]);

  const goTo = (i: number) => {
    if (busy.current || i === current.current) return;
    show(i);
    startTimer();
  };

  useEffect(() => {
    gsap.set(slides.current.slice(1), { clipPath: "inset(0 0 0 100%)" });
    gsap.set(root.current!.querySelectorAll("[data-hero-in]"), { autoAlpha: 0, y: 30 });
    gsap.set(root.current!.querySelectorAll("[data-c]"), { yPercent: 115 });
    gsap.set(root.current!.querySelectorAll(".hero-sub [data-w]"), { yPercent: 115 });
    gsap.set(slides.current[0].querySelector("img"), { scale: 1.3 });
  }, []);

  useEffect(() => {
    if (!ready) return;
    const r = root.current!;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.1 })
        .to(slides.current[0].querySelector("img"), { scale: 1.08, duration: 2.6, ease: "expo.out" })
        .to("[data-c]", { yPercent: 0, duration: 1.6, ease: "expo.out", stagger: 0.045 }, 0.35)
        .to(".hero-sub [data-w]", { yPercent: 0, duration: 1.4, ease: "expo.out", stagger: 0.08 }, 0.8)
        .to("[data-hero-in]", { autoAlpha: 1, y: 0, duration: 1.4, ease: "expo.out", stagger: 0.08 }, 1)
        .add(startTimer, 1.2)
        .to(slides.current[0].querySelector("img"), { scale: 1, duration: DURATION, ease: "none" }, 2.6);

      // scroll-out: content drifts and fades, media sinks and dims
      gsap.to("[data-hero-content]", {
        yPercent: -35,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: r, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-media]", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: { trigger: r, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-shade]", {
        opacity: 0.75,
        ease: "none",
        scrollTrigger: { trigger: r, start: "top top", end: "bottom top", scrub: true },
      });
    }, r);
    return () => {
      timer.current?.kill();
      ctx.revert();
    };
  }, [ready, startTimer]);

  const touchX = useRef(0);
  const [num] = hero.slides[index].location.split("|").map((s) => s.trim());

  return (
    <section
      ref={root}
      id="top"
      onTouchStart={(e) => void (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) goTo((index + (dx < 0 ? 1 : -1) + hero.slides.length) % hero.slides.length);
      }}
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-navy text-white">
      <div data-hero-media className="absolute inset-0">
        {hero.slides.map((s, i) => (
          <div
            key={s.src}
            ref={(el) => void (el && (slides.current[i] = el))}
            className="absolute inset-0 overflow-hidden"
            style={{ zIndex: i === 0 ? 1 : 0 }}
          >
            <Image
              src={s.src}
              alt=""
              fill
              preload={i === 0}
              sizes="100vw"
              className="object-cover will-change-transform"
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-navy/70 via-navy/10 to-navy/85" />
      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-navy/60 via-transparent to-transparent" />
      <div data-hero-shade className="pointer-events-none absolute inset-0 z-[3] bg-navy opacity-0" />

      <div
        data-hero-content
        className="absolute inset-x-0 bottom-0 z-[4] px-[var(--gutter)] pb-[clamp(28px,5vh,56px)]"
      >
        <p data-hero-in className="eyebrow mb-7 text-teal-mist">Craftsmanship. At every scale.</p>
        <h1 className="max-w-[1000px]">
          <span className="display block text-[clamp(62px,8.5vw,148px)] italic leading-[0.86] text-white">
            <Split text={hero.title} chars />
          </span>
          <span className="hero-sub mt-5 block font-cond text-[clamp(26px,3.2vw,54px)] uppercase leading-none tracking-[0.15em] text-white md:mt-7">
            <Split text={hero.description} />
          </span>
        </h1>

        <a data-hero-in href="#portfolio" className="hero-portfolio group absolute right-[var(--gutter)] top-0 hidden h-36 w-36 flex-col items-center justify-center gap-4 rounded-full border border-white/50 bg-navy/20 text-center backdrop-blur-sm transition-colors hover:border-teal hover:bg-teal lg:flex">
          <Arrow className="-rotate-45 transition-transform duration-700 group-hover:rotate-0 group-focus-visible:rotate-0" />
          <span className="eyebrow !tracking-[0.18em]">Explore<br />our portfolio</span>
        </a>

        <a data-hero-in href="#portfolio" className="eyebrow mt-7 inline-flex min-h-11 items-center gap-4 text-teal-mist lg:hidden">
          <span className="uline">Explore our portfolio</span><Arrow className="-rotate-45" />
        </a>

        <div className="mt-8 flex items-end justify-between gap-8 border-t border-white/20 pt-6 md:mt-16">
          <button
            data-hero-in
            onClick={() => lenis?.scrollTo("#about", { duration: 1.8 })}
            className="eyebrow group flex items-center gap-5"
          >
            <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/40 transition-colors duration-700 group-hover:border-teal">
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-teal transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100" />
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" className="relative animate-[cue_2.4s_var(--ease-expo)_infinite]">
                <path d="M5 0v15M1 11l4 4 4-4" stroke="currentColor" />
              </svg>
            </span>
            <Roll className="whitespace-nowrap">{hero.cta}</Roll>
          </button>

          <div data-hero-in className="flex items-center gap-6">
            <div className="font-cond flex items-baseline gap-2 text-sm tracking-[0.2em]">
              <span className="relative inline-block h-[1.2em] overflow-hidden">
                <span
                  className="flex flex-col transition-transform duration-[1400ms] ease-[var(--ease-expo)]"
                  style={{ transform: `translateY(-${index * 1.2}em)` }}
                >
                  {hero.slides.map((s) => (
                    <span key={s.location} className="block h-[1.2em] leading-[1.2em] text-white">
                      {s.location.split("|")[0].trim()}
                    </span>
                  ))}
                </span>
              </span>
              <span className="text-white/40">|</span>
              <span className="text-white/60">{hero.slides[hero.slides.length - 1].location.split("|")[0].trim()}</span>
              <span className="sr-only">Slide {num}</span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              {hero.slides.map((s, i) => (
                <button
                  key={s.src}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  aria-current={index === i ? "true" : undefined}
                  className="group relative h-6 w-10 md:w-16"
                >
                  <span className="absolute inset-x-0 top-1/2 h-px bg-white/25 transition-colors group-hover:bg-white/60" />
                  <span
                    data-progress={i}
                    className="absolute inset-x-0 top-1/2 h-px origin-left scale-x-0 bg-white"
                  />
                </button>
              ))}
            </div>
            <div className="hidden gap-2 md:flex">
              <button
                aria-label="Previous"
                onClick={() => goTo((index - 1 + hero.slides.length) % hero.slides.length)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-colors duration-500 hover:border-white hover:bg-white hover:text-navy"
              >
                <Arrow className="rotate-180" />
              </button>
              <button
                aria-label="Next"
                onClick={() => goTo((index + 1) % hero.slides.length)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-colors duration-500 hover:border-white hover:bg-white hover:text-navy"
              >
                <Arrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
