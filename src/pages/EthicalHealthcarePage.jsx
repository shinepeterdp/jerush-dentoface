import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Calendar, Phone, CheckCircle2, AlertTriangle, Scale, Lock, DollarSign, BookOpen } from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';

export default function EthicalHealthcarePage() {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pillars = [
    {
      num: '1',
      title: 'Absolute Pricing Transparency',
      desc: 'Clear, itemized treatment cost estimates provided in writing before starting any treatment.',
      icon: <DollarSign className="w-5 h-5 text-indigo-500" />
    },
    {
      num: '2',
      title: 'Zero Unnecessary Procedures',
      desc: 'Honest diagnosis. We never perform or push procedures that are not medically required.',
      icon: <Scale className="w-5 h-5 text-amber-500" />
    },
    {
      num: '3',
      title: 'Informed Consent & Education',
      desc: 'We explain all alternatives, risks, costs, and timelines clearly in your preferred language.',
      icon: <BookOpen className="w-5 h-5 text-emerald-500" />
    },
    {
      num: '4',
      title: 'Strict Data Privacy',
      desc: 'HIPAA & GDPR compliant secure digital systems ensure your medical records remain 100% confidential.',
      icon: <Lock className="w-5 h-5 text-blue-500" />
    }
  ];

  const comparisonRows = [
    {
      aspect: 'Cost Estimates',
      standard: 'Unexpected add-on fees and unexplained charges after treatment is finished.',
      jerush: 'Upfront written quote detailing all costs with zero hidden charges.'
    },
    {
      aspect: 'Treatment Advice',
      standard: 'Pushing high-margin, unnecessary procedures to meet clinic financial targets.',
      jerush: 'Strictly required care recommendations based on verifiable diagnostic evidence.'
    },
    {
      aspect: 'Second Opinions',
      standard: 'Resistant or slow in sharing digital diagnostic scans with other clinics.',
      jerush: '100% open records access, providing scans instantly for external second opinions.'
    },
    {
      aspect: 'Patient Control',
      standard: 'High-pressure conversion and sales tactics to sign treatment contracts.',
      jerush: 'Complete freedom and time to decide your treatment pace on your own terms.'
    }
  ];

  const rights = [
    { title: 'Right to Clear Explanation', desc: 'Medical diagnosis explained in simple, non-jargon language that you fully understand.' },
    { title: 'Right to Medical Records', desc: 'Instant access to your 3D digital scans, diagnostic X-rays, and full treatment history.' },
    { title: 'Right to Financial Clarity', desc: 'Full access to clear payment schedules and 0% interest EMI options for major treatments.' },
    { title: 'Right to Privacy', desc: 'Complete patient discretion maintained in private consultation suites and treatment rooms.' }
  ];

  return (
    <div className="w-full bg-white font-body text-left relative pt-0 overflow-hidden">
      <PageBreadcrumbHero 
        title="Ethical Healthcare" 
        breadcrumbs={[
          { label: 'About Jerush', path: '/about' },
          { label: 'Ethical Healthcare', active: true }
        ]} 
      />

      {/* ─── 1. MANIFESTO HERO (TEXT-FOCUS MANIFESTO) ─── */}
      <section className="w-full py-20 lg:py-24 bg-slate-50 relative overflow-hidden text-center border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brandBlue/3 rounded-full blur-[140px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brandBlue/5 border border-brandBlue/10 text-brandBlue text-[10px] font-bold uppercase tracking-wider font-headline">
              <ShieldCheck className="w-3.5 h-3.5" /> Our Uncompromising Commitment
            </span>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="font-headline font-black text-2xl sm:text-4xl text-slate-900 leading-relaxed italic">
              "Healthcare without fine print. Honest diagnosis, transparent pricing, zero pressure, and complete patient dignity."
            </p>
          </div>

          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            At Jerush, ethical practice isn't a policy—it is the foundation of every treatment we recommend.
          </p>
        </div>
      </section>

      {/* ─── 2. PILLARS BENTO GRID ─── */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900">
            The 4 Pillars of Ethical Care
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            Our medical operations are structured to defend these core pillars of patient trust.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-brandSky/20 transition-all duration-300 flex gap-4 text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                {p.icon}
              </div>
              <div className="space-y-2">
                <h4 className="font-headline font-extrabold text-base text-slate-900">{p.num}. {p.title}</h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. OUR PROMISE VS STANDARD PRACTICES COMPARISON ─── */}
      <section className="w-full py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900">
              Our Promise vs. Standard Practices
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              We contrast our patient care standard against common industry friction points.
            </p>
          </div>

          {/* Grid Layout comparing aspects side by side */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {comparisonRows.map((row, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-start text-left"
              >
                {/* Care Aspect */}
                <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                  <h4 className="font-headline font-black text-sm uppercase tracking-wider text-slate-800">{row.aspect}</h4>
                </div>

                {/* Standard Practice */}
                <div className="md:col-span-4 space-y-1.5">
                  <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-wider text-red-500">
                    <AlertTriangle className="w-3 h-3" /> Standard Clinic Experience
                  </span>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{row.standard}</p>
                </div>

                {/* Jerush Standard */}
                <div className="md:col-span-5 space-y-1.5 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                  <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-wider text-emerald-600">
                    <CheckCircle2 className="w-3 h-3" /> The Jerush Ethical Standard
                  </span>
                  <p className="text-slate-700 font-semibold text-xs sm:text-sm leading-relaxed">{row.jerush}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. PATIENT RIGHTS CHECKLIST ─── */}
      <section className="max-w-4xl mx-auto px-6 py-20 lg:py-24">
        <div className="text-center mb-16 space-y-2">
          <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900">
            Patient Rights Checklist
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            Every patient at Jerush is legally entitled to these diagnostic and clinical safeguards.
          </p>
        </div>

        {/* Rights list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {rights.map((right, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
                ✓
              </div>
              <div className="space-y-1">
                <h4 className="font-headline font-extrabold text-sm sm:text-base text-slate-900">{right.title}</h4>
                <p className="text-slate-550 text-xs sm:text-sm leading-relaxed">{right.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 5. BOTTOM CALL TO ACTION (Dr. Prabin Cutout) ─── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-brandBlue to-brandSky rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-8 items-stretch">
            {/* Left side: Dr. Prabin's Image Cutout */}
            <div className="relative flex items-end justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 bg-black/5 min-h-[300px] lg:min-h-0 pt-8 lg:pt-0">
              <img
                src="/images/adminstration/prabin-chief-executive-officer.webp"
                alt="DR. A. PRABIN - Chief Executive Officer"
                className="h-[320px] lg:h-[380px] w-auto object-contain object-bottom transition-transform duration-500 hover:scale-[1.02]"
              />
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-xl text-left">
                <p className="text-[10px] font-bold text-brandSky uppercase tracking-wider">Chief Executive Officer</p>
                <p className="text-xs font-headline font-black text-white">DR. A. PRABIN</p>
              </div>
            </div>

            {/* Right side: CTA Details */}
            <div className="p-8 sm:p-12 flex flex-col justify-center text-left space-y-6">
              <h2 className="font-headline font-black text-2xl sm:text-3xl relative z-10 leading-tight">
                Have Questions About Our Treatment Policies?
              </h2>
              <p className="text-white/80 text-sm sm:text-base max-w-xl leading-relaxed relative z-10">
                Speak directly with our patient care team for complete transparency. Let us walk you through our pricing tables or clinical procedures.
              </p>
              <div className="flex flex-wrap gap-4 relative z-10">
                <button
                  onClick={handleBookClick}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-brandBlue font-headline font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md hover:bg-slate-50 hover:scale-[1.02] transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  Talk to Patient Care Desk
                </button>
                <a
                  href="tel:+919489160055"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-white/40 text-white font-headline font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-white/10 hover:border-white transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call Support Helpline
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
