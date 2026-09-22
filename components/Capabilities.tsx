import { capabilities } from "@/lib/content";
import { Split } from "./ui";

export default function Capabilities() {
  return (
    <section className="relative bg-paper px-[var(--gutter)] pb-[clamp(100px,14vw,200px)]">
      <div className="mx-auto max-w-[1600px]">
        <div data-reveal="line" className="h-px w-full bg-navy/15" />

        <div className="grid gap-12 pt-14 lg:grid-cols-12 lg:pt-20">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div data-reveal="up" className="mb-8 flex items-center gap-4">
                <span className="font-cond text-sm tracking-[0.2em] text-teal">02</span>
                <span className="h-px w-12 bg-navy/25" />
              </div>
              <h2 data-reveal="words" className="display text-[clamp(44px,5.4vw,96px)] text-navy">
                <Split text={capabilities.title} />
              </h2>
            </div>
          </div>

          <ul data-reveal="stagger" className="grid border-l border-t border-navy/15 sm:grid-cols-2 lg:col-span-8">
            {capabilities.items.map((c, i) => (
              <li
                key={c.title}
                className="group relative isolate flex min-h-[300px] flex-col overflow-hidden border-b border-r border-navy/15 p-8 md:min-h-[360px] md:p-10"
              >
                {/* hover fill rises from the floor */}
                <span className="absolute inset-0 -z-10 bg-navy [clip-path:inset(100%_0_0_0)] transition-[clip-path] duration-[900ms] ease-[var(--ease-expo)] group-hover:[clip-path:inset(0_0_0_0)]" />
                <span className="absolute -bottom-24 -right-24 -z-10 h-64 w-64 rounded-full border-[18px] border-teal opacity-0 transition-all delay-100 duration-[1200ms] ease-[var(--ease-expo)] group-hover:-bottom-16 group-hover:-right-16 group-hover:opacity-100" />

                <div className="flex items-start justify-between">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.icon}
                    alt=""
                    className="h-14 w-14 object-contain transition-[filter,transform] duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-1 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
                  />
                  <span className="font-cond text-sm tracking-[0.2em] text-navy/40 transition-colors duration-700 group-hover:text-teal-mist">
                    0{i + 1}
                  </span>
                </div>

                <div className="mt-auto pt-12">
                  <h3 className="display text-[clamp(26px,2.2vw,36px)] leading-[1.05] text-navy transition-[color,transform] duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-2 group-hover:text-white">
                    {c.title}
                  </h3>
                  <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.7] text-navy/65 transition-[color,transform] delay-75 duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-2 group-hover:text-white/75">
                    {c.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
