'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/data/siteData';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full -mt-28 min-h-[95vh] md:min-h-screen flex items-center overflow-hidden bg-on-surface text-surface"
    >
      {/* Video Background */}
      <video
        id="hero-video"
        className="hero-video absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        poster={SITE_CONFIG.heroPosterUrl}
      >
        <source src={SITE_CONFIG.heroVideoUrl} type="video/mp4" />
      </video>

      {/* Still-image fallback (used for reduced-motion or video loading delay) */}
      <div
        id="hero-fallback-img"
        className="hero-fallback-img absolute inset-0 w-full h-full bg-cover bg-center hidden z-0 opacity-55"
        style={{ backgroundImage: `url('${SITE_CONFIG.heroPosterUrl}')` }}
      />

      {/* Luxury Ambient Gradient Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-on-surface/95 via-on-surface/75 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-on-surface/90 via-transparent to-on-surface/30 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />

      {/* Hero Editorial Content Container */}
      <div className="relative z-10 w-full px-margin-mobile md:px-margin-tablet lg:px-margin max-w-7xl mx-auto pt-36 pb-28 md:py-36 flex items-center">
        {/* Left Text Group */}
        <div className="w-full lg:w-[46%] xl:w-[45%] flex flex-col items-start text-left">
          {/* Architectural Studio Badge */}
          <div className="inline-flex items-center gap-2 bg-surface-container-high/25 backdrop-blur-md px-4 py-1.5 rounded-full mb-space-lg text-secondary-fixed border border-secondary-fixed/20">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
            <span className="font-label-sm text-[11px] md:text-label-sm uppercase tracking-widest font-medium">
              Bespoke Furniture &amp; Interior Architecture • Pune
            </span>
          </div>

          {/* Exact Headline Requested */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[62px] text-surface tracking-tight mb-space-md font-normal leading-tight md:leading-[1.12]">
            Your Vision. Our Craftsmanship.
          </h1>

          {/* Inviting Sub-Headline */}
          <p className="font-body text-base sm:text-lg md:text-xl text-surface-variant mb-space-xl font-light leading-relaxed max-w-xl">
            Crafting bespoke residential &amp; luxury commercial interiors tailored to Pune&apos;s finest lifestyles. From custom teak woodwork to seamless turnkey execution.
          </p>

          {/* Primary Action Triggers */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider px-8 py-4 rounded-md hover:bg-primary-container transition-all shadow-xl hover:-translate-y-0.5"
            >
              <span>Explore Projects</span>
              <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-surface/15 hover:bg-surface/25 text-surface backdrop-blur-md font-label-md text-label-md uppercase tracking-wider px-8 py-4 rounded-md transition-all border border-surface/30 hover:-translate-y-0.5"
            >
              <span>Start an Inquiry</span>
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
