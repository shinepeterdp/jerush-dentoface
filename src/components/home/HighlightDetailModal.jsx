import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag } from 'lucide-react';

export default function HighlightDetailModal({ open, onClose, highlight }) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!highlight) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
            className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-2xl relative z-10 max-h-[90vh] flex flex-col text-left transition-colors duration-300"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 dark:bg-slate-850/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-550 dark:text-slate-400 hover:text-red-500 hover:border-red-500/30 transition-all active:scale-90"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Image */}
            <div className="h-64 sm:h-72 w-full overflow-hidden relative bg-slate-100 dark:bg-slate-950 shrink-0">
              <img
                src={highlight.image}
                alt={highlight.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 flex-1">
              {/* Meta Tags */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brandBlue/5 dark:bg-brandBlue/15 border border-brandBlue/10 dark:border-brandBlue/20 text-brandBlue dark:text-brandSky text-[11px] font-bold uppercase tracking-wider font-headline">
                  <Tag className="w-3 h-3" />
                  {highlight.category || 'General'}
                </span>
                
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-550 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  {highlight.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-headline font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white leading-snug">
                {highlight.title}
              </h3>

              {/* Decorative Separator */}
              <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-brandBlue to-brandSky" />

              {/* Description Body */}
              <p className="text-secondary dark:text-slate-350 text-sm sm:text-base leading-relaxed font-body whitespace-pre-line pt-2">
                {highlight.description}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
