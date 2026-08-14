import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SLIDES = [
  {
    id: 0,
    eyebrow: 'Milestone Achievement',
    headingStart: 'Celebrating ',
    headingHighlight: '25 Years',
    headingEnd: ' of Trusted Care',
    description: 'For over two and a half decades, Jerush Dentoface has been transforming smiles and lives. With 100,000+ happy patients across our clinics in Thuckalay, Trichy, Chennai & Dubai, our journey is powered by trust, innovation, and clinical excellence.',
    image: '/images/jerush-banner1.webp',
    stats: [
      { value: '25+', label: 'Years of Excellence' },
      { value: '1,00,000+', label: 'Smiling Patients' },
      { value: '4', label: 'Clinic Locations' }
    ]
  },
  {
    id: 1,
    eyebrow: 'Grand Opening',
    headingStart: 'Jerushaligne Clear Aligner ',
    headingHighlight: 'Manufacturing Unit',
    headingEnd: ' — Now Open',
    description: 'We are proud to announce the inauguration of our state-of-the-art Jerushaligne Clear Aligner Manufacturing Unit. As a B2B partner, you can now source clinically precise, doctor-approved clear aligners directly from our facility — with custom branding, fast turnaround, and uncompromising quality standards.',
    image: '/images/jerushaligne-opening-ceremony.webp',
    stats: [
      { value: 'B2B', label: 'Supply Partner' },
      { value: 'In-House', label: 'Manufacturing' },
      { value: 'Custom', label: 'Branding Available' }
    ]
  },
  {
    id: 2,
    eyebrow: 'Advanced Technology',
    headingStart: 'State-of-the-Art ',
    headingHighlight: 'Digital Dentistry',
    headingEnd: '',
    description: 'Experience next-generation dental care powered by AI-driven diagnostics, intraoral 3D scanning, and our proprietary Jerushaligne clear aligners. From single-visit root canals to precision digital implant planning — we bring the future of dentistry to your smile.',
    image: '/images/jerush-banner2.webp',
    stats: [
      { value: '3D', label: 'Digital Scanning' },
      { value: 'AI', label: 'Powered Diagnostics' },
      { value: '1 Visit', label: 'Root Canal' }
    ]
  },
  {
    id: 3,
    eyebrow: 'International Presence',
    headingStart: 'World-Class Care, ',
    headingHighlight: 'Closer to You',
    headingEnd: '',
    description: 'From our flagship centre in Thuckalay to thriving clinics in Trichy, Chennai, and our international branch in Dubai — Jerush Dentoface brings premium multispeciality dental, dermatology, and cosmetic care wherever you are.',
    image: '/images/jerush-banner3.webp',
    stats: [
      { value: '3', label: 'India Clinics' },
      { value: '1', label: 'Dubai Centre' },
      { value: '50+', label: 'Specialists' }
    ]
  }
];

export default function BannerShowcase() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleCtaClick = (e) => {
    e.preventDefault();
    navigate('/about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="jerush-banner-showcase" className="w-full py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-slate-50/50 overflow-hidden text-left relative">
      {/* Decorative background glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-brandSky/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        {/* Banner Slider Container */}
        <div className="relative w-full overflow-hidden">
          {SLIDES.map((slide, index) => {
            const isActive = currentSlide === index;
            return (
              <div
                key={slide.id}
                className={`transition-all duration-700 ease-in-out ${
                  isActive ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-4'
                }`}
              >
                <div className="jerush-banner-card bg-white border border-slate-100 rounded-3xl shadow-[0_20px_50px_rgba(40,83,164,0.06)] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_70px_rgba(40,83,164,0.12)] flex flex-col lg:flex-row items-stretch group">
                  {/* Left: Image (Full visibility, crisp scaling) */}
                  <div className="jerush-banner-card-image w-full lg:w-[50%] shrink-0 relative overflow-hidden h-56 xs:h-64 sm:h-80 md:h-96 lg:h-auto border-b lg:border-b-0 lg:border-r border-slate-100">
                    <img
                      src={slide.image}
                      alt={slide.eyebrow}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Right: Text Content */}
                  <div className="flex-grow flex items-center p-6 sm:p-8 lg:p-12 xl:p-14 bg-white">
                    <div className="w-full max-w-[500px] mx-auto lg:mx-0">
                      {/* Eyebrow */}
                      <span className="inline-flex items-center gap-2 text-[11px] font-headline font-bold uppercase tracking-wider text-brandSky mb-4">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandSky opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-brandSky"></span>
                        </span>
                        {slide.eyebrow}
                      </span>

                      {/* Heading */}
                      <h2 className="font-headline font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight mb-4 tracking-tight">
                        {slide.headingStart}
                        <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                          {slide.headingHighlight}
                        </span>
                        {slide.headingEnd}
                      </h2>

                      {/* Description */}
                      <p className="text-slate-500 text-[13.5px] sm:text-sm lg:text-[15px] leading-relaxed mb-6 lg:mb-8 font-medium">
                        {slide.description}
                      </p>

                      {/* Stats Grid - Horizontal on both mobile and desktop */}
                      <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-7 lg:mb-9">
                        {slide.stats.map((stat, i) => (
                          <div
                            key={i}
                            className="bg-slate-50/60 border border-slate-100 rounded-2xl p-3 sm:p-4 text-center transition-all duration-300 hover:border-brandSky/30 hover:bg-white hover:shadow-md hover:shadow-brandBlue/5 group/stat"
                          >
                            <span className="block font-headline font-extrabold text-sm sm:text-lg lg:text-xl text-brandBlue group-hover/stat:text-brandSky transition-colors duration-300">
                              {stat.value}
                            </span>
                            <span className="block text-[8px] sm:text-[9.5px] text-slate-500 font-bold uppercase tracking-wider mt-1 leading-tight">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <a
                        href="#"
                        onClick={handleCtaClick}
                        className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-brandBlue/15 hover:shadow-brandBlue/30 hover:-translate-y-0.5 transition-all duration-300 group"
                      >
                        <span>Our Journey</span>
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2.5 mt-8 lg:mt-10">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'w-8 bg-gradient-to-r from-brandBlue to-brandSky'
                  : 'w-2.5 bg-slate-200 hover:bg-slate-300'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
