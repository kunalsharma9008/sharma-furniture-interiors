'use client';

import React, { useEffect, useRef } from 'react';
import { SITE_CONFIG } from '@/data/siteData';

interface VideoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoTourModal({ isOpen, onClose }: VideoTourModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Project video"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-on-surface rounded-2xl overflow-hidden shadow-2xl border border-secondary/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 bg-surface-container-highest/20 text-surface border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">videocam</span>
            <span className="font-title-md text-title-md">
              Project video
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video tour"
            className="p-1 rounded-full text-surface hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>
        <div className="relative aspect-video w-full bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            controls
            playsInline
          >
            <source src={SITE_CONFIG.heroVideoUrl} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
