import React, { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

/**
 * ContactSection
 * ---------------
 * Two-column layout: contact info + an enquiry form that POSTs to a
 * Google Apps Script Web App, which appends the row to a Google Sheet.
 *
 * Setup:
 *  1. Follow /google-apps-script/README.md to deploy the script and get
 *     a Web App URL.
 *  2. Paste that URL into SITE_CONFIG.enquiryFormEndpoint in
 *     src/data/siteConfig.js.
 * Until that's done, submissions will fail with a friendly error instead
 * of silently disappearing.
 */
const EVENT_TYPES = SITE_CONFIG.eventTypes;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: EVENT_TYPES[0],
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      setStatus('error');
      return;
    }

    if (
      !SITE_CONFIG.enquiryFormEndpoint ||
      SITE_CONFIG.enquiryFormEndpoint === 'https://script.google.com/macros/s/AKfycbyOmc0AGlqQVKYCf7GW-zelSsex7I7AN1fo5teMMLMk0T5tnD-iCr6EaJCU5TU7wlyOOw/exec'
    ) {
      // Dev-time guard so this fails loudly instead of silently.
      console.error('Enquiry form endpoint is not configured. See src/data/siteConfig.js');
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      // Apps Script Web Apps expect a simple POST; 'no-cors' mode means we
      // can't read the response body, so we optimistically show success
      // once the request doesn't throw. The Apps Script side does the
      // actual validation/append.
      await fetch(SITE_CONFIG.enquiryFormEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      setStatus('success');
      setFormData({ name: '', phone: '', email: '', eventType: EVENT_TYPES[0], message: '' });
    } catch (err) {
      console.error('Enquiry submission failed:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-maroon-900 via-maroon-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-20 relative z-10">

        <div>
          <span className="text-gold-400 uppercase tracking-widest text-xs font-bold">Get In Touch</span>
          <h2 className="text-4xl md:text-6xl font-serif mt-8 mb-12">Book Your Event</h2>

          <div className="space-y-10">
            {/* <ContactInfoItem icon={MapPin} label="Find Us" value={SITE_CONFIG.contact.address} /> */}
            {/* <ContactInfoItem icon={Mail} label="Email Us" value={SITE_CONFIG.contact.email} /> */}
            <ContactInfoItem
              icon={Phone}
              label="Call Us"
              value={
                SITE_CONFIG.contact.phone2
                  ? `${SITE_CONFIG.contact.phone} / ${SITE_CONFIG.contact.phone2}`
                  : SITE_CONFIG.contact.phone
              }
            />
          </div>
        </div>

        <div className="bg-white p-10 md:p-14 rounded-3xl text-slate-900">
          <ContactForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} status={status} />
        </div>
      </div>
    </section>
  );
};

const ContactInfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex gap-6">
    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold-400 shrink-0">
      <Icon />
    </div>
    <div>
      <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">{label}</p>
      <p className="text-lg">{value}</p>
    </div>
  </div>
);

const ContactForm = ({ formData, onChange, onSubmit, status }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs uppercase font-bold tracking-widest text-slate-400">Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          className="w-full border-b border-slate-200 py-3 focus:border-maroon-600 transition-colors outline-none font-serif text-lg"
          placeholder="Your full name"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase font-bold tracking-widest text-slate-400">Phone Number *</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          className="w-full border-b border-slate-200 py-3 focus:border-maroon-600 transition-colors outline-none font-serif text-lg"
          placeholder="+91 XXXXX XXXXX"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase font-bold tracking-widest text-slate-400">Email Address</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          className="w-full border-b border-slate-200 py-3 focus:border-maroon-600 transition-colors outline-none font-serif text-lg"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase font-bold tracking-widest text-slate-400">Event Type</label>
        <select
          value={formData.eventType}
          onChange={(e) => onChange('eventType', e.target.value)}
          className="w-full border-b border-slate-200 py-3 focus:border-maroon-600 transition-colors outline-none font-serif text-lg bg-transparent"
        >
          {EVENT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase font-bold tracking-widest text-slate-400">Message</label>
        <textarea
          value={formData.message}
          onChange={(e) => onChange('message', e.target.value)}
          className="w-full border-b border-slate-200 py-3 focus:border-maroon-600 transition-colors outline-none font-serif text-lg resize-none"
          placeholder="Tell us about your event (date, city, etc.)"
          rows={2}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-6 bg-maroon-700 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-maroon-800 transition-all shadow-xl shadow-maroon-900/40 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending...' : 'Submit Enquiry'}
      </button>

      {status === 'success' && (
        <p className="text-green-600 text-sm text-center">Thank you! We'll get back to you soon.</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-sm text-center">
          Something went wrong. Please fill required fields, or call us directly.
        </p>
      )}
    </form>
  );
};

export default ContactSection;