import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChairmansDesk() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  const handleCtaClick = (e) => {
    e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = (doctor) => {
    setActiveModal(doctor);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <section className="w-full py-16 lg:py-20 bg-sky-50/70 font-body relative overflow-hidden text-left">
      {/* Decorative backdrop */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-brandSky/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-brandSky relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandSky opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brandSky"></span>
            </span>
            <span className="text-[10px] font-bold text-brandBlue uppercase tracking-wider font-headline">
              Leadership
            </span>
          </div>
          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-primary mt-2">
            Meet Our{' '}
            <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
              Founders & Directors
            </span>
          </h2>
          <p className="text-secondary text-sm sm:text-base mt-4 leading-relaxed">
            The visionary clinical leadership driving South India's premier dental and facial aesthetic groups.
          </p>
        </div>

        {/* Doctor 1: Dr. A. Bladbin */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Image Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute -inset-4 bg-gradient-to-tr from-brandBlue/10 to-brandSky/10 rounded-3xl blur-2xl opacity-75 pointer-events-none"></div>
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-white p-3 group">
              <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-brandSky/5 group-hover:bg-gradient-to-br group-hover:from-brandBlue/20 group-hover:to-brandSky/30 group-hover:scale-125 transition-all duration-500 pointer-events-none -translate-y-10 translate-x-10" />
              <div className="aspect-[4/5] rounded-xl overflow-hidden relative">
                <img
                  src="/images/doctors/dr-bladbin-profile2.webp"
                  alt="DR. A. BLADBIN"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right: Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-brandSky uppercase tracking-widest leading-none block">
              Founder & Chairman: Jerush Groups
            </span>
            <h3 className="font-headline font-extrabold text-3xl sm:text-4xl text-primary">
              DR. A. BLADBIN
            </h3>
            <p className="text-brandBlue font-semibold text-xs sm:text-sm font-headline tracking-wide uppercase">
              MBBS(Ukraine), LLB, MDS(OMFS), PHD(Srilanka), PHD(Hons), FAM(Ger), MCHT(Ger), MCDC(Ger)
            </p>
            <p className="text-slate-700 font-bold font-headline text-base">
              Maxillofacial Surgeon & Aesthetic Medicine Specialist
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-secondary text-sm">
              <li className="flex items-start gap-2.5">
                <svg className="w-5 h-5 text-brandSky shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Masters course in Hair Transplantation - Germany</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-5 h-5 text-brandSky shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Masters course in Dimple creation - Germany</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-5 h-5 text-brandSky shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Fellowship in Aesthetic Medicine</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-5 h-5 text-brandSky shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Universit’a’s medizin- Greifswald, Germany</span>
              </li>
              <li className="flex items-start gap-2.5 sm:col-span-2">
                <svg className="w-5 h-5 text-brandSky shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Cert. Implantology (Switzerland)</span>
              </li>
            </ul>

            <div className="pt-4 flex gap-4">
              <button
                onClick={() => openModal('bladbin')}
                className="px-6 py-3 bg-brandBlue text-white font-headline font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-brandBlue/90 transition-all duration-300"
              >
                Read Biography
              </button>
              <a
                href="#"
                onClick={handleCtaClick}
                className="px-6 py-3 border border-slate-200 text-slate-700 font-headline font-bold text-xs uppercase tracking-wider rounded-xl hover:border-brandSky hover:text-brandSky transition-all duration-300"
              >
                Book with Doctor
              </a>
            </div>
          </div>
        </div>

        {/* Doctor 2: Dr. C. Binila Asir */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12">
          {/* Left: Content Column (Desktop order 1, Mobile order 2) */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <span className="text-xs font-bold text-brandSky uppercase tracking-widest leading-none block">
              Director & Co-Founder
            </span>
            <h3 className="font-headline font-extrabold text-3xl sm:text-4xl text-primary">
              DR. C. BINILA BLADBIN
            </h3>
            <p className="text-brandBlue font-semibold text-xs sm:text-sm font-headline tracking-wide uppercase">
              MDS (Oral & Maxillofacial Surgery)
            </p>
            <p className="text-slate-700 font-bold font-headline text-base">
              Director | Oral & Maxillofacial Surgeon and Cosmetologist
            </p>
            <p className="text-secondary text-sm sm:text-base leading-relaxed">
              Dr. Binila serves as the esteemed Director of Jerush Dental Hospitals, bringing over 20 years of clinical experience as a leading dental surgeon. She completed her B.D.S. degree in 2004 and subsequently pursued a Postgraduate Master’s degree in Oral and Maxillofacial Surgery in 2012. Alongside her clinical excellence, she has carved a niche for herself as a Cosmetologist, seamlessly integrating aesthetic treatments into her dental practice.
            </p>

            <div className="pt-4 flex gap-4">
              <button
                onClick={() => openModal('binila')}
                className="px-6 py-3 bg-brandBlue text-white font-headline font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-brandBlue/90 transition-all duration-300"
              >
                Read Biography
              </button>
              <a
                href="#"
                onClick={handleCtaClick}
                className="px-6 py-3 border border-slate-200 text-slate-700 font-headline font-bold text-xs uppercase tracking-wider rounded-xl hover:border-brandSky hover:text-brandSky transition-all duration-300"
              >
                Book with Doctor
              </a>
            </div>
          </div>

          {/* Right: Image Column (Desktop order 2, Mobile order 1) */}
          <div className="lg:col-span-5 relative flex justify-center order-1 lg:order-2">
            <div className="absolute -inset-4 bg-gradient-to-tr from-brandBlue/10 to-brandSky/10 rounded-3xl blur-2xl opacity-75 pointer-events-none"></div>
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-white p-3 group">
              <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-brandSky/5 group-hover:bg-gradient-to-br group-hover:from-brandBlue/20 group-hover:to-brandSky/30 group-hover:scale-125 transition-all duration-500 pointer-events-none -translate-y-10 translate-x-10" />
              <div className="aspect-[4/5] rounded-xl overflow-hidden relative">
                <img
                  src="/images/doctors/dr-binila-parallax.webp"
                  alt="DR. C. BINILA BLADBIN"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Biography Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-2xl w-full p-8 relative overflow-hidden animate-fadeIn">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>

            {activeModal === 'bladbin' ? (
              <div className="space-y-4">
                <span className="text-xs font-bold text-brandSky uppercase">Biography</span>
                <h4 className="font-headline font-extrabold text-2xl text-primary">DR. A. BLADBIN</h4>
                <p className="text-xs text-slate-400 font-bold uppercase">FOUNDER & CHAIRMAN</p>
                <div className="text-secondary text-sm leading-relaxed space-y-3">
                  <p>
                    Dr. A. Bladbin is a highly accomplished Maxillofacial Surgeon and Aesthetic Specialist with decades of surgical and clinical expertise. His multi-disciplinary background covers medical degrees, dental specializations and international certifications in hair restoration and implantology from Germany and Switzerland.
                  </p>
                  <p>
                    Under his clinical leadership, Jerush Groups has grown from a single clinic to an international healthcare provider with locations across India and Deira, Dubai. He is dedicated to clinical safety, diagnostic accuracy and combining surgical skills with modern cosmetic enhancements.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <span className="text-xs font-bold text-brandSky uppercase">Biography</span>
                <h4 className="font-headline font-extrabold text-2xl text-primary">DR. C. BINILA BLADBIN</h4>
                <p className="text-xs text-slate-400 font-bold uppercase">DIRECTOR & CO-FOUNDER</p>
                <div className="text-secondary text-sm leading-relaxed space-y-3">
                  <p>
                    Dr. C. Binila Bladbin completed her BDS in 2004 and went on to complete her Master's degree (MDS) in Oral & Maxillofacial Surgery in 2012. With more than 20 years of clinical experience, she is widely recognized as a premier dental surgeon.
                  </p>
                  <p>
                    She is also a certified Cosmetologist, integrating aesthetic laser resurfacing, anti-aging therapies and facial dermatology treatments with premium dental care. She oversees clinical protocols, safety compliance and patient welfare across all Jerush branches.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-headline font-semibold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
