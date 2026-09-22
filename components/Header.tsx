"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { nav } from "@/lib/content";
import { Logo, Roll } from "./ui";
import { useMotion } from "./SmoothScroll";

export default function Header() {
  const { ready, lenis } = useMotion();
  const ref = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ready) return;
    gsap.fromTo(
      ref.current!.querySelectorAll("[data-h]"),
      { yPercent: -120, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 1.4, ease: "expo.out", stagger: 0.06, delay: 0.5 },
    );
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        setSolid(y > window.innerHeight * 0.85);
        setHidden(self.direction === 1 && y > window.innerHeight * 0.5);
      },
    });
    return () => st.kill();
  }, [ready]);

  useEffect(() => {
    const m = menuRef.current!;
    if (open) {
      lenis?.stop();
      gsap
        .timeline()
        .set(m, { visibility: "visible" })
        .fromTo(m, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "expo.inOut" })
        .fromTo(
          m.querySelectorAll("[data-w]"),
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.05 },
          "-=0.45",
        );
    } else {
      lenis?.start();
      gsap.to(m, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.9,
        ease: "expo.inOut",
        onComplete: () => void gsap.set(m, { visibility: "hidden" }),
      });
    }
  }, [open, lenis]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    lenis?.scrollTo(href, { duration: 1.8, offset: 0 });
  };

  const dark = solid && !open;

  return (
    <>
      <header
        ref={ref}
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,backdrop-filter] duration-700 ease-[var(--ease-expo)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${dark ? "bg-paper/85 text-navy backdrop-blur-xl" : "bg-transparent text-white"}`}
      >
        <div
          className={`relative mx-auto flex items-center justify-between px-[var(--gutter)] transition-[height] duration-700 ${
            solid ? "h-[76px]" : "h-[104px]"
          }`}
        >
          <nav className="hidden flex-1 items-center gap-9 lg:flex" aria-label="Primary">
            {nav.slice(0, 3).map((n) => (
              <a key={n.label} data-h href={n.href} onClick={(e) => go(e, n.href)} className="eyebrow">
                <Roll>{n.label}</Roll>
              </a>
            ))}
          </nav>

          <a href="#top" data-h onClick={(e) => go(e, "#top")} className="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <Logo className={`transition-[width] duration-700 ${solid ? "w-[74px]" : "w-[96px]"}`} />
          </a>

          <nav className="hidden flex-1 items-center justify-end gap-9 lg:flex" aria-label="Secondary">
            {nav.slice(3).map((n) => (
              <a key={n.label} data-h href={n.href} onClick={(e) => go(e, n.href)} className="eyebrow">
                <Roll>{n.label}</Roll>
              </a>
            ))}
          </nav>

          <button
            data-h
            onClick={() => setOpen((o) => !o)}
            className="-mr-3 flex h-12 w-12 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-label="Menu"
          >
            <span className="relative block h-[9px] w-7">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-700 ${
                  open ? "translate-y-[4px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-700 ${
                  open ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
        <div
          className={`absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-1000 ${
            dark ? "scale-x-100 bg-navy/10" : "scale-x-0 bg-white/20"
          }`}
        />
      </header>

      <div
        ref={menuRef}
        className="grain invisible fixed inset-0 z-40 flex flex-col justify-end overflow-hidden bg-navy px-[var(--gutter)] pb-14 text-white"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <nav className="flex flex-col gap-2">
          {nav.map((n, i) => (
            <a
              key={n.label}
              href={n.href}
              onClick={(e) => go(e, n.href)}
              className="group flex items-baseline gap-5 border-b border-white/10 py-3"
            >
              <span className="font-cond text-sm text-teal-mist">0{i + 1}</span>
              <span className="mask">
                <span data-w className="display text-[13vw] leading-none sm:text-7xl">
                  {n.label}
                </span>
              </span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
