import React, { useState } from 'react';

const COUNTRY_CODES = [
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: '+1', name: 'USA/Canada', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+968', name: 'Oman', flag: '🇴🇲' },
  { code: '+974', name: 'Qatar', flag: '🇶🇦' },
  { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
  { code: '+973', name: 'Bahrain', flag: '🇧🇭' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: '+960', name: 'Maldives', flag: '🇲🇻' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+7', name: 'Russia', flag: '🇷🇺' },
  { code: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: '+90', name: 'Turkey', flag: '🇹🇷' },
  { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
  { code: '+880', name: 'Bangladesh', flag: '🇧🇩' },
  { code: '+977', name: 'Nepal', flag: '🇳🇵' }
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '+91',
    phoneNumber: '',
    emailAddress: '',
    location: '',
    yourMessage: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mimic API request submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      
      // Reset form fields
      setFormData({
        fullName: '',
        countryCode: '+91',
        phoneNumber: '',
        emailAddress: '',
        location: '',
        yourMessage: ''
      });

      // Hide toast after 4 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }, 1200);
  };

  return (
    <section id="contact-section" className="w-full py-16 lg:py-24 bg-slate-100 font-body relative overflow-hidden text-left">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50/30 to-slate-100 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section heading above the card */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-brandSky relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandSky opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brandSky"></span>
            </span>
            <span className="text-[10px] font-bold text-brandBlue uppercase tracking-wider font-headline">
              Connect with Us
            </span>
          </div>
          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-primary mt-2 leading-tight">
            Let's Get{' '}
            <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">Started</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Tell us about your needs, and a Jerush expert will contact you within 24 hours.
          </p>
        </div>

        {/* Main split card */}
        <div className="rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(40,83,164,0.12)] flex flex-col lg:flex-row">

          {/* LEFT — Blue info panel */}
          <div
            className="lg:w-[300px] shrink-0 p-8 flex flex-col justify-between gap-8 text-white"
            style={{ background: 'linear-gradient(160deg, #1a3a6b 0%, #2853a4 60%, #1e90c8 100%)' }}
          >
            <div>
              <h3 className="font-headline font-black text-xl mb-1">Contact Us</h3>
              <div className="w-10 h-0.5 bg-brandSky rounded-full mb-6" />

              {/* Phone numbers */}
              <div className="space-y-3 mb-8">
                <a href="tel:+919489160055" className="flex items-center gap-3 group">
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm shrink-0 group-hover:bg-white/20 transition-colors">📞</span>
                  <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">+91 94891 60055</span>
                </a>
                <a href="tel:+919489160011" className="flex items-center gap-3 group">
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm shrink-0 group-hover:bg-white/20 transition-colors">📞</span>
                  <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">+91 94891 60011</span>
                </a>
                <a href="tel:+919751010107" className="flex items-center gap-3 group">
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm shrink-0 group-hover:bg-white/20 transition-colors">📞</span>
                  <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">+91 97510 10107</span>
                </a>
              </div>

              {/* Email */}
              <a href="mailto:info@jerushhospital.com" className="flex items-center gap-3 mb-8 group">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm shrink-0 group-hover:bg-white/20 transition-colors">✉️</span>
                <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">info@jerushhospital.com</span>
              </a>

              {/* Locations */}
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm shrink-0 mt-0.5">📍</span>
                <div>
                  <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2">Find Location</p>
                  <div className="flex gap-2 flex-wrap">
                    {['Thuckalay', 'Trichy', 'Chennai', 'Dubai'].map((loc) => (
                      <span key={loc} className="text-xs font-bold text-white/90 border border-white/20 px-2 py-0.5 rounded-md hover:bg-white/10 cursor-default transition-colors">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Business hours at bottom */}
            <div className="border-t border-white/10 pt-5">
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">Business Hours</p>
              <div className="space-y-1 text-xs text-white/80">
                <div className="flex justify-between">
                  <span>Mon – Sat</span>
                  <span className="font-bold text-white">9 AM – 11 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-bold text-brandSky">9 AM – 8 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — White form card */}
          <div className="flex-1 bg-white p-8 sm:p-10 flex flex-col justify-center">
            <h3 className="font-headline font-extrabold text-xl text-primary mb-1">Let's Get Started</h3>
            <p className="text-slate-400 text-sm mb-6">Tell us about your needs, and a Jerush expert will contact you.</p>

            <form className="space-y-5" onSubmit={handleFormSubmit}>
              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fullName" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Name:</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="w-full px-0 py-2 bg-transparent border-b border-slate-200 text-slate-800 placeholder-slate-300 focus:outline-none focus:border-brandSky transition-all text-sm"
                    placeholder="Enter Your Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="emailAddress" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address:</label>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    className="w-full px-0 py-2 bg-transparent border-b border-slate-200 text-slate-800 placeholder-slate-300 focus:outline-none focus:border-brandSky transition-all text-sm"
                    placeholder="Enter Your Email"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Row 2: Phone + Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phoneNumber" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone:</label>
                  <div className="flex gap-2 border-b border-slate-200 focus-within:border-brandSky transition-all items-center">
                    <select
                      id="countryCode"
                      name="countryCode"
                      className="bg-transparent text-slate-755 focus:outline-none transition-all text-xs sm:text-sm font-medium shrink-0 py-2 border-r border-slate-100 pr-1 mr-1 max-w-[100px] sm:max-w-[125px] truncate"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code} className="text-slate-800">
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="w-full min-w-0 px-0 py-2 bg-transparent text-slate-800 placeholder-slate-300 focus:outline-none transition-all text-sm"
                      placeholder="Enter Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{8,11}"
                      title="Please enter a valid phone number (8-11 digits)"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="location" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location:</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="w-full px-0 py-2 bg-transparent border-b border-slate-200 text-slate-800 placeholder-slate-300 focus:outline-none focus:border-brandSky transition-all text-sm"
                    placeholder="Your City / Country"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="yourMessage" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message:</label>
                <textarea
                  id="yourMessage"
                  name="yourMessage"
                  className="w-full px-0 py-2 bg-transparent border-b border-slate-200 text-slate-800 placeholder-slate-300 focus:outline-none focus:border-brandSky transition-all text-sm min-h-[80px] resize-none"
                  placeholder="Enter Description"
                  value={formData.yourMessage}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              {/* Submit Button — right aligned like ICONMA */}
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      <div
        className={`fixed bottom-6 right-6 z-50 bg-white border border-emerald-100 shadow-[0_20px_50px_rgba(16,185,129,0.1)] rounded-2xl p-4 flex items-center gap-3 max-w-md border-l-4 border-l-emerald-500 transition-all duration-500 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}
      >
        <span className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 font-bold shrink-0">✓</span>
        <div>
          <h5 className="font-headline font-bold text-xs text-slate-800">Request Received!</h5>
          <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed font-medium">Message sent successfully! Our team will contact you shortly.</p>
        </div>
      </div>
    </section>
  );
}
