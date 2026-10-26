'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TRUST_METRICS } from '@/data/siteData';

export default function TrustMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState<number[]>(TRUST_METRICS.map(() => 0));
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            const duration = 1600;
            const stepTime = 30;
            const totalSteps = Math.ceil(duration / stepTime);

            let currentStep = 0;
            const timer = setInterval(() => {
              currentStep++;
              const progress = Math.min(currentStep / totalSteps, 1);
              // easeOutQuad curve for smooth deceleration
              const easeProgress = progress * (2 - progress);

              setCounts(
                TRUST_METRICS.map((metric) => Math.floor(metric.target * easeProgress))
              );

              if (progress >= 1) {
                clearInterval(timer);
                setCounts(TRUST_METRICS.map((m) => m.target));
              }
            }, stepTime);
          }
        });
      },
      { threshold: 0.35 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="trust-metrics"
      ref={sectionRef}
      className="relative z-20 w-full px-margin-mobile md:px-margin-tablet lg:px-margin -mt-10"
    >
      <div className="max-w-6xl mx-auto bg-surface-container-lowest rounded-2xl shadow-xl p-6 md:p-8 border border-warm-beige/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-surface-container-highest">
          {TRUST_METRICS.map((metric, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 py-3 md:py-0 ${
                index === 0 ? 'md:px-4' : 'md:px-6'
              }`}
            >
              <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[32px]">{metric.icon}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-3xl md:text-4xl font-bold text-on-surface">
                    {counts[index].toLocaleString('en-IN')}
                  </span>
                  <span className="font-display text-3xl md:text-4xl text-primary font-bold">
                    {metric.symbol}
                  </span>
                </div>
                <span className="font-title-md text-title-md text-on-surface font-semibold">
                  {metric.title}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {metric.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
