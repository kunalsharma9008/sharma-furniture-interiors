'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { PROJECTS_DATA, ProjectItem } from '@/data/siteData';
import { PROJECT_COVER_PHOTOS } from '@/data/uploadedPhotos';
import type { UserUploadedMedia } from '@/lib/uploadStore';
import ProjectLightboxModal from './ProjectLightboxModal';

type FilterCategory = 'all' | 'living' | 'kitchens' | 'bedrooms' | 'bespoke' | 'commercial';
const CATEGORY_LABELS: Record<Exclude<FilterCategory, 'all'>, string> = {
  living: 'Living Rooms', kitchens: 'Kitchens', bedrooms: 'Bedrooms', bespoke: 'Custom Furniture', commercial: 'Offices and Shops',
};

export default function ProjectsGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [lightboxProject, setLightboxProject] = useState<ProjectItem | null>(null);
  const [uploadedMedia, setUploadedMedia] = useState<UserUploadedMedia[]>([]);
  const [hiddenSources, setHiddenSources] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/media?section=portfolio', { cache: 'no-store', signal: controller.signal })
      .then((response) => response.json())
      .then((data) => { setUploadedMedia(data.media ?? []); setHiddenSources(data.hiddenSources ?? []); })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const galleryEntries = useMemo(() => [
    ...PROJECTS_DATA.flatMap((project) => {
      const src = PROJECT_COVER_PHOTOS[project.id] ?? project.imageUrl;
      if (hiddenSources.includes(src)) return [];
      return [{
        id: project.id, title: project.title, category: project.category, categoryLabel: project.categoryLabel,
        location: project.location, badge: project.badge, description: project.description, altText: project.altText,
        kind: 'image' as const, src, project,
      }];
    }),
    ...uploadedMedia.map((item) => {
      const category = item.category as Exclude<FilterCategory, 'all'>;
      const uploadedProject: ProjectItem = {
        id: item.id, title: item.alt || `${CATEGORY_LABELS[category] ?? 'Portfolio'} project`, category,
        categoryLabel: CATEGORY_LABELS[category] ?? 'Portfolio', location: 'Pune, Maharashtra',
        badge: item.kind === 'video' ? 'PROJECT VIDEO' : 'RECENT WORK', description: item.alt,
        imageUrl: item.src, altText: item.alt,
      };
      return { id: item.id, title: uploadedProject.title, category, categoryLabel: uploadedProject.categoryLabel,
        location: uploadedProject.location, badge: uploadedProject.badge, description: item.alt,
        altText: item.alt, kind: item.kind, src: item.src, project: uploadedProject };
    }),
  ], [uploadedMedia, hiddenSources]);

  const filteredEntries = activeFilter === 'all' ? galleryEntries : galleryEntries.filter((item) => item.category === activeFilter);
  const filters: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: `All (${galleryEntries.length})` },
    ...Object.entries(CATEGORY_LABELS).map(([id, label]) => ({ id: id as FilterCategory, label: `${label} (${galleryEntries.filter((item) => item.category === id).length})` })),
  ];

  return <div className="w-full">
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><span className="font-label-sm text-label-sm font-semibold uppercase tracking-widest text-secondary">Our Work</span><h2 className="mt-1 font-display text-3xl font-normal text-on-surface sm:text-4xl md:text-[42px]">Our Projects</h2></div></div>
    <div className="mb-10 flex flex-wrap items-center gap-2" role="tablist" aria-label="Portfolio Categories">{filters.map((tab) => { const isActive = activeFilter === tab.id; return <button key={tab.id} type="button" role="tab" aria-selected={isActive} onClick={() => setActiveFilter(tab.id)} className={`cursor-pointer rounded-full px-5 py-2.5 font-label-sm text-label-sm uppercase tracking-wider transition-all ${isActive ? 'bg-primary text-on-primary shadow-sm' : 'border border-warm-beige/60 bg-surface-container text-on-surface hover:bg-surface-container-high'}`}>{tab.label}</button>; })}</div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3" id="projects-grid">
      {filteredEntries.map((entry) => <article key={entry.id} className="project-item group flex flex-col justify-between overflow-hidden rounded-2xl border border-warm-beige bg-surface-container-lowest shadow-sm transition-all duration-300 hover:shadow-xl">
        <div><div className="relative h-72 overflow-hidden bg-surface-container">
          {entry.kind === 'video' ? <video src={entry.src} controls playsInline preload="metadata" aria-label={entry.altText} className="h-full w-full object-cover" /> : <button type="button" aria-label={`Open photo: ${entry.title}`} onClick={() => setLightboxProject(entry.project)} className="h-full w-full"><span role="img" aria-label={entry.altText} className="block h-full w-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105" style={{ backgroundImage: `url('${entry.src}')` }} /></button>}
          <span className="absolute left-4 top-4 rounded-md bg-on-surface/85 px-3 py-1 font-label-sm text-label-sm uppercase tracking-wider text-surface backdrop-blur-md">{entry.categoryLabel}</span>
          {entry.kind === 'video' && <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white">VIDEO</span>}
        </div><div className="p-6"><h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface transition-colors group-hover:text-primary">{entry.title}</h3><p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{entry.description}</p></div></div>
        <div className="flex items-center justify-between border-t border-surface-container-highest px-6 pb-6 pt-3 font-label-sm text-label-sm text-on-surface-variant"><span>{entry.location}</span><span className="font-semibold text-primary">{entry.badge}</span></div>
      </article>)}
    </div>
    <ProjectLightboxModal project={lightboxProject} onClose={() => setLightboxProject(null)} />
  </div>;
}