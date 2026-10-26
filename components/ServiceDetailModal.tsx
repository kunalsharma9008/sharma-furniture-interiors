'use client';

import React, { useEffect, useState } from 'react';
import { ServiceItem, ServicePhoto, SERVICE_PHOTOS, SITE_CONFIG } from '@/data/siteData';
import { LOCAL_SERVICE_PHOTOS } from '@/data/uploadedPhotos';
import type { UserUploadedMedia } from '@/lib/uploadStore';
import ServiceGalleryModal from './ServiceGalleryModal';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectForInquiry: (serviceTitle: string) => void;
}

export default function ServiceDetailModal({
  service,
  onClose,
  onSelectForInquiry,
}: ServiceDetailModalProps) {
  const [showGallery, setShowGallery] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UserUploadedMedia[]>([]);
  const [hiddenSources, setHiddenSources] = useState<string[]>([]);

  useEffect(() => {
    if (!service) {
      setUploadedImages([]);
      return;
    }
    let active = true;
    setUploadedImages([]);
    fetch(`/api/media?section=services&serviceId=${encodeURIComponent(service.id)}`, { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => { if (active) { setUploadedImages(data.media ?? []); setHiddenSources(data.hiddenSources ?? []); } })
      .catch(() => undefined);
    return () => { active = false; };
  }, [service?.id]);

  const staticPhotos: ServicePhoto[] = service
    ? (LOCAL_SERVICE_PHOTOS[service.id] ?? SERVICE_PHOTOS[service.id] ?? [])
    : [];
  const photos: ServicePhoto[] = [
    ...uploadedImages.filter((item) => item.serviceId === service?.id).map(({ id, src, alt, kind }) => ({ id, src, alt, kind })),
    ...staticPhotos.filter((photo) => !photo.src || !hiddenSources.includes(photo.src)),
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  const handleFormRedirect = () => {
    onSelectForInquiry(service.title);
    onClose();
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappMessage = `Hello Sharma Furnitures & Interiors Studio,\n\nI am interested in learning more about your "${service.title}" services in Pune.\n\nPlease tell me how we can get started and when we can talk.`;
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappPhoneRaw}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <>
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-warm-beige overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-surface-container-low border-b border-warm-beige">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[26px]">{service.icon}</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                About this service
              </span>
              <h3 id="service-modal-title" className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                {service.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close service details"
            className="p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Overview */}
          <div>
            <h4 className="font-title-md text-title-md text-on-surface font-semibold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">info</span>
              <span>About the service</span>
            </h4>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Inclusions Checklist */}
          <div>
            <h4 className="font-title-md text-title-md text-on-surface font-semibold mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">task_alt</span>
              <span>What is included</span>
            </h4>
            <ul className="space-y-2.5">
              {service.inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-body-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 flex-shrink-0">
                    check_circle
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Materials & Finishes */}
          <div>
            <h4 className="font-title-md text-title-md text-on-surface font-semibold mb-2.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">category</span>
              <span>Materials and fittings</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.materials.map((mat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm border border-warm-beige/80"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>

          {/* Project Parameters (Timeline & Ideal For) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-surface-container-highest">
            <div className="bg-surface-container-low p-3.5 rounded-xl border border-warm-beige/60">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold block mb-1">
                How long it takes
              </span>
              <span className="font-body-sm text-body-sm text-on-surface font-medium">
                {service.timeline}
              </span>
            </div>
            <div className="bg-surface-container-low p-3.5 rounded-xl border border-warm-beige/60">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold block mb-1">
                Good for
              </span>
              <span className="font-body-sm text-body-sm text-on-surface font-medium">
                {service.idealFor}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-surface-container-low border-t border-warm-beige flex flex-col sm:flex-row gap-3 items-stretch justify-end">
          {photos.length > 0 && (
            <button
              type="button"
              onClick={() => setShowGallery(true)}
              className="inline-flex items-center justify-center gap-2 bg-surface-container text-on-surface hover:bg-surface-container-high px-5 py-3 rounded-lg font-label-md text-label-md uppercase tracking-wider transition-colors border border-warm-beige font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">photo_library</span>
              <span>View {photos.length} Photos & Videos</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleFormRedirect}
            className="inline-flex items-center justify-center gap-2 bg-surface-container text-on-surface hover:bg-surface-container-high px-5 py-3 rounded-lg font-label-md text-label-md uppercase tracking-wider transition-colors border border-warm-beige font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            <span>Send an Inquiry</span>
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md uppercase tracking-wider transition-all shadow-md font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Inquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>

    {/* Photo Gallery Modal (layered on top) */}
    {showGallery && (
      <ServiceGalleryModal
        service={service}
        photos={photos}
        onClose={() => setShowGallery(false)}
        onSelectForInquiry={(title) => {
          setShowGallery(false);
          onSelectForInquiry(title);
          onClose();
          const contactElem = document.getElementById('contact');
          if (contactElem) contactElem.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    )}
  </>
  );
}
