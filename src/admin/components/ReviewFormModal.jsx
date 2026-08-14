import React from 'react';
import { Undo, Redo } from 'lucide-react';
import FormModal from './FormModal';
import useUndoRedo from '../hooks/useUndoRedo';

const EMPTY = { name: '', location: '', rating: 5, treatment: '', image: '', text: '', type: 'text', video_url: '', video_thumbnail: '' };

export default function ReviewFormModal({ open, onClose, onSave, review }) {
  const {
    state: form,
    setState: setForm,
    undo,
    redo,
    canUndo,
    canRedo,
    reset
  } = useUndoRedo(review || EMPTY);

  React.useEffect(() => {
    reset(review || EMPTY);
  }, [review, open, reset]);

  // Handle keyboard shortcuts for Undo/Redo
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      const isZ = e.key.toLowerCase() === 'z';
      const isY = e.key.toLowerCase() === 'y';
      
      if ((e.ctrlKey || e.metaKey) && isZ && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (isY || (e.shiftKey && isZ))) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, undo, redo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'rating' ? parseInt(value) : value }, false); // false = debounced
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  const inputCls = "w-full px-4 py-2.5 bg-white/40 dark:bg-slate-900/35 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-brandSky dark:focus:border-brandSky focus:bg-white/80 dark:focus:bg-slate-900/75 focus:ring-2 focus:ring-brandSky/15 transition-all shadow-sm";
  const labelCls = "text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block";

  return (
    <FormModal open={open} onClose={onClose} title={review ? 'Edit Review' : 'Add New Review'} subtitle="Manage patient testimonials">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelCls}>Patient Name</label>
            <input name="name" value={form.name || ''} onChange={handleChange} placeholder="Full name or title" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Location</label>
            <input name="location" value={form.location || ''} onChange={handleChange} placeholder="City / Country" className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelCls}>Treatment</label>
            <input name="treatment" value={form.treatment || ''} onChange={handleChange} placeholder="e.g. Dental Implant Treatment" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Rating</label>
            <div className="flex items-center gap-1.5 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm({ ...form, rating: star }, true)} // true = immediate
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all font-bold ${
                    star <= form.rating 
                      ? 'bg-amber-500/10 dark:bg-amber-500/15 text-amber-500 border border-amber-500/30' 
                      : 'bg-white/40 dark:bg-slate-900/35 text-slate-350 dark:text-slate-650 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelCls}>Review Type</label>
            <select name="type" value={form.type || 'text'} onChange={handleChange} className={inputCls}>
              <option value="text">Text Testimonial</option>
              <option value="video">YouTube Video</option>
              <option value="instagram">Instagram Reel</option>
            </select>
          </div>
          <div>
            {form.type === 'text' ? (
              <>
                <label className={labelCls}>Patient Image URL</label>
                <input name="image" value={form.image || ''} onChange={handleChange} placeholder="/images/testimonials/..." className={inputCls} />
              </>
            ) : (
              <>
                <label className={labelCls}>Video Thumbnail URL</label>
                <input name="video_thumbnail" value={form.video_thumbnail || ''} onChange={handleChange} placeholder="/images/testimonials/..." className={inputCls} />
              </>
            )}
          </div>
        </div>

        {form.type !== 'text' && (
          <div>
            <label className={labelCls}>Video Link / URL</label>
            <input name="video_url" value={form.video_url || ''} onChange={handleChange} placeholder="e.g. https://www.youtube.com/watch?v=... or https://www.instagram.com/reel/..." className={inputCls} />
          </div>
        )}

        <div>
          <label className={labelCls}>Review Text</label>
          <textarea name="text" value={form.text || ''} onChange={handleChange} placeholder="Patient's testimonial text..." rows={4} required className={`${inputCls} resize-y min-h-[100px]`} />
        </div>

        {/* Actions & Undo/Redo */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={undo}
              disabled={!canUndo}
              className={`px-3.5 py-2 rounded-xl border border-slate-200/60 dark:border-slate-800/80 text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                canUndo 
                  ? 'bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer active:scale-95' 
                  : 'bg-slate-50 dark:bg-slate-950/20 text-slate-300 dark:text-slate-700 cursor-not-allowed border-dashed'
              }`}
              title="Undo last edit (Ctrl+Z)"
            >
              <Undo className="w-3.5 h-3.5" />
              Undo
            </button>
            <button
              type="button"
              onClick={redo}
              disabled={!canRedo}
              className={`px-3.5 py-2 rounded-xl border border-slate-200/60 dark:border-slate-800/80 text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                canRedo 
                  ? 'bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer active:scale-95' 
                  : 'bg-slate-50 dark:bg-slate-950/20 text-slate-300 dark:text-slate-700 cursor-not-allowed border-dashed'
              }`}
              title="Redo (Ctrl+Y)"
            >
              <Redo className="w-3.5 h-3.5" />
              Redo
            </button>
          </div>

          <div className="flex gap-3 justify-end">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-750 dark:hover:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95">
              {review ? 'Save Changes' : 'Add Review'}
            </button>
          </div>
        </div>
      </form>
    </FormModal>
  );
}
