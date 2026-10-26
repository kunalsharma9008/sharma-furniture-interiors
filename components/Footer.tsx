'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/data/siteData';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface border-t border-warm-beige">
      <div className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-16 pb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-surface-container-highest">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-on-surface tracking-tight leading-none">
                SHARMA
              </span>
              <span className="font-label-sm text-label-sm text-secondary tracking-[0.24em] uppercase font-semibold mt-1">
                Furnitures &amp; Interiors
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
              We design homes and make furniture in Pune. Our team helps you plan your space and create pieces made to fit.
            </p>

            {/* Social Icon Buttons: Instagram, Facebook, Phone, Mail */}
            <div className="pt-2 flex items-center gap-3">
              {/* Instagram */}
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-instagram-link"
                aria-label="Visit Sharma Furnitures & Interiors on Instagram"
                className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary transition-all duration-300 flex items-center justify-center shadow-sm border border-warm-beige group"
                title="Instagram Profile"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-facebook-link"
                aria-label="Visit Sharma Furnitures & Interiors on Facebook"
                className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary transition-all duration-300 flex items-center justify-center shadow-sm border border-warm-beige group"
                title="Facebook Profile"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>

              {/* Phone Direct Link */}
              <a
                href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                aria-label={`Call ${SITE_CONFIG.contact.phone}`}
                className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary transition-all duration-300 flex items-center justify-center shadow-sm border border-warm-beige"
                title="Call Us"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
              </a>

              {/* Email Direct Link */}
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                aria-label={`Email ${SITE_CONFIG.contact.email}`}
                className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary transition-all duration-300 flex items-center justify-center shadow-sm border border-warm-beige"
                title="Email Us"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-label-md text-label-md text-secondary uppercase tracking-widest font-semibold">
              Explore
            </span>
            <div className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <Link href="#home" className="hover:text-on-surface transition-colors">
                Home
              </Link>
              <Link href="#about" className="hover:text-on-surface transition-colors">
                About Us
              </Link>
              <Link href="#why-choose-us" className="hover:text-on-surface transition-colors">
                Why Choose Us
              </Link>
              <Link href="#services" className="hover:text-on-surface transition-colors">
                Our Services
              </Link>
              <Link href="#projects" className="hover:text-on-surface transition-colors">
                Our Work
              </Link>
              <Link href="#contact" className="hover:text-on-surface transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Our Services List */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-label-md text-label-md text-secondary uppercase tracking-widest font-semibold">
              Our Services
            </span>
            <div className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <Link href="#services" className="hover:text-on-surface transition-colors">
                Full Home Design
              </Link>
              <Link href="#services" className="hover:text-on-surface transition-colors">
                Kitchens
              </Link>
              <Link href="#services" className="hover:text-on-surface transition-colors">
                Custom Furniture
              </Link>
              <Link href="#services" className="hover:text-on-surface transition-colors">
                Wardrobes
              </Link>
              <Link href="#services" className="hover:text-on-surface transition-colors">
                TV Units
              </Link>
              <Link href="#services" className="hover:text-on-surface transition-colors">
                Offices and Shops
              </Link>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-label-md text-label-md text-secondary uppercase tracking-widest font-semibold">
              Contact Details
            </span>
            <div className="flex flex-col gap-2.5 font-body-sm text-body-sm text-on-surface-variant">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">location_on</span>
                <span>{SITE_CONFIG.contact.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">call</span>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                  className="hover:text-on-surface transition-colors font-medium"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">mail</span>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-on-surface transition-colors break-all"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant">
          <p>© 2025 Sharma Furnitures &amp; Interiors. Pune, Maharashtra. All rights reserved.</p>
          <div className="flex items-center gap-6 font-label-sm text-label-sm uppercase tracking-wider text-outline">
            <span>Pune</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
