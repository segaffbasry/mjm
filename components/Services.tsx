"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/content";
import { Arrow, Split } from "./ui";
import { useMotion } from "./SmoothScroll";

export default function Services() {
  const { ready } = useMotion();
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  // Desktop: the section pins and the cards travel sideways with the scroll.
  // Below lg the same track is a native swipeable, snapping row.
  useEffect(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const t = track.current!;
      const v = viewport.current!;
      // clientWidth includes the right padding but scrollWidth does not, so the
      // track has to travel that much further to stop inside the page gutter.
      const distance = () => {
        const pad = parseFloat(getComputedStyle(v).paddingRight) || 0;
        return Math.max(0, t.scrollWidth - (v.clientWidth - pad));
      };
      if (distance() === 0) return;
      const bar = root.current!.querySelector<HTMLElement>("[data-track-progress]");

      gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.5}`,
          pin: stage.current,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
        },
      });
    });
    return () => mm.revert();
  }, [ready]);

  // A disc trails the pointer while it is over a card.
  useEffect(() => {
    const c = cursor.current!;
    const g = track.current!;
    if (!matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(c, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(c, "y", { duration: 0.6, ease: "power3" });
    const pos = { x: -1, y: -1 };
    let shown = false;

    // Visibility is derived from what sits under the pointer *right now*:
    // pointerleave alone misses the case where scrolling slides a card out
    // from under a still pointer, which used to strand the disc on screen.
    const sync = () => {
      const el = document.elementFromPoint(pos.x, pos.y);
      const over = !!el && g.contains(el) && !!el.closest("a");
      if (over === shown) return;
      shown = over;
      if (over) gsap.set(c, { x: pos.x, y: pos.y });
      gsap.to(
        c,
        over
          ? { scale: 1, autoAlpha: 1, duration: 0.7, ease: "expo.out", overwrite: true }
          : { scale: 0, autoAlpha: 0, duration: 0.4, ease: "expo.out", overwrite: true },
      );
    };
    const move = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      xTo(pos.x);
      yTo(pos.y);
      sync();
    };
    const out = () => {
      pos.x = pos.y = -1;
      sync();
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", sync, { passive: true });
    viewport.current!.addEventListener("scroll", sync, { passive: true });
    document.documentElement.addEventListener("pointerleave", out);
    const vp = viewport.current!;
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", sync);
      vp.removeEventListener("scroll", sync);
      document.documentElement.removeEventListener("pointerleave", out);
    };
  }, []);

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(id);
  }, [ready]);

  return (
    <section ref={root} id="services" className="relative bg-navy text-white">
      <div
        ref={stage}
        className="grain relative flex min-h-[600px] flex-col justify-center overflow-hidden py-[clamp(80px,10vw,120px)] lg:h-[100svh] lg:py-0"
      >
        <div className="relative mx-auto grid w-full max-w-[1600px] items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="px-[var(--gutter)] lg:col-span-4 lg:pr-0">
            <div data-reveal="up" className="mb-8 flex items-center gap-4">
              <span className="font-cond text-sm tracking-[0.2em] text-teal-mist">04</span>
              <span className="h-px w-12 bg-white/30" />
            </div>
            <h2 data-reveal="words" className="display text-[clamp(50px,5.4vw,96px)] italic">
              <Split text={services.title} />
            </h2>
            <p data-reveal="up" className="mt-7 max-w-[42ch] text-[15px] leading-[1.75] text-white/70">
              {services.text}
            </p>
            <div data-reveal="up" className="mt-10 hidden h-px w-[220px] bg-white/20 lg:block">
              <span data-track-progress className="block h-full origin-left scale-x-0 bg-teal" />
            </div>
          </div>

          <div
            ref={viewport}
            className="no-bar overflow-x-auto overscroll-x-contain scroll-smooth px-[var(--gutter)] lg:col-span-8 lg:overflow-hidden lg:pl-0 lg:pr-[var(--gutter)] lg:[mask-image:linear-gradient(to_right,transparent_0,black_48px)]"
          >
            <ul className="flex snap-x snap-mandatory gap-4 pb-2 lg:snap-none lg:pb-0" ref={track}>
              {services.items.map((s, i) => (
                <li
                  key={s.title}
                  className="w-[66vw] shrink-0 snap-start sm:w-[42vw] lg:w-[clamp(230px,23vw,320px)]"
                >
                  <a href={s.href} className="group block lg:cursor-none">
                    <div
                      data-reveal="clip"
                      data-delay={i * 0.1}
                      className={`relative aspect-[4/5] overflow-hidden ${s.logo ? "bg-vyv" : "bg-navy-2"}`}
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
                            sizes="(min-width:1024px) 24vw, (min-width:640px) 42vw, 66vw"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent opacity-70 transition-opacity duration-1000 group-hover:opacity-100" />
                      <span className="font-cond absolute left-4 top-4 text-sm tracking-[0.2em] text-white/80">
                        0{i + 1}
                      </span>
                      <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-teal transition-transform duration-[1100ms] ease-[var(--ease-expo)] group-hover:scale-x-100" />
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-3 border-t border-white/15 pt-4">
                      <h3 className="display text-[clamp(20px,1.6vw,26px)] leading-[1.1] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-1">
                        {s.title}
                      </h3>
                      <span className="mt-1 shrink-0 text-white/50 transition-[transform,color] duration-700 ease-[var(--ease-expo)] group-hover:translate-x-1 group-hover:text-teal-mist">
                        <Arrow className="-rotate-45" />
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        ref={cursor}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] -ml-11 -mt-11 hidden h-22 w-22 scale-0 items-center justify-center rounded-full bg-paper text-navy opacity-0 lg:flex"
      >
        <Arrow />
      </div>
    </section>
  );
}
