"use client";

import { footer } from "@/lib/content";
import { Logo, Roll } from "./ui";
import { useMotion } from "./SmoothScroll";

export default function Footer() {
  const { lenis } = useMotion();

  return (
    <footer id="contact" className="grain relative overflow-hidden bg-navy px-[var(--gutter)] pt-[clamp(80px,10vw,140px)] text-white">
      <div className="relative mx-auto max-w-[1600px]">
        <div data-reveal="stagger" className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow mb-6 text-teal-mist">{footer.address.label}</p>
            <address className="not-italic text-[15px] leading-[1.8] text-white/75">
              {footer.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
          <div className="lg:col-span-3">
            <p className="eyebrow mb-6 text-teal-mist">{footer.poland.label}</p>
            <address className="not-italic text-[15px] leading-[1.8] text-white/75">
              {footer.poland.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
          <div className="lg:col-span-3">
            <p className="eyebrow mb-6 text-teal-mist">{footer.contact.label}</p>
            {[footer.contact.phone, footer.contact.email].map((c) => (
              <div key={c.label} className="mb-5">
                <p className="text-[12px] text-white/45">{c.label}</p>
                <a href={c.href} className="display text-[clamp(22px,1.8vw,28px)] leading-tight">
                  <span className="uline">{c.value}</span>
                </a>
              </div>
            ))}
          </div>
          <nav className="lg:col-span-3" aria-label="Footer">
            <ul className="grid gap-3">
              {footer.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="eyebrow text-white/80 hover:text-white">
                    <Roll>{l.label}</Roll>
                  </a>
                </li>
              ))}
            </ul>
            <ul className="mt-10 flex flex-wrap gap-2">
              {footer.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="eyebrow flex h-10 items-center rounded-full border border-white/20 px-4 !text-[10px] transition-colors duration-500 hover:border-teal hover:bg-teal"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-24 flex flex-col gap-5 border-t border-white/15 py-7 text-[12px] text-white/50 md:flex-row md:items-center md:justify-between">
          <p>{footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-8">
            {footer.legal.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-white">
                <span className="uline">{l.label}</span>
              </a>
            ))}
            <button
              onClick={() => lenis?.scrollTo(0, { duration: 2.2 })}
              aria-label="Back to top"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-colors duration-500 hover:border-teal hover:bg-teal hover:text-white"
            >
              <svg width="10" height="14" viewBox="0 0 10 14" fill="none" className="transition-transform duration-700 group-hover:-translate-y-0.5">
                <path d="M5 14V1M1 5l4-4 4 4" stroke="currentColor" />
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-hidden pb-[3vw]">
          <div data-reveal="up">
            <Logo className="w-full text-white/[0.06]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
