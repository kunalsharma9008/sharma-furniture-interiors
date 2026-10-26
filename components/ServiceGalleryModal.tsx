'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { ServiceItem, ServicePhoto, SITE_CONFIG } from '@/data/siteData';

interface ServiceGalleryModalProps {
  service: ServiceItem | null;
  photos: ServicePhoto[];
  onClose: () => void;
  onSelectForInquiry: (serviceTitle: string) => void;
}

const UNSPLASH_BASE = 'https://images.unsplash.com';
function buildUrl(photo: ServicePhoto, w = 800) {
  return photo.src ?? `${UNSPLASH_BASE}/${photo.id}?auto=format&fit=crop&w=${w}&q=85`;
}

export default function ServiceGalleryModal({ service, photos, onClose, onSelectForInquiry }: ServiceGalleryModalProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  useEffect(() => {
    if (!service) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { if (lightboxIndex !== null) setLightboxIndex(null); else onClose(); }
      if (lightboxIndex !== null && photos.length) {
        if (e.key === 'ArrowRight') setLightboxIndex((i) => (i! + 1) % photos.length);
        if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i! - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = 'unset'; window.removeEventListener('keydown', handleKey); };
  }, [service, lightboxIndex, onClose, photos.length]);

  const goNext = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setLightboxIndex((i) => (i! + 1) % photos.length); }, [photos.length]);
  const goPrev = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setLightboxIndex((i) => (i! - 1 + photos.length) % photos.length); }, [photos.length]);
  if (!service) return null;

  const whatsappMessage = `Hello Sharma Furnitures & Interiors Studio,\n\nI viewed the gallery for your "${service.title}" service and I am very interested.\n\nPlease tell me when we can talk and share the prices.`;
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappPhoneRaw}?text=${encodeURIComponent(whatsappMessage)}`;
  const handleInquiryForm = () => {
    onSelectForInquiry(service.title); onClose();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return <>
    <div role="dialog" aria-modal="true" aria-labelledby="gallery-modal-title" className="fixed inset-0 z-50 flex items-stretch justify-center overflow-y-auto bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative m-auto flex max-h-[95vh] w-full max-w-5xl flex-col rounded-2xl border border-warm-beige bg-surface shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-shrink-0 items-center justify-between border-b border-warm-beige bg-surface-container-low px-6 py-4">
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-on-primary shadow-sm"><span className="material-symbols-outlined text-[22px]">{service.icon}</span></div><div><span className="block font-label-sm text-label-sm font-bold uppercase tracking-widest text-secondary">Photo &amp; Video Gallery</span><h2 id="gallery-modal-title" className="font-headline-sm text-headline-sm font-semibold leading-tight text-on-surface">{service.title}</h2></div></div>
          <div className="flex items-center gap-2"><span className="hidden rounded-full border border-warm-beige bg-surface-container px-3 py-1 font-label-sm text-label-sm text-on-surface-variant sm:inline">{photos.length} items</span><button type="button" onClick={onClose} aria-label="Close gallery" className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"><span className="material-symbols-outlined text-[24px]">close</span></button></div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6"><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {photos.map((photo, idx) => <button key={photo.id} type="button" aria-label={`View ${photo.kind === 'video' ? 'video' : 'photo'} ${idx + 1}: ${photo.alt}`} onClick={() => setLightboxIndex(idx)} className="group relative aspect-square overflow-hidden rounded-xl border border-warm-beige/60 bg-surface-container shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/60">
            {photo.kind === 'video' ? <video src={buildUrl(photo, 400)} muted playsInline preload="metadata" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" aria-label={photo.alt} /> : <img src={buildUrl(photo, 400)} alt={photo.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />}
            {photo.kind === 'video' && <span className="absolute inset-0 flex items-center justify-center bg-black/15"><span className="material-symbols-outlined rounded-full bg-black/55 p-2 text-white">play_arrow</span></span>}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/30"><span className="material-symbols-outlined text-[28px] text-white opacity-0 drop-shadow-lg transition-opacity duration-200 group-hover:opacity-100">{photo.kind === 'video' ? 'play_circle' : 'zoom_in'}</span></div>
            <span className="absolute left-1.5 top-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white opacity-0 transition-opacity group-hover:opacity-100">{idx + 1}</span>
          </button>)}
        </div><p className="mt-5 text-center font-label-sm text-label-sm italic text-on-surface-variant/70">Open an item to view the photo or play the video.</p></div>
        <div className="flex flex-shrink-0 flex-col items-stretch justify-end gap-3 border-t border-warm-beige bg-surface-container-low px-6 py-4 sm:flex-row sm:items-center"><button type="button" onClick={handleInquiryForm} className="inline-flex items-center justify-center gap-2 rounded-lg border border-warm-beige bg-surface-container px-5 py-3 font-label-md text-label-md font-semibold uppercase tracking-wider text-on-surface transition-colors hover:bg-surface-container-high"><span className="material-symbols-outlined text-[18px]">edit_note</span><span>Fill Inquiry Form</span></button><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-label-md text-label-md font-semibold uppercase tracking-wider text-on-primary shadow-md transition-all hover:bg-primary-container"><span className="material-symbols-outlined text-[18px]">chat</span><span>Inquire on WhatsApp</span></a></div>
      </div>
    </div>

    {lightboxIndex !== null && <div role="dialog" aria-modal="true" aria-label={`Media item ${lightboxIndex + 1} of ${photos.length}`} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md" onClick={() => setLightboxIndex(null)}>
      <button type="button" onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }} aria-label="Close lightbox" className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"><span className="material-symbols-outlined text-[28px]">close</span></button>
      <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-label-sm text-label-sm text-white">{lightboxIndex + 1} / {photos.length}</div>
      <button type="button" onClick={goPrev} aria-label="Previous item" className="absolute left-3 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 sm:left-6"><span className="material-symbols-outlined text-[28px]">chevron_left</span></button>
      <div className="flex w-full max-w-4xl items-center justify-center px-16 sm:px-20" onClick={(e) => e.stopPropagation()}>
        {photos[lightboxIndex].kind === 'video' ? <video key={lightboxIndex} src={buildUrl(photos[lightboxIndex], 1400)} controls autoPlay playsInline className="max-h-[75vh] max-w-full rounded-xl shadow-2xl" aria-label={photos[lightboxIndex].alt} /> : <img key={lightboxIndex} src={buildUrl(photos[lightboxIndex], 1400)} alt={photos[lightboxIndex].alt} className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl" />}
      </div>
      <div className="absolute bottom-5 left-1/2 z-10 max-w-sm -translate-x-1/2 rounded-lg bg-black/60 px-4 py-2 text-center font-body-sm text-body-sm text-white/90">{photos[lightboxIndex].alt}</div>
      <button type="button" onClick={goNext} aria-label="Next item" className="absolute right-3 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 sm:right-6"><span className="material-symbols-outlined text-[28px]">chevron_right</span></button>
      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1.5 overflow-x-auto px-4 pb-1">{photos.map((photo, idx) => <button key={photo.id} type="button" aria-label={`Go to item ${idx + 1}`} onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }} className={`h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${idx === lightboxIndex ? 'scale-110 border-white shadow-lg' : 'border-white/30 opacity-60 hover:opacity-90'}`}>{photo.kind === 'video' ? <video src={buildUrl(photo, 120)} muted playsInline preload="metadata" className="h-full w-full object-cover" /> : <img src={buildUrl(photo, 120)} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />}</button>)}</div>
    </div>}
  </>;
}