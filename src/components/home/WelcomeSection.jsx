import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomeSection() {
  const navigate = useNavigate();
  const handleReadMoreClick = (e) => {
    e.preventDefault();
    navigate('/about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="jerush-about-welcome" className="w-full py-16 lg:py-20 bg-slate-50 font-body relative overflow-hidden text-left">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brandSky/5 rounded-full blur-3xl pointer-events-none -mr-40 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brandBlue/5 rounded-full blur-3xl pointer-events-none -ml-60 -mb-40"></div>
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Stylized Doctor Image and Floating Glass Badge */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute -inset-4 bg-gradient-to-tr from-brandBlue/10 to-brandSky/10 rounded-[2.5rem] blur-2xl opacity-75 pointer-events-none"></div>

            <div className="relative w-full max-w-md min-h-[560px] rounded-[2rem] lg:rounded-tl-[80px] lg:rounded-br-[80px] overflow-hidden shadow-2xl border border-slate-100 bg-white p-3 group">
              <div className="w-full h-full rounded-[1.5rem] lg:rounded-tl-[70px] lg:rounded-br-[70px] overflow-hidden relative">
                <img
                  src="/images/dr-bladbin-binila.webp"
                  alt="Dr. Bladbin & Dr. Binila - Directors"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"></div>
              </div>
            </div>
          </div>

          {/* Right Column: Welcome Texts and Interactive Timeline */}
          <div className="lg:col-span-7 text-left space-y-6 lg:pl-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/10">
              <span className="w-2 h-2 rounded-full bg-brandSky relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandSky opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brandSky"></span>
              </span>
              <span className="text-[10px] font-bold text-brandBlue uppercase tracking-wider font-headline">
                About Jerush
              </span>
            </div>

            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight">
              Excellence in{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Dentistry, Skin & Facial Aesthetics
              </span>
            </h2>

            <div className="border-l-4 border-brandSky pl-4 py-1.5">
              <p className="text-base sm:text-lg font-bold text-slate-700 font-headline leading-snug">
                Jerush Dentoface: Transforming Dental & Cosmetic Care Since 2002
              </p>
            </div>

            <p className="text-secondary text-sm sm:text-base leading-relaxed max-w-2xl">
              Jerush Dentofacial & Cosmetic Laser Centre was established in 2002 with a mission to revolutionize dental care and cosmetic treatments. From the very beginning, we have been at the forefront of innovation, combining advanced technology with a patient-centric approach to deliver exceptional healthcare services.
            </p>

            {/* Key Milestones Interactive Vertical Timeline */}
            <div className="space-y-6 pt-4 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-headline">
                Key Milestones in Our Journey
              </h4>

              <div className="relative border-l-2 border-slate-100 pl-6 space-y-8">
                {/* Timeline Step 1 */}
                <div className="relative group/timeline-item">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-brandBlue flex items-center justify-center transition-all duration-300 group-hover/timeline-item:border-brandSky group-hover/timeline-item:scale-125 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-brandBlue transition-all duration-300 group-hover/timeline-item:bg-brandSky"></div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="text-lg font-extrabold text-brandBlue font-headline">2002</span>
                    <span className="text-sm font-bold text-slate-800 font-headline">
                      Foundation of Medical Excellence
                    </span>
                  </div>
                  <p className="text-secondary text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
                    Established with a vision to integrate world-class facial aesthetics, cosmetic laser dermatology, and precision dental diagnostics under one roof.
                  </p>
                </div>

                {/* Timeline Step 2 */}
                <div className="relative group/timeline-item">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-brandBlue flex items-center justify-center transition-all duration-300 group-hover/timeline-item:border-brandSky group-hover/timeline-item:scale-125 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-brandBlue transition-all duration-300 group-hover/timeline-item:bg-brandSky"></div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="text-lg font-extrabold text-brandBlue font-headline">2006</span>
                    <span className="text-sm font-bold text-slate-800 font-headline">
                      Early Expansion
                    </span>
                  </div>
                  <p className="text-secondary text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
                    To meet the growing demand for high-quality dental care, we expanded our facility, adding 10 new advanced dental care units and expanding laboratory services.
                  </p>
                </div>

                {/* Timeline Step 3 */}
                <div className="relative group/timeline-item">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-brandBlue flex items-center justify-center transition-all duration-300 group-hover/timeline-item:border-brandSky group-hover/timeline-item:scale-125 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-brandBlue transition-all duration-300 group-hover/timeline-item:bg-brandSky"></div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="text-lg font-extrabold text-brandBlue font-headline">2024</span>
                    <span className="text-sm font-bold text-slate-800 font-headline">
                      Scaling New Heights
                    </span>
                  </div>
                  <p className="text-secondary text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
                    Expanding regional presence with state-of-the-art diagnostic facilities and international medical liaison services, serving over 100,000+ smiling patients globally.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA button */}
            <div className="pt-6">
              <a
                href="#"
                onClick={handleReadMoreClick}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-brandBlue to-brandSky text-white font-bold text-sm rounded-xl overflow-hidden shadow-lg shadow-brandBlue/15 hover:shadow-brandBlue/25 hover:-translate-y-0.5 transition-all duration-300 select-none"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-brandSky to-brandBlue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10 flex items-center gap-2 font-headline uppercase tracking-wider text-xs">
                  Read More
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
