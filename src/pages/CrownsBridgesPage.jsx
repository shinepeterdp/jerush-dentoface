import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Star, ChevronDown, Calendar, Phone, CheckCircle2,
  Clock, Award, Heart, Shield, Activity, Smile, Sparkles, ArrowRight,
  Info, Cpu, Layers, Check, Play, Eye
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import BeforeAfterSlider from '../components/common/BeforeAfterSlider';
import { transformationCases, VIDEO_STORIES } from '../data/transformationsData';

const STATS = [
  { value: '15K+', label: 'Crowns Restored' },
  { value: '99.4%', label: 'Clinical Precision' },
  { value: '15+ Yrs', label: 'Material Durability' },
  { value: '100%', label: 'Bio-Compatible Zirconia' }
];

const CROWN_CASES = transformationCases.filter(c => c.category === 'dental' && c.subCategory === 'Crowns & Bridges');

const PROCEDURE_STEPS = [
  {
    step: '01',
    title: '3D Digital Scan & Smile Consultation',
    desc: 'Our prosthodontists conduct high-resolution digital X-rays and 3D intraoral scans to evaluate bone support and plan tooth anatomy with sub-millimeter precision.',
    highlight: 'Zero Physical Mess'
  },
  {
    step: '02',
    title: 'Gentle & Painless Tooth Preparation',
    desc: 'Under gentle local anesthesia, the damaged or decayed tooth structure is conservative reshaped, preserving over 85% of healthy circumferential enamel.',
    highlight: 'Micro-Invasive Shaping'
  },
  {
    step: '03',
    title: 'Digital CAD/CAM Design & Shade Matching',
    desc: 'Using optical spectrophotometers, we match your exact natural enamel hue, translucency, and mamelons. The custom crown is digitally engineered in our CAD/CAM lab.',
    highlight: 'Natural Enamel Harmony'
  },
  {
    step: '04',
    title: 'Temporary Crown Placement',
    desc: 'While your permanent multi-layered zirconia crown is precision-milled, a comfortable temporary crown is bonded to protect the prepared tooth and maintain aesthetics.',
    highlight: 'Zero Downtime'
  },
  {
    step: '05',
    title: 'Permanent Adhesive Bonding & Tuning',
    desc: 'The custom zirconia or E-Max crown is verified for occlusion, contact tightness, and aesthetics before permanent bonding with medical-grade resin cements.',
    highlight: 'Lifetime Durability'
  }
];

const MATERIALS = [
  {
    name: 'Monolithic Zirconia',
    badge: 'Gold Standard',
    desc: 'Extreme 1200+ MPa fracture resistance with multi-layered color gradient. Virtually unbreakable and ideal for both molars and front teeth.',
    features: ['1200+ MPa strength', 'Metal-free bio-compatibility', 'No dark gum-line margin', '15+ year lifespan'],
    popularFor: 'Molars, Premolars & Multi-Unit Bridges'
  },
  {
    name: 'E-Max Lithium Disilicate',
    badge: 'Supreme Aesthetics',
    desc: 'Ultra-aesthetic glass ceramic that mimics natural enamel translucency and light refraction. The prime choice for anterior smile makeovers.',
    features: ['Matchless natural translucency', 'High edge strength (500 MPa)', 'Chemically bonded to enamel', 'Stain-resistant glass finish'],
    popularFor: 'Front Teeth & Cosmetic Makeovers'
  },
  {
    name: 'Fixed Multi-Unit Bridge',
    badge: 'Missing Teeth Solution',
    desc: 'Fixed prosthetic bridging gaps caused by 1 to 4 missing teeth, anchored firmly to adjacent natural teeth or titanium implants.',
    features: ['Fixed non-removable solution', 'Restores 100% chewing force', 'Prevents adjacent teeth drift', 'Maintains facial bone structure'],
    popularFor: 'Replacing 1-3 Consecutive Missing Teeth'
  }
];

const CANDIDACY_LIST = [
  {
    title: 'Severely Broken or Fractured Teeth',
    desc: 'Trauma or deep wear that compromises chewing strength and tooth integrity.'
  },
  {
    title: 'Post-Root Canal Treatment Protection',
    desc: 'Reinforces brittle non-vital teeth to prevent catastrophic coronal fractures.'
  },
  {
    title: 'Discolored or Malformed Front Teeth',
    desc: 'Masks severe tetracycline, fluorosis, or developmental enamel defects.'
  },
  {
    title: 'Missing One or Multiple Teeth',
    desc: 'Fixed dental bridges restore full biting and speaking functionality permanently.'
  },
  {
    title: 'Large Failing Restorations',
    desc: 'Replaces old massive fillings that are leaking or causing tooth fractures.'
  },
  {
    title: 'Cosmetic Smile Makeover',
    desc: 'Corrects irregular tooth shapes, gaps, and minor misalignments seamlessly.'
  }
];

const FAQS = [
  {
    q: 'What is a Jacket Crown and how is it different from a regular crown?',
    a: 'A jacket crown is a full-coverage aesthetic prosthetic restoration made entirely of tooth-colored ceramic or high-strength zirconia (without any metal substructure). Unlike traditional metal-based crowns which develop dark black lines around the gums over time, jacket crowns offer 100% lifelike translucency and natural gum-line harmony.'
  },
  {
    q: 'How long does a dental jacket crown or fixed bridge last?',
    a: 'At Jerush, our precision CAD/CAM zirconia and E-Max crowns are engineered to last 15 to 20+ years with standard oral hygiene and regular dental checkups. We utilize premium medical-grade biocompatible materials backed by clinical quality certifications.'
  },
  {
    q: 'Is the dental crown preparation procedure painful?',
    a: 'Not at all. We administer gentle computer-assisted local anesthesia to ensure the tooth and surrounding gingival tissues are completely numb. Most patients report feeling only light vibration, and the entire tooth shaping is completed comfortably in a single sitting.'
  },
  {
    q: 'What is the difference between a dental bridge and a dental implant?',
    a: 'A dental bridge uses adjacent healthy teeth as anchors to suspend artificial prosthetic teeth (pontics) over a gap. It is completed quickly in 3 to 5 days without surgery. A dental implant is an artificial titanium root placed surgically into the jawbone. Our prosthodontists evaluate your bone density and adjacent teeth to recommend the optimal solution.'
  },
  {
    q: 'How do I care for my jacket crown or bridge?',
    a: 'Care for your crown just like your natural teeth! Brush twice daily with a soft-bristled toothbrush, floss regularly (using superfloss or bridge threaders under fixed bridges), and visit Jerush every 6 months for routine cleaning and occlusion checks.'
  }
];

export default function CrownsBridgesPage() {
  const navigate = useNavigate();
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const activeCase = CROWN_CASES[activeCaseIdx] || CROWN_CASES[0];

  const handleBookClick = (e) => {
    e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="w-full bg-slate-50 font-body text-slate-800 relative pt-0 pb-20">
      {/* ─── 1. BREADCRUMB HERO ─── */}
      <PageBreadcrumbHero
        title="Crowns & Bridges (Jacket Crowns)"
        breadcrumbs={[
          { label: 'Dental Care', path: '/treatments' },
          { label: 'Crowns & Bridges', active: true }
        ]}
      />

      {/* ─── 2. HERO HIGHLIGHTS & STATS ─── */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brandSky/10 text-brandBlue border border-brandSky/20 rounded-full text-xs font-bold font-headline uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brandSky" />
                Advanced CAD/CAM Prosthodontics
              </div>
              <h1 className="font-headline font-black text-2xl sm:text-4xl text-slate-900 leading-tight">
                Restore Strength, Function & Natural Beauty to Damaged Teeth
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Whether repairing a broken incisor, reinforcing a tooth post-root canal, or replacing missing teeth with fixed bridges, Jerush Dentofacial utilizes world-class monolithic Zirconia and E-Max ceramics to craft durable, indistinguishable smiles.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={handleBookClick}
                  className="px-7 py-3.5 bg-gradient-to-r from-brandBlue to-brandSky hover:brightness-110 text-white font-headline font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-brandBlue/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Book Crown Consultation
                </button>
                <a
                  href="#before-after"
                  className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-headline font-bold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-brandBlue" />
                  View Clinical Results
                </a>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-gradient-to-br from-slate-50 to-sky-50/40 rounded-2xl border border-slate-200/80 text-left space-y-1 hover:border-brandSky/50 transition-all"
                >
                  <span className="font-headline font-black text-2xl sm:text-3xl text-brandBlue block">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 block leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. INTERACTIVE BEFORE & AFTER CLINICAL SHOWCASE (Real Patient Cases) ─── */}
      <section id="before-after" className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
          {/* Ambient light glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brandBlue/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brandSky/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-10">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6 text-left">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/10 px-3 py-1 rounded-full border border-brandSky/20 inline-block">
                  Verified Clinical Transformations
                </span>
                <h2 className="font-headline font-black text-2xl sm:text-4xl text-white">
                  Real Patient Before & After Results
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  Browse real documented clinical cases treated at Jerush Dento Facial & Cosmetic Laser Centre. Drag the interactive split slider to compare original state with the restored outcome.
                </p>
              </div>

              <Link
                to="/smile-stories"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-700 hover:border-brandSky text-brandSky font-headline font-bold text-xs uppercase tracking-wider rounded-xl transition-all shrink-0"
              >
                <span>All Smile Stories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Main Interactive Showcase Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Selector List */}
              <div className="lg:col-span-5 space-y-3 text-left">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-headline mb-2">
                  Select Patient Case Study ({CROWN_CASES.length} Cases)
                </h3>

                <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
                  {CROWN_CASES.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveCaseIdx(idx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        activeCaseIdx === idx
                          ? 'bg-slate-900 border-brandSky shadow-lg shadow-brandSky/10'
                          : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-headline font-bold text-sm text-white">
                            {item.patientName}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-brandBlue/30 text-brandSky font-bold uppercase tracking-wider">
                            {item.highlight}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-slate-500 font-semibold">
                          Duration: {item.timeframe} • {item.location}
                        </p>
                      </div>

                      <ArrowRight className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                        activeCaseIdx === idx ? 'translate-x-1 text-brandSky' : ''
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Interactive Slider & Case Dossier */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-left backdrop-blur-xl">
                {/* Case Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Verified Clinical Case File
                    </span>
                    <h3 className="font-headline font-black text-xl sm:text-2xl text-white">
                      {activeCase.title}
                    </h3>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl text-left">
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider block">Lead Specialist</span>
                    <span className="text-xs font-headline font-bold text-brandSky">
                      {activeCase.doctor}
                    </span>
                  </div>
                </div>

                {/* Interactive Slider Component */}
                <BeforeAfterSlider
                  beforeImage={activeCase.beforeImg}
                  afterImage={activeCase.afterImg}
                  beforeLabel={activeCase.beforeLabel}
                  afterLabel={activeCase.afterLabel}
                  aspectRatio="aspect-[16/10]"
                  alt={activeCase.title}
                />

                {/* Case Clinical Notes */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-headline block">
                    Clinical Treatment Summary
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeCase.clinicalNotes}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="text-xs text-slate-400">
                    Prosthetic Type: <strong className="text-white">{activeCase.subCategory}</strong>
                  </span>
                  <button
                    onClick={handleBookClick}
                    className="px-5 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Consult on this Procedure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. STEP-BY-STEP TREATMENT WORKFLOW ─── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-brandBlue uppercase tracking-widest bg-brandSky/10 px-3 py-1 rounded-full border border-brandSky/20 inline-block">
            5-Step Clinical Precision
          </span>
          <h2 className="font-headline font-black text-2xl sm:text-4xl text-slate-900">
            How Jacket Crown Treatment Works at Jerush
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto">
            From initial digital scans to the final seamless bond, our advanced prosthodontics workflow ensures zero discomfort and long-lasting results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {PROCEDURE_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left relative group hover:border-brandSky"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-brandBlue text-white font-headline font-black text-sm flex items-center justify-center shadow-md">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-bold text-brandSky bg-sky-50 px-2 py-0.5 rounded border border-sky-100 uppercase">
                    {step.highlight}
                  </span>
                </div>
                <h3 className="font-headline font-bold text-base text-slate-900 leading-snug">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 5. CROWN & BRIDGE MATERIAL COMPARISON ─── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-brandBlue uppercase tracking-widest bg-brandSky/10 px-3 py-1 rounded-full border border-brandSky/20 inline-block">
            Prosthodontic Materials
          </span>
          <h2 className="font-headline font-black text-2xl sm:text-4xl text-slate-900">
            Premium Bio-Compatible Material Options
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto">
            We use only internationally certified, metal-free CAD/CAM ceramic and monolithic zirconia blocks engineered for lifelong durability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MATERIALS.map((mat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between text-left space-y-6 group hover:border-brandBlue"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-brandSky/10 text-brandBlue border border-brandSky/20 uppercase font-headline">
                    {mat.badge}
                  </span>
                </div>
                <h3 className="font-headline font-black text-2xl text-slate-900">
                  {mat.name}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {mat.desc}
                </p>

                <div className="pt-2 space-y-2.5 border-t border-slate-100">
                  {mat.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recommended For</span>
                <span className="text-xs font-headline font-bold text-brandBlue mt-0.5 block">
                  {mat.popularFor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 6. CANDIDACY & CLINICAL INDICATIONS ─── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-slate-900 to-brandBlue text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-xs font-bold text-brandSky uppercase tracking-widest bg-brandSky/10 px-3 py-1 rounded-full border border-brandSky/20 inline-block">
                Clinical Candidacy
              </span>
              <h2 className="font-headline font-black text-2xl sm:text-3xl text-white leading-tight">
                Who Needs a Jacket Crown or Dental Bridge?
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                If you are experiencing tooth breakage, extensive wear, missing teeth, or seeking to transform your smile's aesthetic contour, our prosthodontic specialists can custom tailor the exact restorative plan for you.
              </p>
              <button
                onClick={handleBookClick}
                className="px-6 py-3 bg-white text-brandBlue font-headline font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-100 transition-all cursor-pointer shadow-md"
              >
                Schedule Diagnostic Evaluation
              </button>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CANDIDACY_LIST.map((cand, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-left space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brandSky shrink-0" />
                    <h4 className="font-headline font-bold text-sm text-white">{cand.title}</h4>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed pl-6">
                    {cand.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. VIDEO TESTIMONIAL SPOTLIGHT ─── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg group">
              <img
                src="/images/testimonials/brylin-shijo-tooth-crown.webp"
                alt="Brylin Shijo Dental Crown Review"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <a
                  href="https://www.youtube.com/watch?v=21FlI7IDQdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                >
                  <Play className="w-6 h-6 fill-current ml-1" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Story</span>
              </div>
              <h3 className="font-headline font-black text-2xl text-slate-900">
                "Painless & Perfect Dental Crown Experience at Jerush"
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed italic">
                "Brylin Shijo shares how the dental crown procedure completely restored his biting comfort and gave him back his confidence with seamless shade matching and zero discomfort."
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-headline font-bold text-sm text-slate-900">Brylin Shijo</h4>
                  <p className="text-xs text-slate-500">Thuckalay • Zirconia Crown Restoration</p>
                </div>
                <Link
                  to="/video-testimonials"
                  className="text-xs font-bold font-headline text-brandBlue hover:text-brandSky flex items-center gap-1 uppercase"
                >
                  <span>More Video Reviews</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. FAQS ACCORDION ─── */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-left">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold text-brandBlue uppercase tracking-widest bg-brandSky/10 px-3 py-1 rounded-full border border-brandSky/20 inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900">
            Got Questions About Crowns & Bridges?
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-headline font-bold text-sm sm:text-base text-slate-900 hover:text-brandBlue transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-brandBlue shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? 'rotate-180 text-brandSky' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 9. BOTTOM CTA BANNER (Adhering to Custom Rule: grid-cols-[1.2fr_2fr] with Doctor Cutout) ─── */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="bg-gradient-to-r from-brandBlue to-brandSky rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-8 items-stretch">
            {/* Left side: Doctor Cutout aligned to bottom */}
            <div className="relative flex items-end justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 bg-black/5 min-h-[300px] lg:min-h-0 pt-8 lg:pt-0">
              <img
                src="/images/doctors/sherine2.webp"
                alt="DR. SHERINE PONRAJ - Prosthodontic & Restorative Care"
                className="h-[320px] lg:h-[380px] w-auto object-contain object-bottom transition-transform duration-500 hover:scale-102"
              />
              {/* Overlay tag for Doctor name */}
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-xl text-left">
                <p className="text-[10px] font-bold text-brandSky uppercase tracking-wider">Restorative Dental Specialist</p>
                <p className="text-xs font-headline font-black text-white">DR. SHERINE PONRAJ</p>
              </div>
            </div>

            {/* Right side: CTA details */}
            <div className="p-8 sm:p-12 flex flex-col justify-center text-left space-y-6">
              <h2 className="font-headline font-black text-2xl sm:text-3xl relative z-10 leading-tight">
                Ready to Restore Your Smile with Precision Crowns & Bridges?
              </h2>
              <p className="text-white/85 text-sm sm:text-base max-w-xl leading-relaxed relative z-10">
                Consult with our experienced prosthodontic and cosmetic dental experts at Jerush Dentofacial. Schedule your digital 3D examination today for custom-crafted zirconia restorations.
              </p>
              <div className="flex flex-wrap gap-4 relative z-10">
                <button
                  onClick={handleBookClick}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-brandBlue font-headline font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md hover:bg-slate-50 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </button>
                <a
                  href="tel:+919489160000"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-white/40 text-white font-headline font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-white/10 hover:border-white transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call +91 94891 60000
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
