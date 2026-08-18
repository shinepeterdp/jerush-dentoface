import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Play, Video, Users, CheckCircle, ArrowRight,
  Maximize2, Star, Sparkles
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';

const galleryItems = [
  // Before & After Transformations
  {
    id: 'smile-gap',
    title: 'Smile Gap Closure',
    category: 'cases',
    desc: 'Non-extraction smile gap closure with custom Jerushaligne invisible aligners.',
    timeframe: '14 Months',
    beforeImage: '/images/placeholder-before-aligners.webp',
    afterImage: '/images/placeholder-after-aligners.webp',
    beforeLabel: 'Gapped Incisors',
    afterLabel: 'Aligned Smile',
    doctor: 'Dr. C. Binila Asir',
  },
  {
    id: 'acne-scar',
    title: 'Acne Scar Reduction',
    category: 'cases',
    desc: 'Deep acne pitting reduction using Fractional CO₂ Laser and platelet-rich growth factors.',
    timeframe: '4 Sittings',
    beforeImage: '/images/placeholder-before-laser.webp',
    afterImage: '/images/placeholder-after-laser.webp',
    beforeLabel: 'Severe Pitting',
    afterLabel: 'Smooth Surface',
    doctor: 'Dr. A. Bladbin',
  },
  {
    id: 'hair-regrowth',
    title: 'Scalp Hair Regrowth',
    category: 'cases',
    desc: 'Substantial regrowth for male pattern baldness (Grade 4) using QR678 & GFC regenerative therapy.',
    timeframe: '6 Sessions',
    beforeImage: '/images/placeholder-before-hair.webp',
    afterImage: '/images/placeholder-after-hair.webp',
    beforeLabel: 'Thinning Crown',
    afterLabel: 'Dense Foliage',
    doctor: 'Dr. A. Bladbin',
  },
  {
    id: 'body-contour',
    title: 'Abdomen Body Contouring',
    category: 'cases',
    desc: 'Stubborn abdominal fat reduction using Cryo Cool Sculpting & EM-Muscle toning.',
    timeframe: '3 Sessions',
    beforeImage: '/images/placeholder-before-body.webp',
    afterImage: '/images/placeholder-after-body.webp',
    beforeLabel: 'Excess Adipose',
    afterLabel: 'Sculpted Waist',
    doctor: 'Dr. A. Bladbin',
  },

  // Media & Tours
  {
    id: 'video-tour',
    title: 'Thuckalay Flagship Centre Tour',
    category: 'media',
    desc: 'Take a virtual walk through South India\'s most advanced dental and cosmetic laser hospital.',
    type: 'video',
    thumbnail: '/images/placeholder-tour-thumb.webp',
    videoUrl: '#',
    duration: '2:45 mins'
  },
  {
    id: 'camp-kanyakumari',
    title: 'Rural Dental Health Camp - Kanyakumari',
    category: 'media',
    desc: 'Jerush medical team providing free diagnostic scans and treatments for 300+ rural residents.',
    type: 'camp',
    thumbnail: '/images/placeholder-camp-kanya.webp',
    date: 'March 2026'
  },
  {
    id: 'seminar-wellness',
    title: 'Facial Aesthetics Seminar - Dubai',
    category: 'media',
    desc: 'Dr. A. Bladbin hosting a clinical seminar on non-surgical facial rejuvenation for GCC practitioners.',
    type: 'seminar',
    thumbnail: '/images/placeholder-seminar.webp',
    date: 'January 2026'
  },

  // Patient Stories
  {
    id: 'story-vid-1',
    title: 'Priya\'s Orthodontic Journey',
    category: 'stories',
    desc: '"Jerushaligne clear aligners completely changed my confidence. The treatment was painless and practically invisible!"',
    rating: 5,
    patientName: 'Priya Rajan',
    patientRole: 'IT Consultant, Chennai',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'story-review-2',
    title: 'Life-changing Laser Care',
    category: 'stories',
    desc: '"I struggled with deep acne scars for 10 years. After 4 sessions of Fractional CO₂ laser here, my skin feels and looks incredibly smooth. Highly recommended!"',
    rating: 5,
    patientName: 'Michael K.',
    patientRole: 'Entrepreneur, Dubai',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'story-review-3',
    title: 'Excellent Dental Implant Treatment',
    category: 'stories',
    desc: '"Got double dental implants done by Dr. Binila Asir. CBCT 3D planning was explain in detail and placement was done painlessly. 5-star standard clinic."',
    rating: 5,
    patientName: 'Ramesh Sundaram',
    patientRole: 'Retired Professor, Trichy',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  }
];

export default function GalleryPage({ setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('cases');
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Close media modal on Escape key press
  useEffect(() => {
    if (!selectedMedia) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedMedia(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia]);

  const tabs = [
    { id: 'cases', name: 'Transformations', icon: Camera, count: galleryItems.filter(i => i.category === 'cases').length },
    { id: 'media', name: 'Media & Tours', icon: Video, count: galleryItems.filter(i => i.category === 'media').length },
    { id: 'stories', name: 'Patient Stories', icon: Users, count: galleryItems.filter(i => i.category === 'stories').length },
  ];

  const filteredItems = galleryItems.filter(item => item.category === activeTab);

  const handleActionClick = (e) => {
    e.preventDefault();
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('contact');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-0 font-body relative overflow-hidden">
      <PageBreadcrumbHero 
        title="Smile Stories & Gallery" 
        breadcrumbs={[{ label: 'Gallery', active: true }]} 
      />

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brandBlue/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-brandSky/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 py-16">

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-900/60 border border-slate-800/80 p-1.5 rounded-2xl flex gap-1.5 backdrop-blur-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-headline font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white shadow-lg shadow-brandBlue/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content wrapper */}
        <div className="min-h-[400px]">
          
          {/* Tab 1: transformations cases */}
          {activeTab === 'cases' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left selector col */}
              <div className="lg:col-span-4 space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-headline mb-4 text-left">Select Transformation case</h3>
                <div className="space-y-3">
                  {filteredItems.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveCaseIndex(idx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        activeCaseIndex === idx
                          ? 'bg-slate-900 border-sky-500/50 shadow-md shadow-brandSky/5'
                          : 'bg-slate-900/40 border-slate-800/60 hover:border-slate-700/80 hover:bg-slate-900/60'
                      }`}
                    >
                      <div>
                        <h4 className="font-headline font-bold text-sm text-white">{item.title}</h4>
                        <p className="text-[10px] text-brandSky font-bold uppercase tracking-wider mt-1">
                          Timeframe: {item.timeframe}
                        </p>
                      </div>
                      <ArrowRight className={`w-4 h-4 text-slate-500 transition-transform ${
                        activeCaseIndex === idx ? 'translate-x-1 text-brandSky' : ''
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right interactive before-after preview col */}
              <div className="lg:col-span-8 bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
                {filteredItems[activeCaseIndex] && (
                  <motion.div
                    key={filteredItems[activeCaseIndex].id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6 text-left"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className="font-headline font-extrabold text-2xl text-white">
                          {filteredItems[activeCaseIndex].title}
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm mt-1">
                          {filteredItems[activeCaseIndex].desc}
                        </p>
                      </div>
                      <div className="bg-slate-950/60 border border-slate-850 px-3 py-1.5 rounded-xl text-left">
                        <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest block leading-none">Consultant Doctor</span>
                        <span className="text-xs font-headline font-bold text-slate-200 mt-1 block">
                          {filteredItems[activeCaseIndex].doctor}
                        </span>
                      </div>
                    </div>

                    {/* Double Mock Case Display */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                      {/* Before Box */}
                      <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col justify-center items-center p-4">
                        <div className="absolute inset-0 bg-gradient-to-tr from-rose-950/25 to-slate-955 pointer-events-none z-10"></div>
                        <Camera className="w-10 h-10 text-rose-500/40 mb-3 group-hover:scale-110 transition-transform z-20" />
                        <span className="text-xs text-rose-400 font-bold font-headline uppercase tracking-wider z-20">
                          {filteredItems[activeCaseIndex].beforeLabel}
                        </span>
                        <span className="text-[10px] text-slate-505 mt-1 uppercase font-bold tracking-widest z-20">Prior Treatment</span>
                        <div className="absolute bottom-4 left-4 z-20 px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/25 text-[9px] uppercase font-bold rounded">Before</div>
                      </div>

                      {/* After Box */}
                      <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 flex flex-col justify-center items-center p-4">
                        <div className="absolute inset-0 bg-gradient-to-tr from-sky-950/25 to-slate-955 pointer-events-none z-10"></div>
                        <Sparkles className="w-10 h-10 text-brandSky/60 mb-3 group-hover:scale-110 group-hover:rotate-12 transition-transform z-20" />
                        <span className="text-xs text-brandSky font-bold font-headline uppercase tracking-wider z-20">
                          {filteredItems[activeCaseIndex].afterLabel}
                        </span>
                        <span className="text-[10px] text-slate-350 mt-1 uppercase font-bold tracking-widest z-20">Clinical Outcome</span>
                        <div className="absolute bottom-4 left-4 z-20 px-2 py-0.5 bg-brandSky/20 text-brandSky border border-sky-500/25 text-[9px] uppercase font-bold rounded">After</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-slate-800/40">
                      <span className="text-xs text-slate-400 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        Verified Clinical Case File
                      </span>
                      <a
                        href="#"
                        onClick={handleActionClick}
                        className="text-xs font-headline font-bold text-brandSky hover:underline flex items-center gap-1"
                      >
                        Consult on this result
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>

            </div>
          )}

          {/* Tab 2: media & tours */}
          {activeTab === 'media' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden flex flex-col justify-between text-left"
                >
                  <div className="relative aspect-[16/10] bg-slate-950 flex items-center justify-center border-b border-slate-850 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900 opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"></div>
                    
                    {/* Icon indicator */}
                    {item.type === 'video' ? (
                      <button
                        onClick={() => setSelectedMedia(item)}
                        className="w-12 h-12 rounded-full bg-brandSky text-white flex items-center justify-center shadow-lg shadow-brandSky/30 hover:scale-110 transition-transform z-10 cursor-pointer"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </button>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center border border-slate-700 z-10">
                        <Camera className="w-5 h-5" />
                      </div>
                    )}

                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-350">
                        {item.type === 'video' ? 'Facility Tour' : 'Community Camp'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-headline font-bold text-base text-white group-hover:text-brandSky transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800/40 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      <span>{item.type === 'video' ? 'Duration' : 'Date'}</span>
                      <span className="text-slate-300">{item.type === 'video' ? item.duration : item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: patient stories testimonials */}
          {activeTab === 'stories' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((story) => (
                <div
                  key={story.id}
                  className="bg-slate-900/40 border border-slate-800/60 hover:border-slate-700/60 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300"
                >
                  <div className="space-y-4 text-left">
                    {/* Stars */}
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <h4 className="font-headline font-bold text-base text-white">
                      "{story.title}"
                    </h4>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed italic">
                      {story.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-8 pt-4 border-t border-slate-850">
                    <img
                      src={story.avatar}
                      alt={story.patientName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-800 shrink-0"
                    />
                    <div className="text-left">
                      <span className="block font-headline font-bold text-xs text-white">
                        {story.patientName}
                      </span>
                      <span className="block text-[10px] text-slate-500 mt-0.5">
                        {story.patientRole}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {selectedMedia && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMedia(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl aspect-video bg-slate-900 border border-slate-850 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col justify-center items-center p-8 text-center"
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl p-1 bg-slate-950 rounded-full border border-slate-800 w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                &times;
              </button>

              <Video className="w-16 h-16 text-brandSky/40 mb-4 animate-pulse" />
              <h3 className="font-headline font-bold text-lg text-white mb-2">{selectedMedia.title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md mb-6">{selectedMedia.desc}</p>
              
              <div className="px-5 py-2.5 rounded-xl bg-brandSky/10 text-brandSky border border-brandSky/25 text-xs font-bold font-headline animate-pulse">
                [Streaming Interactive Clinic Video Tour...]
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
