'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div className="mt-16 bg-surface-container-lowest p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl border border-warm-beige">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
          Before and After
        </span>
        <h3 className="font-display text-2xl sm:text-3xl md:text-[36px] text-on-surface mt-1 font-normal">
          See the Difference
        </h3>
        <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
          Move the line to compare the room before and after the work.
        </p>
      </div>

      {/* Draggable Comparison Container */}
      <div
        ref={containerRef}
        tabIndex={0}
        role="slider"
        aria-label="Before and After transformation image slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={handleKeyDown}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          if (e.touches[0]) handleMove(e.touches[0].clientX);
        }}
        className="relative mx-auto w-full max-w-4xl aspect-[3/2] rounded-2xl overflow-hidden select-none border border-warm-beige shadow-inner cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {/* "After" Image (Background Full) */}
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat"
          role="img"
          aria-label="A finished living room with warm wood, a sofa, and soft lights."
          style={{
            backgroundImage: "url('/images/before-after-room-20261026.png')",
            backgroundSize: '100% auto',
            backgroundPosition: 'center 90%',
          }}
        />
        <span className="absolute top-4 right-4 bg-primary text-on-primary text-label-sm font-label-sm uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-md z-10 font-semibold pointer-events-none">
          After: Finished Room
        </span>

        {/* "Before" Image (Foreground Clipped) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div
            className="absolute inset-0 w-full h-full bg-no-repeat min-w-[100%]"
            role="img"
            aria-label="A room before the work began."
            style={{
              width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
              backgroundImage: "url('/images/before-after-room-20261026.png')",
              backgroundSize: '100% auto',
              backgroundPosition: 'center 10%',
            }}
          />
          <span className="absolute top-4 left-4 bg-on-surface/85 text-surface text-label-sm font-label-sm uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-md z-10 font-semibold pointer-events-none">
            Before: Original Room
          </span>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-surface cursor-ew-resize flex items-center justify-center z-20 shadow-[0_0_12px_rgba(0,0,0,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-10 h-10 rounded-full bg-surface shadow-2xl flex items-center justify-center text-primary -ml-4.5 border-2 border-primary">
            <span className="material-symbols-outlined text-[20px]">code</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
        <span>Move left to see the finished room ◄</span>
        <span>Move right to see the original room ►</span>
      </div>
    </div>
  );
}
