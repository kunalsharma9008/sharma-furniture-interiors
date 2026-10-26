'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustMetrics from '@/components/TrustMetrics';
import AboutSection from '@/components/AboutSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServicesSection from '@/components/ServicesSection';
import ProjectsGallery from '@/components/ProjectsGallery';
import VideoTourSection from '@/components/VideoTourSection';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ReviewsSection from '@/components/ReviewSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<string>('Complete Home Interiors');

  const handlePreselectService = (serviceName: string) => {
    setSelectedService(serviceName);
  };

  return (
    <>
      <Header />
      <main className="w-full pt-20">
        {/* 1. Homepage Hero with Video & Editorial Copy */}
        <Hero />

        {/* 2. Trust Metrics Strip with Animated Counter */}
        <TrustMetrics />

        {/* 3. About Us Section */}
        <AboutSection />

        {/* 4. Why Choose Us with 4 Core Pillars & Photo Collage */}
        <WhyChooseUs />

        {/* 5. Services Section with Working Explore Details Buttons & Detail Modal */}
        <ServicesSection onPreselectService={handlePreselectService} />

        {/* 6. Projects Section (Visual Gallery + Video Tour + Before/After Slider) */}
        <section
          id="projects"
          className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-24 md:py-28 bg-surface-container-low border-t border-warm-beige"
        >
          <div className="max-w-7xl mx-auto">
            {/* Visual Portfolio Gallery with Category Filters */}
            <ProjectsGallery />

            {/* Cinematic Video Walkthrough Tour Area */}
            <VideoTourSection />

            {/* Interactive Before & After Transformation Slider */}
            <BeforeAfterSlider />
          </div>
        </section>

        {/* 7. Customer Reviews — display verified feedback only */}
        <ReviewsSection />

        {/* 8. Contact & Inquiry Section with WhatsApp Dispatcher */}
        <ContactSection selectedService={selectedService} />
      </main>

      {/* Accessible Footer */}
      <Footer />

      {/* Fixed WhatsApp Floating Action Button */}
      <FloatingWhatsApp />
    </>
  );
}
