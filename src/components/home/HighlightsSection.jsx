import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { highlightService } from '../../services/highlightService';
import HighlightDetailModal from './HighlightDetailModal';

export default function HighlightsSection() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Fetch highlights and filter published ones
    highlightService.getHighlights()
      .then((data) => {
        if (Array.isArray(data)) {
          const published = data.filter(h => h.status === 'published' || !h.status);
          setItems(published);
        }
      })
      .catch(err => console.error("Error loading highlights:", err));
  }, []);

  const [visibleCount, setVisibleCount] = useState(3);
  const [gap, setGap] = useState(32);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      let newVisibleCount = 3;
      let newGap = 32;

      if (width >= 1024) {
        newVisibleCount = 3;
        newGap = 32;
      } else if (width >= 768) {
        newVisibleCount = 2;
        newGap = 24;
      } else {
        newVisibleCount = 1;
        newGap = 24;
      }

      setVisibleCount(newVisibleCount);
      setGap(newGap);

      // Adjust currentIndex if it's out of bounds with the new visibleCount
      setCurrentIndex(prev => {
        if (items.length === 0) return 0;
        const maxIndex = Math.max(0, items.length - newVisibleCount);
        return Math.min(prev, maxIndex);
      });
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [items.length]);

  const nextSlide = () => {
    if (currentIndex < items.length - visibleCount) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Loop back to start
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      // Loop to end
      setCurrentIndex(Math.max(0, items.length - visibleCount));
    }
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  if (items.length === 0) return null;

  return (
    <section id="clinic-spotlight" className="w-full py-16 lg:py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 relative overflow-hidden transition-colors duration-300 text-left">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brandBlue/3 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Grid */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandBlue/5 dark:bg-brandBlue/10 border border-brandBlue/10 dark:border-brandBlue/20 text-brandBlue dark:text-brandSky text-[10px] font-bold uppercase tracking-wider font-headline">
              Latest Happenings
            </span>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-3 leading-tight">
              Clinic Highlights & <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">Milestones</span>
            </h2>
          </div>
          
          {/* Explore More Header Button */}
          <button 
            onClick={() => handleCardClick(items[0])}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brandBlue hover:bg-brandBlue/90 dark:bg-brandSky dark:hover:bg-brandSky/90 text-white dark:text-slate-950 rounded-xl font-headline font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 w-max shrink-0"
          >
            Explore Highlights <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Slider Window */}
        <div className="relative overflow-hidden w-full pb-4" ref={containerRef}>
          <motion.div 
            className="flex gap-6 lg:gap-8 w-full"
            animate={{ x: `calc(-${currentIndex * (100 / visibleCount)}% - ${currentIndex * (gap / visibleCount)}px)` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {items.map((item) => (
              <div 
                key={item.id}
                style={{ width: `calc((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount})` }}
                className="shrink-0 flex-grow-0"
              >
                <div 
                  onClick={() => handleCardClick(item)}
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-brandSky/30 dark:hover:border-brandSky/20 transition-all duration-300 flex flex-col h-[460px] cursor-pointer group text-left relative"
                >
                  {/* Category Tag (Top Right Floating) */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg bg-slate-900/60 backdrop-blur-md border border-white/10 text-white">
                      {item.category || 'Update'}
                    </span>
                  </div>

                  {/* Image Cover */}
                  <div className="h-60 w-full overflow-hidden relative shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>

                  {/* Text Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      {/* Date */}
                      <span className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-550 font-bold uppercase tracking-wider">
                        <Calendar className="w-3 h-3 text-brandSky" />
                        {item.date}
                      </span>
                      {/* Title */}
                      <h3 className="font-headline font-extrabold text-sm sm:text-base text-slate-800 dark:text-white line-clamp-2 leading-snug group-hover:text-brandBlue dark:group-hover:text-brandSky transition-colors">
                        {item.title}
                      </h3>
                      {/* Excerpt */}
                      <p className="text-secondary dark:text-slate-400 text-xs line-clamp-3 leading-relaxed font-body">
                        {item.description}
                      </p>
                    </div>

                    {/* Read More Text Trigger */}
                    <div className="inline-flex items-center gap-1 text-xs font-bold text-brandBlue dark:text-brandSky font-headline pt-2 group-hover:translate-x-1 transition-transform">
                      Read Details <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Slider Controls (Bottom Right Navigation) */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button 
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-brandBlue dark:hover:text-brandSky transition-all shadow-sm active:scale-90"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-brandBlue dark:hover:text-brandSky transition-all shadow-sm active:scale-90"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Highlights Modal Overlay */}
      <HighlightDetailModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        highlight={selectedItem} 
      />
    </section>
  );
}
