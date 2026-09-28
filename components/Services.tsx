"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/content";
import { Arrow, DeadLink, Split } from "./ui";
import { useMotion } from "./SmoothScroll";

export default function Services() {
  const { ready, lenis } = useMotion();
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);

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

      const tween = gsap.to(t, {
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
      trigger.current = tween.scrollTrigger ?? null;
      return () => void (trigger.current = null);
    });
    return () => mm.revert();
  }, [ready]);

  // One card's worth of travel, in whichever direction the arrow points.
  // On desktop the cards are driven by the page scroll, so the step is
  // converted into the matching amount of vertical scrolling.
  const step = (dir: 1 | -1) => {
    const t = track.current!;
    const card = t.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(t).columnGap) || 16;
    const amount = (card?.offsetWidth ?? 300) + gap;
    const st = trigger.current;
    if (st) {
      const span = st.end - st.start;
      const travel = -(gsap.getProperty(t, "x") as number);
      const distance = Math.max(1, span - window.innerHeight * 0.5);
      const target = st.start + ((travel + dir * amount) / distance) * span;
      if (lenis) lenis.scrollTo(target, { duration: 1 });
      else window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      // Snap points fight a relative scrollBy, so move to an exact card index.
      const v = viewport.current!;
      const at = v.scrollLeft / amount;
      const index = dir > 0 ? Math.floor(at) + 1 : Math.ceil(at) - 1;
      const max = v.scrollWidth - v.clientWidth;
      v.scrollTo({ left: Math.min(max, Math.max(0, index * amount)), behavior: "smooth" });
    }
  };

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(id);
  }, [ready]);

  return (
    <section ref={root} id="services" className="relative bg-navy text-white">
      <div
        ref={stage}
        className="grain relative flex min-h-[600px] flex-col justify-center overflow-hidden py-[clamp(64px,7vw,96px)] lg:h-[100svh] lg:py-0"
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
            <div data-reveal="up" className="mt-9 flex items-center gap-6">
              <div className="hidden h-px w-[150px] bg-white/20 lg:block">
                <span data-track-progress className="block h-full origin-left scale-x-0 bg-teal" />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous service"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-colors duration-500 hover:border-white hover:bg-white hover:text-navy"
                >
                  <Arrow className="rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next service"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-colors duration-500 hover:border-white hover:bg-white hover:text-navy"
                >
                  <Arrow />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={viewport}
            className="no-bar overflow-x-auto overscroll-x-contain px-[var(--gutter)] lg:col-span-8 lg:overflow-hidden lg:pl-0 lg:pr-[var(--gutter)] lg:[mask-image:linear-gradient(to_right,transparent_0,black_48px)]"
          >
            <ul className="flex snap-x snap-mandatory gap-4 pb-2 lg:snap-none lg:pb-0" ref={track}>
              {services.items.map((s, i) => (
                <li
                  key={s.title}
                  className="w-[66vw] shrink-0 snap-start sm:w-[42vw] lg:w-[clamp(230px,23vw,320px)]"
                >
                  <DeadLink className="group block">
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
                  </DeadLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </section>
  );
}
