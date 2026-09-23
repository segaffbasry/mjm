"use client";

import { useState } from "react";
import { newsletter } from "@/lib/content";
import { Arrow, Roll, Split } from "./ui";

const ids = ["firstname", "surname", "email"];

export default function Newsletter() {
  const [sent, setSent] = useState(false);

  return (
    <section className="relative bg-navy-2 px-[var(--gutter)] py-[clamp(100px,12vw,180px)] text-white">
      <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div data-reveal="up" className="mb-8 flex items-center gap-4">
            <span className="font-cond text-sm tracking-[0.2em] text-teal-mist">06</span>
            <span className="h-px w-12 bg-white/30" />
          </div>
          <h2 data-reveal="words" className="display text-[clamp(48px,6vw,104px)] italic">
            <Split text={newsletter.title} />
          </h2>
          <p data-reveal="up" className="mt-8 max-w-[34ch] text-[17px] leading-[1.7] text-white/70">
            {newsletter.text}
          </p>
        </div>

        <form
          data-reveal="up"
          data-delay="0.15"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="grid content-end gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-6 lg:col-start-7"
        >
          {newsletter.fields.map((f, i) => (
            <div key={f} className={`field ${i === 2 ? "sm:col-span-2" : ""}`}>
              <input
                id={ids[i]}
                name={ids[i]}
                type={i === 2 ? "email" : "text"}
                placeholder=" "
                required
                aria-required
              />
              <label htmlFor={ids[i]}>{f}</label>
            </div>
          ))}

          <div className="mt-6 flex flex-col gap-8 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <label className="group flex cursor-pointer items-center gap-4 text-[14px] text-white/70">
              <input type="checkbox" required className="peer sr-only" />
              <span className="relative flex h-5 w-5 items-center justify-center border border-white/40 transition-colors duration-500 peer-checked:border-teal peer-checked:bg-teal peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="opacity-0 transition-opacity [label:has(:checked)_&]:opacity-100">
                  <path d="M1 4l3 3 5-6" stroke="white" />
                </svg>
              </span>
              <span>
                {newsletter.consentPrefix}{" "}
                <a href="https://mjm-group.com/privacy-policy" className="uline text-white">
                  {newsletter.consentLink}
                </a>
              </span>
            </label>

            <button type="submit" className="btn text-white">
              <Roll>{newsletter.cta}</Roll>
              {sent ? (
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                  <path d="M1 5l4 4 8-8" stroke="currentColor" />
                </svg>
              ) : (
                <Arrow className="arrow" />
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
