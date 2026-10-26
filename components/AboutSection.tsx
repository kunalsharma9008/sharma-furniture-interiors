'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section id="about" className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-24 md:py-28 bg-surface">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Storytelling & Values */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-secondary">
            <span className="material-symbols-outlined text-[18px]">history_edu</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold">
              About Us
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-[42px] text-on-surface leading-tight font-normal">
            A Home That Feels Like Yours
          </h2>

          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
            We design homes and kitchens in Pune to suit your style, needs, and budget.
          </p>

          <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
            We make furniture and design homes and workspaces. We focus on useful designs, careful work, and materials that last.
          </p>

          {/* Business highlights */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="rounded-lg border border-warm-beige bg-surface-container-low p-4">
              <p className="font-display text-2xl md:text-3xl font-semibold text-primary">30+</p>
              <p className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant">Years of Experience</p>
            </div>
            <div className="rounded-lg border border-warm-beige bg-surface-container-low p-4">
              <p className="font-display text-2xl md:text-3xl font-semibold text-primary">1,500+</p>
              <p className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant">Projects Completed</p>
            </div>
          </div>

          {/* Core strengths */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-4 rounded-lg border border-warm-beige">
              <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold block mb-1">
                Well Made
              </span>
              <p className="font-body-sm text-body-sm text-on-surface">
                Careful work and useful designs made to last.
              </p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-lg border border-warm-beige">
              <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold block mb-1">
                Help from Start to Finish
              </span>
              <p className="font-body-sm text-body-sm text-on-surface">
                Our team helps you plan, choose materials, and finish your project.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 text-primary font-title-md text-title-md hover:text-primary-container transition-colors group"
            >
              <span>Talk to Our Pune Team</span>
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        {/* Right Column: Editorial Visual Showcase */}
        <div className="lg:col-span-6 relative">
          <div className="relative w-full h-[420px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-warm-beige">
            <div
              className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-700 ease-out"
              role="img"
              aria-label="A bright living room with cream sofas and a marble coffee table."
              style={{
                backgroundImage:
                  "url('/images/about-living-room-user-photo.png')",
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
