'use client';

import React, { useEffect } from 'react';
import { ProjectItem } from '@/data/siteData';

interface ProjectLightboxModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectLightboxModal({ project, onClose }: ProjectLightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl border border-warm-beige flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 bg-surface-container-low border-b border-warm-beige">
          <div className="flex items-center gap-2">
            <span className="bg-primary text-on-primary text-label-sm font-label-sm uppercase px-2.5 py-1 rounded">
              {project.categoryLabel}
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project view"
            className="p-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* High resolution image view */}
        <div className="relative w-full max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageUrl}
            alt={project.altText}
            className="w-full h-full object-contain max-h-[65vh]"
          />
        </div>

        <div className="p-5 bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-warm-beige">
          <div>
            <p className="font-body-md text-body-md text-on-surface font-medium">
              {project.description}
            </p>
            <div className="flex items-center gap-3 text-on-surface-variant font-label-sm text-label-sm mt-1">
              <span>{project.location}</span>
              <span>•</span>
              <span className="text-primary font-semibold">{project.badge}</span>
            </div>
          </div>
          <a
            href={`https://wa.me/919923557479?text=${encodeURIComponent(
              `Hello Sharma Furnitures, I saw your "${project.title}" project and would like to discuss something similar.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-sm text-label-sm uppercase tracking-wider font-semibold hover:bg-primary-container transition-colors shadow-sm flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>Ask About This Project</span>
          </a>
        </div>
      </div>
    </div>
  );
}
