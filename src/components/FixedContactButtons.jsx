import React, { useState, useEffect, memo } from 'react';
import { Phone, MessageCircle, X, Copy } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

/**
 * FixedContactButtons
 * Floating Phone (bottom-left) and WhatsApp (bottom-right) buttons.
 * Numbers/messages come from SITE_CONFIG.contact - update there, not here.
 */
const FixedContactButtons = memo(() => {
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);

  const { phone, phone2, whatsapp, whatsappMessage } = SITE_CONFIG.contact;
  const phoneNumbers = [phone, phone2].filter(Boolean);
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent;
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent));
    }
  }, []);

  // Auto-open WhatsApp popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowWhatsAppPopup(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handlePhoneClick = (number) => {
    if (isMobile) window.location.href = `tel:${number.replace(/\s/g, '')}`;
  };

  const copyToClipboard = (number) => {
    const setCopiedFlag = () => {
      setCopiedNumber(number);
      setTimeout(() => setCopiedNumber(null), 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(number).then(setCopiedFlag);
    } else {
      setCopiedFlag();
    }
  };

  const toggleWhatsApp = () => setShowWhatsAppPopup(!showWhatsAppPopup);

  return (
    <>
      {/* PHONE BUTTON (Bottom Left) */}
      <div
        className="fixed bottom-6 left-4 z-[9999]"
        onMouseEnter={() => !isMobile && setShowPhonePopup(true)}
        onMouseLeave={() => !isMobile && setShowPhonePopup(false)}
      >
        <div
          className={`absolute bottom-full mb-3 w-max max-w-[90vw] bg-white p-4 rounded-lg shadow-xl border border-gray-200 transition-all duration-300 origin-bottom-left space-y-3 ${
            showPhonePopup ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
          }`}
        >
          {phoneNumbers.map((number) => (
            <div key={number} onClick={() => handlePhoneClick(number)} className={isMobile ? 'cursor-pointer' : ''}>
              <p className="font-semibold text-lg text-gray-800">{number}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(number);
                }}
                className={`mt-1 w-full text-sm font-bold py-2 px-4 rounded transition-all duration-300 flex items-center justify-center ${
                  copiedNumber === number ? 'bg-green-500' : 'bg-maroon-700 hover:bg-maroon-800'
                } text-white`}
              >
                {copiedNumber === number ? 'Copied!' : <><Copy size={14} className="mr-2" /> Copy</>}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => handlePhoneClick(phone)}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-maroon-700 hover:bg-maroon-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          aria-label="Contact by phone"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>

      {/* WHATSAPP BUTTON (Bottom Right) */}
      <div className="fixed bottom-6 right-4 z-[9999]">
        <div
          className={`absolute bottom-full right-0 mb-3 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transition-all duration-300 origin-bottom-right ${
            showWhatsAppPopup ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
          } max-w-[90vw] ${isMobile ? 'w-[280px]' : 'w-80'}`}
        >
          <div className="bg-green-500 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold text-base">WhatsApp</h3>
            <button onClick={() => setShowWhatsAppPopup(false)} className="text-white opacity-70 hover:opacity-100">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-5">
            <p className="text-gray-700 bg-gray-100 rounded-lg p-3 text-sm">
              Jai Mata Di 🙏, Welcome to {SITE_CONFIG.brandName}! How can we help you?
            </p>
          </div>
          <div className="bg-gray-50 p-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowWhatsAppPopup(false)}
              className="w-full flex items-center justify-center bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all duration-300 py-3 px-4"
            >
              <MessageCircle className="w-5 h-5 mr-2" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        <button
          onClick={toggleWhatsApp}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      </div>
    </>
  );
});

export default FixedContactButtons;