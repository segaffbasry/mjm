"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Ctx = { ready: boolean; setReady: (v: boolean) => void; lenis: Lenis | null };
const MotionCtx = createContext<Ctx>({ ready: false, setReady: () => {}, lenis: null });
export const useMotion = () => useContext(MotionCtx);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const l = new Lenis({ duration: 1.25, easing: (t) => 1 - Math.pow(1 - t, 4) });
    l.stop();
    l.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Lenis is an external instance
    setLenis(l);

    return () => {
      gsap.ticker.remove(tick);
      l.destroy();
    };
  }, []);

  useEffect(() => {
    if (ready) lenis?.start();
  }, [ready, lenis]);

  return <MotionCtx.Provider value={{ ready, setReady, lenis }}>{children}</MotionCtx.Provider>;
}
