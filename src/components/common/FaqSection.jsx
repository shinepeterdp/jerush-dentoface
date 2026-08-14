import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const FAQ_DATA = [
  {
    question: "What treatments do you specialize in?",
    answer: "We specialize in advanced orthodontics (including our custom Jerushaligne clear aligners), dental implants, single-visit root canals, cosmetic laser skin resurfacing, hair restoration (GFC & QR678), and non-invasive body contouring."
  },
  {
    question: "How do I book an appointment at any branch?",
    answer: "You can book an appointment by using our online consultation form on the Contact page, or by calling our support helplines directly: Thuckalay (+91 94891 60055), Trichy (+91 94891 60011), Chennai (+91 97510 10107), or Dubai (+971 50725 3105)."
  },
  {
    question: "What makes Jerushaligne clear aligners different?",
    answer: "Jerushaligne clear aligners are designed and manufactured in-house using advanced German CAD/CAM 3D scanning and printing. Because we skip third-party importers, we offer premium-quality orthodontics at much more competitive rates with faster, precise alignments."
  },
  {
    question: "Is the dental implant procedure painful?",
    answer: "We use CBCT guided 3D digital planning to place implants with microscopic precision. The procedure is done under local anesthesia, ensuring it is virtually painless, with most patients reporting minimal discomfort and swift healing."
  },
  {
    question: "Do cosmetic laser treatments require recovery downtime?",
    answer: "It depends on the treatment. Gentle skin facials have zero downtime. Advanced procedures like Fractional CO₂ Laser skin resurfacing require 5 to 7 days of recovery, during which skin redness occurs and absolute sun protection is required."
  },
  {
    question: "Which laser is used for acne scars and skin resurfacing?",
    answer: "We use the gold standard Fractional CO₂ Laser for acne scar revision, deep wrinkle reduction, and skin tightening. The procedure is performed using topical numbing creams to ensure maximum patient comfort."
  },
  {
    question: "How does Growth Factor Concentrate (GFC) work for hair loss?",
    answer: "GFC is a highly concentrated growth factor preparation engineered from the patient's own blood. It is injected into the scalp to directly stimulate hair root cells, inducing hair regrowth and reducing shedding with zero allergic risk."
  },
  {
    question: "Do you provide skin and hair treatments at all your clinics?",
    answer: "Yes, advanced skin treatments, cosmetic dermatology lasers, and hair restoration therapies are available at our regional clinics in Trichy, Chennai, Thuckalay, and Dubai."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const half = Math.ceil(FAQ_DATA.length / 2);
  const leftCol = FAQ_DATA.slice(0, half);
  const rightCol = FAQ_DATA.slice(half);

  const renderFaqItem = (faq, idx, globalIdx) => {
    const isOpen = openIndex === globalIdx;
    return (
      <div 
        key={globalIdx}
        className={`rounded-2xl overflow-hidden transition-all duration-300 p-4 ${
          isOpen 
            ? 'bg-gradient-to-r from-white via-blue-50/50 to-sky-50/40 border border-brandSky/40 shadow-md ring-1 ring-brandSky/20' 
            : 'bg-gradient-to-r from-white via-slate-50/60 to-blue-50/20 border border-slate-200/70 hover:border-brandSky/40 hover:shadow-md hover:from-white hover:to-blue-50/40'
        }`}
      >
        <button
          onClick={() => toggleIndex(globalIdx)}
          className="flex items-start justify-between w-full text-left focus:outline-none group py-1"
        >
          <span className="flex items-start gap-4 pr-4">
            {/* Number circle */}
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
              isOpen 
                ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white shadow-sm' 
                : 'bg-gradient-to-br from-brandBlue/10 to-brandSky/10 text-brandBlue border border-brandBlue/15 group-hover:bg-brandBlue group-hover:text-white'
            }`}>
              {globalIdx + 1}
            </span>
            <span className={`font-headline font-bold text-sm sm:text-base transition-colors leading-snug mt-1 ${
              isOpen ? 'text-brandBlue dark:text-brandSky' : 'text-slate-800 dark:text-slate-200 group-hover:text-brandBlue dark:group-hover:text-brandSky'
            }`}>
              {faq.question}
            </span>
          </span>
          
          {/* Arrow up-right */}
          <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
            isOpen 
              ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white rotate-45 shadow-sm' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-brandBlue group-hover:text-white'
          }`}>
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pl-12 pr-4 pt-3 text-slate-650 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-body">
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/30 relative overflow-hidden text-left border-t border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brandSky/5 rounded-full blur-3xl pointer-events-none -mr-40 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brandBlue/5 rounded-full blur-3xl pointer-events-none -ml-40 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header (Dual Column style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-5 text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandBlue/5 dark:bg-brandBlue/10 border border-brandBlue/10 dark:border-brandBlue/20 text-brandBlue dark:text-brandSky text-[10px] font-bold uppercase tracking-wider font-headline">
              Got Questions?
            </span>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-3 leading-tight">
              Frequently Asked <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">Questions</span>
            </h2>
          </div>
          <div className="lg:col-span-7 text-left lg:pt-8">
            <p className="text-secondary dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Find answers to common questions about our services, clinical treatments, appointments, and patient care options to help you make informed health decisions.
            </p>
          </div>
        </div>

        {/* Dual Column Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4">
          {/* Left Column FAQs */}
          <div className="space-y-4">
            {leftCol.map((faq, idx) => renderFaqItem(faq, idx, idx))}
          </div>

          {/* Right Column FAQs */}
          <div className="space-y-4">
            {rightCol.map((faq, idx) => renderFaqItem(faq, idx, half + idx))}
          </div>
        </div>

      </div>
    </section>
  );
}
