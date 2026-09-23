import Image from "next/image";
import { supplier } from "@/lib/content";
import { Arrow, Roll, Split } from "./ui";

export default function Supplier() {
  return (
    <section className="relative flex min-h-[88svh] items-center overflow-hidden bg-navy px-[var(--gutter)] text-white">
      <div data-parallax="10" className="absolute inset-[-12%_0]">
        <Image src={supplier.image} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-navy/35" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-navy)_0%,var(--color-navy)_4%,transparent_55%,var(--color-navy)_100%)]" />

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col items-center py-32 text-center">
        <div data-reveal="up" className="mb-10 flex items-center gap-4">
          <span className="h-px w-12 bg-white/40" />
          <span className="font-cond text-sm tracking-[0.2em] text-teal-mist">05</span>
          <span className="h-px w-12 bg-white/40" />
        </div>
        <h2 data-reveal="words" className="display max-w-[16ch] text-[clamp(46px,7vw,128px)]">
          <Split text={supplier.title} />
        </h2>
        <div data-reveal="up" data-delay="0.3" className="mt-14">
          <a href={supplier.href} className="btn text-white [--btn-fill:var(--color-paper)] [--btn-ink:var(--color-navy)]">
            <Roll>{supplier.cta}</Roll>
            <Arrow className="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
