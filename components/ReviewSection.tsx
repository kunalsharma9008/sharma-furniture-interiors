
'use client';

import { useEffect, useState } from 'react';

const reviews = [
  {
    name: 'Sample Customer 1',
    project: 'Custom Furniture',
    quote:
      'A sample testimonial about custom furniture and creating a design that fits the space.',
  },
  {
    name: 'Sample Customer 2',
    project: 'Home Interiors',
    quote:
      'A sample testimonial about planning beautiful interiors with a thoughtful, practical layout.',
  },
  {
    name: 'Sample Customer 3',
    project: 'Bedroom Furniture',
    quote:
      'A sample testimonial about furniture design, storage, and making better use of available space.',
  },
  {
    name: 'Sample Customer 4',
    project: 'Modular Kitchen',
    quote:
      'A sample testimonial about designing a kitchen around everyday needs and functionality.',
  },
  {
    name: 'Sample Customer 5',
    project: 'Complete Interiors',
    quote:
      'A sample testimonial about coordinating furniture and interior design throughout a home.',
  },
];

export default function ReviewsSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('out');

      setTimeout(() => {
        setActive((current) => (current + 1) % reviews.length);
        setDirection('in');
      }, 500);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const review = reviews[active];

  return (
    <section
      id="reviews"
      className="w-full px-5 py-20 md:py-28 bg-surface border-t border-warm-beige"
    >
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
          Customer Reviews
        </p>

        <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl text-on-surface">
          What Our Clients Say
        </h2>

        <p className="mt-4 text-sm md:text-base text-on-surface-variant">
          Furniture and home designs made for everyday life.
        </p>

        <div className="mt-10 md:mt-14 mx-auto max-w-3xl">
          <div
            aria-live="polite"
            className="relative min-h-[290px] md:min-h-[320px] overflow-hidden rounded-2xl border-2 border-on-surface bg-surface-container-lowest px-6 py-10 md:px-12 md:py-12 flex flex-col items-center justify-center"
          >
            <div
              key={active}
              className={`w-full transition-all duration-500 ease-in-out ${
                direction === 'in'
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-12 opacity-0'
              }`}
            >
              <div className="text-[#B68B43] text-2xl tracking-[0.25em]">
                ★★★★★
              </div>

              <p className="mt-6 font-display text-xl md:text-2xl leading-relaxed text-on-surface">
                “{review.quote}”
              </p>

              <div className="mt-7">
                <p className="font-semibold text-on-surface">
                  {review.name}
                </p>

                <p className="mt-1 text-sm text-on-surface-variant">
                  {review.project}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-on-surface-variant">
            These are example reviews. Replace them with real customer reviews before publishing.
          </p>
        </div>
      </div>
    </section>
  );
}
