
'use client';

import React, { useState, useEffect } from 'react';
import { SERVICES_DATA, SITE_CONFIG } from '@/data/siteData';

interface ContactSectionProps {
  selectedService?: string;
}

export default function ContactSection({
  selectedService,
}: ContactSectionProps) {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [projectType, setProjectType] = useState(SERVICES_DATA[1]?.title ?? 'Home Design');
  const [projectNotes, setProjectNotes] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [submissionError, setSubmissionError] = useState('');

  useEffect(() => {
    if (selectedService) {
      const options = [...SERVICES_DATA.map((service) => service.title), 'Other project'];

      const match = options.find(
        (opt) =>
          opt.toLowerCase().includes(selectedService.toLowerCase()) ||
          selectedService.toLowerCase().includes(opt.toLowerCase())
      );

      setProjectType(match || selectedService);
    }
  }, [selectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim() || !clientPhone.trim()) {
      alert('Please fill in your name and phone number to continue.');
      return;
    }

    setSubmissionError('');
    setSubmissionStatus('saving');
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clientName.trim(),
          phone: clientPhone.trim(),
          service: projectType,
          projectDetails: projectNotes.trim(),
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        throw new Error(typeof result?.error === 'string' ? result.error : 'Your enquiry could not be sent. Please try again.');
      }
      setClientName('');
      setClientPhone('');
      setProjectType(SERVICES_DATA[1]?.title ?? 'Home Design');
      setProjectNotes('');
      setSubmissionStatus('saved');
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : 'Your enquiry could not be sent. Please try again.');
      setSubmissionStatus('error');
    }
  };

  const handleWhatsApp = () => {
    if (!clientName.trim() || !clientPhone.trim()) {
      alert('Please fill in your name and phone number first.');
      return;
    }

    const message = [
      'Hello Sharma Furnitures & Interiors,',
      '',
      'I would like to discuss a home or furniture project in Pune.',
      '',
      '*Name:* ' + clientName.trim(),
      '*Phone / WhatsApp:* ' + clientPhone.trim(),
      '*Project Type:* ' + projectType,
      '*Project Details:* ' + (projectNotes.trim() || 'Please contact me about my project.'),
      '',
      'Please contact me regarding my project.'
    ].join('\n');

    const whatsappUrl = 'https://wa.me/' + SITE_CONFIG.contact.whatsappPhoneRaw + '?text=' + encodeURIComponent(message);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="contact"
      className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-24 md:py-28 bg-surface"
    >
      <div className="max-w-6xl mx-auto bg-surface-container-lowest rounded-3xl shadow-xl overflow-hidden border border-warm-beige">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Business Details */}
          <div className="lg:col-span-5 bg-on-surface text-surface p-8 md:p-12 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed font-semibold">
                  Get in Touch
                </span>

                <h3 className="font-display text-3xl md:text-4xl text-surface mt-1 font-normal">
                  Contact Us
                </h3>

                <p className="font-body-sm text-body-sm text-surface-variant mt-2 leading-relaxed">
                  Tell us about your home, office, or furniture project.
                  
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-5 pt-2 text-surface-variant">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px] mt-0.5">
                    location_on
                  </span>
                  <div>
                    <span className="font-title-md text-title-md text-surface block font-semibold">
                      Location
                    </span>
                    <span className="font-body-sm text-body-sm">
                      {SITE_CONFIG.contact.location}
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px] mt-0.5">
                    call
                  </span>
                  <div>
                    <span className="font-title-md text-title-md text-surface block font-semibold">
                      Phone and WhatsApp
                    </span>
                    <a
                      href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                      className="font-body-sm text-body-sm text-surface hover:text-primary transition-colors block"
                    >
                      {SITE_CONFIG.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px] mt-0.5">
                    mail
                  </span>
                  <div>
                    <span className="font-title-md text-title-md text-surface block font-semibold">
                      Email
                    </span>
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="font-body-sm text-body-sm text-surface hover:text-primary transition-colors block break-all"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* How It Works — no physical studio implied */}
              <div className="pt-6 mt-1 border-t border-surface-variant/20">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed font-semibold">
                  How It Works
                </span>

                <div className="mt-5 space-y-5">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[24px] mt-0.5">
                      chat
                    </span>
                    <div>
                      <span className="font-title-md text-title-md text-surface block font-semibold">
                        01 — Discuss Your Ideas
                      </span>
                      <p className="font-body-sm text-body-sm text-surface-variant mt-1 leading-relaxed">
                        Tell us what you have in mind over WhatsApp or phone.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[24px] mt-0.5">
                      architecture
                    </span>
                    <div>
                      <span className="font-title-md text-title-md text-surface block font-semibold">
                        02 — Plan Your Space
                      </span>
                      <p className="font-body-sm text-body-sm text-surface-variant mt-1 leading-relaxed">
                        Discuss layouts, materials, furniture, and design options.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[24px] mt-0.5">
                      chair
                    </span>
                    <div>
                      <span className="font-title-md text-title-md text-surface block font-semibold">
                        03 — Bring It to Life
                      </span>
                      <p className="font-body-sm text-body-sm text-surface-variant mt-1 leading-relaxed">
                        Move forward with a plan tailored to your project.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <div className="pt-8 mt-6 border-t border-surface-variant/20">
              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsappPhoneRaw}?text=${encodeURIComponent(
                  'Hello Sharma Furnitures, I would like to discuss an interior or furniture project in Pune.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-label-md text-label-md uppercase tracking-wider py-3.5 px-4 rounded-lg transition-colors font-semibold shadow-md"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chat
                </span>
                <span>Chat with Us on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between bg-surface-container-lowest">
            <div>
              <div className="mb-6">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
                  Tell Us About Your Project
                </span>

                <h3 className="font-headline-lg text-headline-lg text-on-surface mt-1 font-normal">
                  Send Us a Message
                </h3>

                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Fill in the form to send your enquiry to our team. You can also message us on WhatsApp.
                  
                </p>
              </div>

              {submissionStatus !== 'idle' && (
                <div
                  className={'mb-4 p-3 rounded-lg text-body-sm flex items-center gap-2 ' + (submissionStatus === 'error' ? 'bg-red-50 text-red-800' : 'bg-primary-fixed text-on-primary-fixed')}
                  role="status"
                  aria-live="polite"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {submissionStatus === 'error' ? 'error' : submissionStatus === 'saved' ? 'check_circle' : 'schedule'}
                  </span>
                  <span>
                    {submissionStatus === 'saving' && 'Sending your enquiry to the Sheet...'}
                    {submissionStatus === 'saved' && 'Your enquiry has been sent. Thank you.'}
                    {submissionStatus === 'error' && submissionError}
                  </span>
                </div>
              )}

              <form
                id="inquiry-form"
                className="space-y-4"
                onSubmit={handleSubmit}
              >
                {/* Client Name */}
                <div>
                  <label
                    htmlFor="client-name"
                    className="block font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-semibold mb-1"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="client-name"
                    name="clientName"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                    placeholder="e.g. Anand & Radhika Joshi"
                    className="w-full bg-surface-container-low text-on-surface px-4 py-3 rounded-lg text-body-md border border-warm-beige focus:border-primary focus:bg-white transition-colors placeholder:text-outline/70"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="client-phone"
                    className="block font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-semibold mb-1"
                  >
                    Phone Number{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="client-phone"
                    name="clientPhone"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    required
                    placeholder="e.g. 99235 57479"
                    className="w-full bg-surface-container-low text-on-surface px-4 py-3 rounded-lg text-body-md border border-warm-beige focus:border-primary focus:bg-white transition-colors placeholder:text-outline/70"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label
                    htmlFor="project-type"
                    className="block font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-semibold mb-1"
                  >
                    What do You Need? <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="project-type"
                    name="projectType"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    required
                    className="w-full bg-surface-container-low text-on-surface px-4 py-3 rounded-lg text-body-md border border-warm-beige focus:border-primary focus:bg-white transition-colors"
                  >
                    {SERVICES_DATA.map((service) => <option key={service.id} value={service.title}>{service.title}</option>)}
                    <option value="Other project">Something else</option>
                  </select>
                </div>

                {/* Project Details */}
                <div>
                  <label
                    htmlFor="project-notes"
                    className="block font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-semibold mb-1"
                  >
                    Tell Us About Your Project and Location
                  </label>
                  <textarea
                    id="project-notes"
                    name="projectNotes"
                    rows={3}
                    value={projectNotes}
                    onChange={(e) => setProjectNotes(e.target.value)}
                    placeholder="e.g. Home in Baner; looking for a kitchen and dining table."
                    className="w-full bg-surface-container-low text-on-surface px-4 py-3 rounded-lg text-body-md border border-warm-beige focus:border-primary focus:bg-white transition-colors placeholder:text-outline/70"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="submit"
                    disabled={submissionStatus === 'saving'}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider px-5 py-4 rounded-lg hover:bg-primary-container transition-all shadow-md font-semibold disabled:cursor-wait disabled:opacity-60"
                  >
                    <span className="material-symbols-outlined text-[20px]">send</span>
                    <span>{submissionStatus === 'saving' ? 'Sending…' : 'Send Message'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-label-md text-label-md uppercase tracking-wider px-5 py-4 rounded-lg transition-colors font-semibold shadow-md"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    <span>Send on WhatsApp</span>
                  </button>

                  <a
                    href={'tel:' + SITE_CONFIG.contact.phone.replace(/\s+/g, '')}
                    className="sm:col-span-2 justify-self-start inline-flex items-center justify-center gap-2 text-on-surface font-label-md text-label-md uppercase tracking-wider py-2 hover:text-primary transition-colors font-semibold"
                  >
                    <span className="material-symbols-outlined text-[20px]">call</span>
                    <span>Call Us</span>
                  </a>
                </div>
              </form>
            </div>

            {/* Clarification Notice */}
            <div className="mt-6 pt-4 border-t border-surface-container-highest flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="text-outline">
                We use your details to reply to your enquiry. Choose the Sheet button to save it, or WhatsApp to message us directly.
              </span>
              <span className="text-secondary font-semibold">
                Our Pune team will get back to you.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
