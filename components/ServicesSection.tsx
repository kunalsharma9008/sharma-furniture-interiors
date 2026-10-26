'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SERVICES_DATA, ServiceItem } from '@/data/siteData';
import { LOCAL_SERVICE_PHOTOS, SERVICE_COVER_PHOTOS } from '@/data/uploadedPhotos';
import type { UserUploadedImage } from '@/lib/uploadStore';
import ServiceDetailModal from './ServiceDetailModal';

interface ServicesSectionProps {
  onPreselectService?: (serviceName: string) => void;
}

export default function ServicesSection({ onPreselectService }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [uploadedImages, setUploadedImages] = useState<UserUploadedImage[]>([]);
  const [hiddenSources, setHiddenSources] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/images', { cache: 'no-store', signal: controller.signal })
      .then((response) => response.json())
      .then((data) => { setUploadedImages(data.images ?? []); setHiddenSources(data.hiddenSources ?? []); })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const handleSelectForInquiry = (serviceTitle: string) => {
    if (onPreselectService) {
      onPreselectService(serviceTitle);
    }
  };

  return (
    <section id="services" className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-24 md:py-28 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
            What We Do
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[42px] text-on-surface mt-2 mb-4 font-normal">
            Services for Your Home and Business
          </h2>
          <p className="font-body text-base text-on-surface-variant leading-relaxed">
            From home design to made-to-fit furniture, our Pune team can help plan and complete your project.
          </p>
        </div>

        {/* 11 Services Grid + 1 Invitation Card with Clear Gaps & Subtle Hover Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {SERVICES_DATA.map((service) => {
            const uploadedCover = uploadedImages.find((image) => image.serviceId === service.id);
            const localCover = [SERVICE_COVER_PHOTOS[service.id], ...(LOCAL_SERVICE_PHOTOS[service.id] ?? [])].find((photo) => photo && !hiddenSources.includes(photo.src));
            const cover = uploadedCover ? { src: uploadedCover.src, alt: uploadedCover.alt } : localCover;
            return (
            <div
              key={service.id}
              className="service-card bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-warm-beige flex flex-col justify-between group cursor-pointer overflow-hidden"
              onClick={() => setSelectedService(service)}
            >
              {cover && (
                <div className="relative -mx-6 -mt-6 mb-5 h-40 overflow-hidden bg-surface-container sm:h-44">
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-surface/90 px-2.5 py-1 font-label-sm text-[10px] uppercase tracking-wider text-on-surface shadow-sm">
                    Design inspiration
                  </span>
                </div>
              )}
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[26px]">{service.icon}</span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface mb-2 font-semibold">
                  {service.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              {/* Explicit, Accessible "Learn More" Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedService(service);
                }}
                aria-label={`Explore details for ${service.title}`}
                className="w-full pt-4 mt-2 border-t border-surface-container-highest/60 flex items-center justify-between text-primary font-label-sm text-label-sm uppercase font-semibold gap-1 group-hover:text-primary-container transition-colors focus:outline-none"
              >
                <span>Learn More</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
            );
          })}

          {/* Turnkey Atelier Consultation Card */}
          <div className="service-card bg-primary text-on-primary p-6 rounded-2xl shadow-md flex flex-col justify-between border border-primary-container overflow-hidden">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[26px]">draw</span>
              </div>
              <h3 className="font-title-md text-title-md text-on-primary mb-2 font-semibold">
                Need Something Special?
              </h3>
              <p className="font-body-sm text-body-sm text-on-primary/85 leading-relaxed">
                Have an idea for your home or office? Talk to our Pune team and we will help you plan it.
              </p>
            </div>
            <Link
              href="#contact"
              className="pt-4 mt-2 border-t border-white/20 flex items-center text-secondary-fixed font-label-sm text-label-sm uppercase font-semibold gap-1 hover:text-white transition-colors"
            >
              <span>Talk to Us</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onSelectForInquiry={handleSelectForInquiry}
      />
    </section>
  );
}
