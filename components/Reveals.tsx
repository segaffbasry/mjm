"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotion } from "./SmoothScroll";

/**
 * Declarative scroll reveals:
 *  data-reveal="words"  masked words rise in
 *  data-reveal="up"     fade + lift
 *  data-reveal="clip"   image unmasks bottom→top while settling from zoom
 *  data-reveal="line"   hairline draws left→right
 *  data-reveal="stagger" direct children fade + lift in sequence
 *  data-parallax="n"    element drifts n% against the scroll
 */
export default function Reveals() {
  const { ready } = useMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-reveal='words'] [data-w]", { yPercent: 110 });
      gsap.set("[data-reveal='up']", { autoAlpha: 0, y: 50 });
      gsap.set("[data-reveal='clip']", { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set("[data-reveal='clip'] img", { scale: 1.35 });
      gsap.set("[data-reveal='line']", { scaleX: 0, transformOrigin: "left center" });
      gsap.set("[data-reveal='stagger'] > *", { autoAlpha: 0, y: 40 });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const trig = (el: Element) => ({ trigger: el, start: "top 88%", toggleActions: "play none none none" });

      gsap.utils.toArray<HTMLElement>("[data-reveal='words']").forEach((el) => {
        gsap.to(el.querySelectorAll("[data-w]"), {
          yPercent: 0,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.06,
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: trig(el),
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal='up']").forEach((el) => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 1.4,
          ease: "expo.out",
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: trig(el),
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal='clip']").forEach((el) => {
        const tl = gsap.timeline({ scrollTrigger: trig(el), delay: Number(el.dataset.delay ?? 0) });
        tl.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" }).to(
          el.querySelectorAll("img"),
          { scale: 1, duration: 2.2, ease: "expo.out" },
          "<0.25",
        );
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal='line']").forEach((el) => {
        gsap.to(el, { scaleX: 1, duration: 1.8, ease: "expo.inOut", scrollTrigger: trig(el) });
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal='stagger']").forEach((el) => {
        gsap.to(el.children, {
          autoAlpha: 1,
          y: 0,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: trig(el),
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amt = Number(el.dataset.parallax || 12);
        gsap.fromTo(
          el,
          { yPercent: -amt },
          {
            yPercent: amt,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [ready]);

  return null;
}
