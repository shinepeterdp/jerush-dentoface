import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Phone, ArrowLeft, ArrowRight, Award, Shield, CheckCircle2, ChevronRight } from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';

export default function MilestonesLegacyPage() {
  const navigate = useNavigate();
  const timelineRef = useRef(null);

  const handleBookClick = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTimeline = (direction) => {
    if (timelineRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      timelineRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const stats = [
    { value: '15+', label: 'Years of Excellence' },
    { value: '50,000+', label: 'Happy Patients' },
    { value: '100+', label: 'Certified Specialists' },
    { value: '4+', label: 'Global Destinations' }
  ];

  const timelineEvents = [
    {
      year: '2008',
      title: 'Foundation Laid',
      desc: 'First specialized clinic established with a 3-member medical team in Thuckalay, focusing on ethical, affordable community dental care.'
    },
    {
      year: '2013',
      title: 'Laser & Aesthetic Integration',
      desc: 'Introduced high-end German laser dental equipment and non-surgical aesthetic skin care, expanding capacity for regional demand.'
    },
    {
      year: '2017',
      title: 'Advanced Hair & Cosmetic Wing',
      desc: 'Launched dedicated hair transplantation operating suites (FUE/DHI) and established full-mouth rehab and digital smile design protocols.'
    },
    {
      year: '2021',
      title: 'Global Liaison Expansion',
      desc: 'Opened consultation desks in Dubai, UAE, and formed patient coordination pathways for US & Australian NRI communities.'
    },
    {
      year: '2025+',
      title: 'Digital Health & AI Diagnostics',
      desc: 'Deployed 3D intraoral printing, AI smile preview modeling, and Class-B automated sterilization labs across flagship centers.'
    }
  ];

  return (
    <div className="w-full bg-white font-body text-left relative pt-0 overflow-hidden">
      <PageBreadcrumbHero 
        title="Milestones & Legacy" 
        breadcrumbs={[
          { label: 'About Jerush', path: '/about' },
          { label: 'Milestones & Legacy', active: true }
        ]} 
      />

      {/* ─── 1. STAT WALL HERO (DARK SLATE CONTAINER) ─── */}
      <section className="w-full py-20 bg-slate-905 bg-slate-950 text-white relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-[400px] h-[400px] bg-brandBlue/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 transform -translate-y-1/2 w-[350px] h-[350px] bg-brandSky/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-12">
          {/* Header Texts */}
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brandSky text-[10px] font-bold uppercase tracking-wider font-headline">
              Our Journey So Far
            </span>
            <h1 className="font-headline font-black text-3xl sm:text-5xl text-white leading-tight">
              A Legacy Built on Trust, Proven Results, and Unbroken Values
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              From a regional pioneer to an internationally trusted multi-specialty cosmetic and dental destination.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-white/10 py-10 max-w-5xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <span className="block font-headline font-black text-3xl sm:text-5xl text-brandSky bg-gradient-to-r from-brandSky to-white bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="block text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2. HORIZONTAL TIMELINE SECTION ─── */}
      <section className="w-full py-20 lg:py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-12">
            <div className="text-left space-y-2">
              <span className="text-[10px] font-black text-brandBlue uppercase tracking-wider font-headline">Historical Timeline</span>
              <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900">The Journey of Jerush</h2>
            </div>
            
            {/* Scroll Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scrollTimeline('left')}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors shadow-sm"
                aria-label="Scroll left"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollTimeline('right')}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors shadow-sm"
                aria-label="Scroll right"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Timeline Cards Container */}
          <div 
            ref={timelineRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide w-full snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {timelineEvents.map((evt, idx) => (
              <div 
                key={idx}
                className="w-[280px] sm:w-[320px] shrink-0 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm snap-start flex flex-col justify-between min-h-[220px]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <span className="text-2xl font-headline font-black text-brandBlue">{evt.year}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-brandSky"></span>
                  </div>
                  <div className="space-y-2 text-left">
                    <h4 className="font-headline font-extrabold text-sm sm:text-base text-slate-900">{evt.title}</h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{evt.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. AWARDS & PRESS RECOGNITION BENTO GRID ─── */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandBlue/5 border border-brandBlue/10 text-brandBlue font-headline font-bold text-[10px] uppercase tracking-wider">
            Awards & Accreditations
          </span>
          <h2 className="font-headline font-black text-3xl sm:text-4xl text-slate-900">
            Recognitions & Quality Milestones
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Consistently recognized for clinical standards, innovative technology adoption, and excellent patient care.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Best Cosmetic & Dental Clinic */}
          <div className="md:col-span-7 bg-gradient-to-br from-brandBlue to-[#1B408B] text-white p-8 rounded-3xl shadow-sm flex flex-col justify-between min-h-[240px]">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-left space-y-2 mt-8">
              <h4 className="font-headline font-black text-lg sm:text-xl">Best Cosmetic & Dental Clinic</h4>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                Recognized for clinical precision, painless laser treatments, and patient satisfaction benchmarks in South India.
              </p>
            </div>
          </div>

          {/* Card 2: Excellence in Hair Restoration */}
          <div className="md:col-span-5 bg-white border border-slate-100 p-8 rounded-3xl shadow-sm flex flex-col justify-between min-h-[240px] hover:border-brandSky/20 transition-all">
            <div className="w-10 h-10 rounded-xl bg-brandBlue/5 flex items-center justify-center text-brandBlue">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-left space-y-2 mt-8">
              <h4 className="font-headline font-extrabold text-base sm:text-lg text-slate-900">Excellence in Hair Restoration</h4>
              <p className="text-slate-550 text-xs sm:text-sm leading-relaxed">
                Awarded for our highly sterile FUE/DHI surgical processes and high graft-survival retention protocols.
              </p>
            </div>
          </div>

          {/* Card 3: ISO 9001:2015 Certified */}
          <div className="md:col-span-5 bg-white border border-slate-100 p-8 rounded-3xl shadow-sm flex flex-col justify-between min-h-[240px] hover:border-brandSky/20 transition-all">
            <div className="w-10 h-10 rounded-xl bg-brandBlue/5 flex items-center justify-center text-brandBlue">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-left space-y-2 mt-8">
              <h4 className="font-headline font-extrabold text-base sm:text-lg text-slate-900">ISO 9001:2015 Certified</h4>
              <p className="text-slate-550 text-xs sm:text-sm leading-relaxed">
                Standardized international quality management processes implemented across all our outpatient surgical operations.
              </p>
            </div>
          </div>

          {/* Card 4: Media Features */}
          <div className="md:col-span-7 bg-slate-50 border border-slate-100 p-8 rounded-3xl shadow-sm flex flex-col justify-between min-h-[240px]">
            <div className="flex gap-2">
              <span className="px-2.5 py-1 rounded-md bg-brandSky/10 text-brandSky text-[8px] font-black uppercase tracking-wider">News Features</span>
            </div>
            <div className="text-left space-y-2 mt-8">
              <h4 className="font-headline font-extrabold text-base sm:text-lg text-slate-900">Media Publications</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Featured in leading national dailies and medical digests for pioneering painless laser dental diagnostics and advanced aesthetic procedures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. THEN VS NOW COMPARISON ─── */}
      <section className="w-full py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] font-black text-brandBlue uppercase tracking-wider font-headline">Clinical Evolution</span>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900">Then vs. Now</h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">How our infrastructure evolved to meet global standards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            {/* 2008 Card */}
            <div className="bg-white border border-slate-200/60 p-8 rounded-3xl shadow-sm text-left flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                  2008 Baseline
                </span>
                <h4 className="font-headline font-black text-lg text-slate-800">Single Consultation Unit</h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Began as a single dental chair consulting setup with basic dental X-ray and radiography tools in Thuckalay.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 text-[120px] font-serif font-black text-slate-50 opacity-[0.03] select-none translate-x-1/4 translate-y-1/4">2008</div>
            </div>

            {/* Present Day Card */}
            <div className="bg-gradient-to-br from-brandBlue to-[#1B408B] text-white p-8 rounded-3xl shadow-md text-left flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-brandSky text-[10px] font-bold uppercase tracking-wider">
                  Present Day
                </span>
                <h4 className="font-headline font-black text-lg">Multi-Floor Integrated Hospital</h4>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  A network of multi-specialty clinics featuring 3D CBCT scanners, sterile surgical theatres, in-house CAD/CAM aligner lab, and luxurious international patient lounges.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 text-[120px] font-serif font-black text-white/5 select-none translate-x-1/4 translate-y-1/4">2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. BOTTOM CALL TO ACTION (Dr. Bladbin Cutout) ─── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-brandBlue to-brandSky rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-8 items-stretch">
            {/* Left side: Dr. Bladbin's Image Cutout */}
            <div className="relative flex items-end justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 bg-black/5 min-h-[300px] lg:min-h-0 pt-8 lg:pt-0">
              <img
                src="/images/doctors/dr-bladbin-portrait.webp"
                alt="DR. A. BLADBIN - Chairman & Founder"
                className="h-[320px] lg:h-[380px] w-auto object-contain object-bottom transition-transform duration-500 hover:scale-[1.02]"
              />
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-xl text-left">
                <p className="text-[10px] font-bold text-brandSky uppercase tracking-wider">Chairman & Founder</p>
                <p className="text-xs font-headline font-black text-white">DR. A. BLADBIN</p>
              </div>
            </div>

            {/* Right side: CTA Details */}
            <div className="p-8 sm:p-12 flex flex-col justify-center text-left space-y-6">
              <h2 className="font-headline font-black text-2xl sm:text-3xl relative z-10 leading-tight">
                Be Part of Our Legacy
              </h2>
              <p className="text-white/80 text-sm sm:text-base max-w-xl leading-relaxed relative z-10">
                Experience clinical care backed by over fifteen years of proven excellence and patient trust. Schedule your medical consultation today.
              </p>
              <div className="flex flex-wrap gap-4 relative z-10">
                <button
                  onClick={handleBookClick}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-brandBlue font-headline font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md hover:bg-slate-50 hover:scale-[1.02] transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  Book Your Consultation
                </button>
                <a
                  href="tel:+919489160055"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-white/40 text-white font-headline font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-white/10 hover:border-white transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call Helpline
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
