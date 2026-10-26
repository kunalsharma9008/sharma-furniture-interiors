'use client';

import React, { useState } from 'react';
import VideoTourModal from './VideoTourModal';

export default function VideoTourSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="mt-16 w-full bg-on-surface text-surface rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 md:p-12 relative border border-secondary/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 text-secondary-fixed">
              <span className="material-symbols-outlined text-[18px]">videocam</span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold">
                Project Video
              </span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-surface font-normal">
              Take a Look Around
            </h3>
            <p className="font-body text-base text-surface-variant leading-relaxed">
              Watch a tour of one of our Pune projects. See the rooms, furniture, materials, and lighting.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider px-6 py-3.5 rounded-md hover:bg-primary-container transition-all shadow-lg hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                <span>Play the Video</span>
              </button>
              <a
                href="https://wa.me/919923557479?text=Hello%20Sharma%20Furnitures,%20I%20would%20like%20to%20request%20more%20project%20walkthrough%20videos%20of%20your%20work%20in%20Pune."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-surface/15 hover:bg-surface/25 text-surface font-label-md text-label-md uppercase tracking-wider px-5 py-3.5 rounded-md transition-colors border border-surface/30"
              >
                <span>Ask to See More Work</span>
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </a>
            </div>
          </div>

          {/* Video Poster / Trigger Card */}
          <div
            onClick={() => setModalOpen(true)}
            className="lg:col-span-7 relative h-72 sm:h-88 md:h-96 rounded-xl overflow-hidden cursor-pointer group shadow-2xl border border-white/20"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setModalOpen(true);
              }
            }}
            aria-label="Play the project video"
          >
            <div
              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
              role="img"
              aria-label="A view of a finished home in Pune."
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCstVZUhwvwUCkAxOay1EQjECqtYr_mBPdc2iSXkcH66eGG6p93m1-PrryOKuZLQINIU9fmi_2Dbi3S7FnosbirhgOpQARN9Gc5Rg3PExLO4Y3ehfG6wWoQesTYI3p0Xm6Seg2oUnRStm81cW7vyPXTp8S9JWEnnouGghUxr78dxYmVnHMPVLknHSOEj-J2p5irpXGHf_DAFKxlN_RVFjsG1r1Jl45JH6GpNnxMek6OfsyZlBfnuN_6Zg')",
              }}
            />
            <div className="absolute inset-0 bg-on-surface/40 flex items-center justify-center group-hover:bg-on-surface/25 transition-colors">
              <div className="w-20 h-20 rounded-full bg-surface text-primary flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[42px] ml-1">play_arrow</span>
              </div>
            </div>
            <span className="absolute bottom-4 right-4 bg-on-surface/85 text-surface text-label-sm font-label-sm px-3 py-1.5 rounded-md backdrop-blur-md border border-white/20">
              02:45 • Project Video
            </span>
          </div>
        </div>
      </div>

      <VideoTourModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
