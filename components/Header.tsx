'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/data/siteData';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'projects', 'reviews', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const updateFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (sectionIds.includes(hash)) setActiveSection(hash);
    };

    updateFromHash();
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener('hashchange', updateFromHash);
    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', updateFromHash);
    };
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-warm-beige/60 shadow-[0_1px_8px_rgba(35,32,29,0.03)]">
      {/* Main Navigation Bar */}
      <div className="h-20 w-full px-margin-mobile md:px-margin-tablet lg:px-margin max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="#home"
          className="flex items-center gap-4 group shrink-0"
          aria-label="Sharma Furnitures & Interiors Home"
        >
          <img
            src="/sharma-logo.png"
            alt="Sharma Furnitures & Interiors logo"
            className="h-14 md:h-16 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="font-display text-2xl md:text-[26px] font-bold text-on-surface tracking-tight leading-none group-hover:text-primary transition-colors">
              SHARMA
            </span>
            <span className="font-label-sm text-[10px] md:text-label-sm text-secondary tracking-[0.16em] uppercase font-semibold mt-1 whitespace-nowrap">
              Furnitures &amp; Interiors
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          <Link
            href="#home"
            onClick={() => setActiveSection('home')}
            className={`font-title-md text-title-md transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:origin-left after:transition-transform duration-300 ${activeSection === 'home' ? 'text-on-surface after:scale-x-100' : 'text-on-surface-variant after:scale-x-0'} hover:text-primary`}
          >
            Home
          </Link>
          <Link
            href="#about"
            onClick={() => setActiveSection('about')}
            className={`font-title-md text-title-md transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:origin-left after:transition-transform duration-300 ${activeSection === 'about' ? 'text-on-surface after:scale-x-100' : 'text-on-surface-variant after:scale-x-0'} hover:text-primary`}
          >
            About
          </Link>
          <Link
            href="#services"
            onClick={() => setActiveSection('services')}
            className={`font-title-md text-title-md transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:origin-left after:transition-transform duration-300 ${activeSection === 'services' ? 'text-on-surface after:scale-x-100' : 'text-on-surface-variant after:scale-x-0'} hover:text-primary`}
          >
            Services
          </Link>
          <Link
            href="#projects"
            onClick={() => setActiveSection('projects')}
            className={`font-title-md text-title-md transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:origin-left after:transition-transform duration-300 ${activeSection === 'projects' ? 'text-on-surface after:scale-x-100' : 'text-on-surface-variant after:scale-x-0'} hover:text-primary`}
          >
            Our Projects
          </Link>
          <Link
            href="#reviews"
            onClick={() => setActiveSection('reviews')}
            className={`font-title-md text-title-md transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:origin-left after:transition-transform duration-300 ${activeSection === 'reviews' ? 'text-on-surface after:scale-x-100' : 'text-on-surface-variant after:scale-x-0'} hover:text-primary`}
          >
            Reviews
          </Link>
          <Link
            href="#contact"
            onClick={() => setActiveSection('contact')}
            className={`font-title-md text-title-md transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:origin-left after:transition-transform duration-300 ${activeSection === 'contact' ? 'text-on-surface after:scale-x-100' : 'text-on-surface-variant after:scale-x-0'} hover:text-primary`}
          >
            Contact
          </Link>
        </nav>

        {/* Desktop CTA & Mobile Hamburger Button */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider px-6 py-3 rounded-md hover:bg-primary-container transition-all shadow-[0_2px_12px_-2px_rgba(35,32,29,0.08)]"
          >
            <span>Contact Us</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label="Toggle mobile menu"
            className="lg:hidden p-2.5 rounded-lg text-on-surface hover:bg-surface-container transition-colors focus:ring-2 focus:ring-primary"
          >
            {mobileMenuOpen ? (
              <span className="material-symbols-outlined text-[28px] block">close</span>
            ) : (
              <span className="material-symbols-outlined text-[28px] block">menu</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="lg:hidden w-full bg-surface/98 backdrop-blur-2xl border-b border-warm-beige shadow-xl transition-all duration-300"
        >
          <nav className="flex flex-col px-margin-mobile py-6 gap-2 text-base font-title-md" aria-label="Mobile Navigation">
            <Link
              href="#home"
              onClick={() => { setActiveSection('home'); closeMobileMenu(); }}
              className="px-4 py-3 rounded-lg text-on-surface hover:bg-surface-container font-semibold flex items-center justify-between"
            >
              <span>Home</span>
              <span className="material-symbols-outlined text-[18px] text-secondary">chevron_right</span>
            </Link>
            <Link
              href="#about"
              onClick={() => { setActiveSection('about'); closeMobileMenu(); }}
              className="px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container flex items-center justify-between"
            >
              <span>About</span>
              <span className="material-symbols-outlined text-[18px] text-secondary">chevron_right</span>
            </Link>
            <Link
              href="#services"
              onClick={() => { setActiveSection('services'); closeMobileMenu(); }}
              className="px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container flex items-center justify-between"
            >
              <span>Services</span>
              <span className="material-symbols-outlined text-[18px] text-secondary">chevron_right</span>
            </Link>
            <Link
              href="#projects"
              onClick={() => { setActiveSection('projects'); closeMobileMenu(); }}
              className="px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container flex items-center justify-between"
            >
              <span>Our Projects</span>
              <span className="material-symbols-outlined text-[18px] text-secondary">chevron_right</span>
            </Link>
            <Link
              href="#reviews"
              onClick={() => { setActiveSection('reviews'); closeMobileMenu(); }}
              className="px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container flex items-center justify-between"
            >
              <span>Reviews</span>
              <span className="material-symbols-outlined text-[18px] text-secondary">chevron_right</span>
            </Link>
            <Link
              href="#contact"
              onClick={() => { setActiveSection('contact'); closeMobileMenu(); }}
              className="px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container flex items-center justify-between"
            >
              <span>Contact</span>
              <span className="material-symbols-outlined text-[18px] text-secondary">chevron_right</span>
            </Link>

            <div className="mt-4 pt-4 border-t border-surface-container-highest flex flex-col gap-3">
              <Link
                href="#contact"
                onClick={closeMobileMenu}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider py-3.5 rounded-md"
              >
                <span>Contact Us</span>
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </Link>
              <a
                href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider py-3.5 rounded-md"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                <span>Call {SITE_CONFIG.contact.phone}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
