import Image from "next/image";
import { portfolio } from "@/lib/content";
import { Arrow, Roll, Split } from "./ui";

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-paper px-[var(--gutter)] py-[clamp(90px,10vw,160px)]">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div data-reveal="up" className="mb-8 flex items-center gap-4">
              <span className="font-cond text-sm tracking-[0.2em] text-teal">03</span>
              <span className="h-px w-12 bg-navy/25" />
              <span className="eyebrow text-navy/60">Crafted by MJM</span>
            </div>
            <h2 data-reveal="words" className="display text-[clamp(56px,7vw,120px)] italic">
              <Split text={portfolio.title} />
            </h2>
          </div>
          <p data-reveal="up" className="max-w-[45ch] text-base leading-relaxed text-navy/70 lg:col-span-4 lg:col-start-9">{portfolio.text}</p>
        </div>
        <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-8 lg:mt-20">
          {portfolio.items.map((item, i) => (
            <a key={item.title} href={item.href} className={`group block ${i === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-28"}`}>
              <div data-reveal="clip" className={`relative overflow-hidden bg-bone ${i === 0 ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
                <Image src={item.image} alt={item.alt} fill sizes={i === 0 ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 768px) 40vw, 100vw"} className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <span className="absolute bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-paper text-navy transition-colors group-hover:bg-teal group-hover:text-white"><Arrow className="-rotate-45" /></span>
              </div>
              <div className="mt-5 flex items-center justify-between gap-4 border-b border-navy/20 pb-5">
                <h3 className="display text-[clamp(30px,3vw,48px)]">{item.title}</h3>
                <span className="font-cond text-sm tracking-[0.2em] text-teal">0{i + 1}</span>
              </div>
            </a>
          ))}
        </div>
        <div data-reveal="up" className="mt-12">
          <a href={portfolio.href} className="btn text-navy"><Roll>View full portfolio</Roll><Arrow className="arrow" /></a>
        </div>
      </div>
    </section>
  );
}
