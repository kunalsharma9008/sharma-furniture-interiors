'use client';

import React from 'react';
import { WHY_CHOOSE_US_PILLARS } from '@/data/siteData';

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-24 md:py-28 bg-surface-container-low border-y border-warm-beige"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Why Choose Us Text & 4 Core Pillars */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold block mb-2">
              Our Difference
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[42px] text-on-surface leading-tight font-normal">
              Why Choose Us
            </h2>
            <p className="font-body text-base text-on-surface-variant mt-3 leading-relaxed">
              We listen to what you need, plan your space, make furniture that fits, and guide the work from start to finish.
            </p>
          </div>

          <div className="space-y-4">
            {WHY_CHOOSE_US_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="flex gap-4 p-4 bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow border border-warm-beige/60"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center flex-shrink-0 font-bold font-display text-lg">
                  {pillar.number}
                </div>
                <div>
                  <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                    {pillar.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sophisticated Interior-Photo Collage */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            {/* Collage Image 1: Teak Joinery Detail */}
            <div className="h-60 sm:h-64 rounded-2xl overflow-hidden shadow-lg border border-warm-beige group">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500 ease-out"
                role="img"
                aria-label="A warm living room with a wall-mounted television and built-in TV unit."
                style={{
                  backgroundImage:
                    "url('/images/why-choose-tv-unit-20261026.png')",
                }}
              />
            </div>
            {/* Collage Image 2: Travertine Waterfall Kitchen Island */}
            <div className="h-72 sm:h-80 rounded-2xl overflow-hidden shadow-lg border border-warm-beige group">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500 ease-out"
                role="img"
                aria-label="A modern kitchen with warm lights, marble counters, and taupe cabinets."
                style={{
                  backgroundImage:
                    "url('/images/why-choose-kitchen-20261026.png')",
                }}
              />
            </div>
          </div>

          <div className="pt-8">
            {/* Collage Image 3: Curved Boucle Living Suite */}
            <div className="h-[430px] sm:h-[490px] rounded-2xl overflow-hidden shadow-xl border border-warm-beige group">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500 ease-out"
                role="img"
                aria-label="A bright bedroom wardrobe with a dressing mirror and shelves."
                style={{
                  backgroundImage:
                    "url('/images/why-choose-wardrobe-20261026.png')",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
