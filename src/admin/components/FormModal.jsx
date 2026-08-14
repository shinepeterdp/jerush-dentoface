import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function FormModal({ open, onClose, title, subtitle, children, maxWidth = 'max-w-2xl' }) {
  // Prevent body scroll and close on Escape key when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';

      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/45 backdrop-blur-md z-[60]"
            onClick={onClose}
          />

          {/* Centered Wrapper */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className={`${maxWidth} w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18)] border border-white/50 dark:border-slate-800/80 flex flex-col max-h-[90vh] overflow-hidden pointer-events-auto`}
            >
              <div className="flex items-center justify-between px-8 py-5 bg-gradient-to-r from-brandBlue/[0.04] to-brandSky/[0.04] dark:from-brandBlue/[0.08] dark:to-brandSky/[0.08] border-b border-slate-100 dark:border-slate-800/40 shrink-0">
                <div>
                  <h3 className="font-headline font-extrabold text-lg text-slate-800 dark:text-white leading-snug">{title}</h3>
                  {subtitle && <p className="text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5">{subtitle}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors -mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body (scrollable) */}
              <div className="flex-1 overflow-y-auto px-8 py-7 bg-white/40 dark:bg-slate-900/40">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

