import React from 'react';
import { Undo, Redo } from 'lucide-react';
import FormModal from './FormModal';
import useUndoRedo from '../hooks/useUndoRedo';

const EMPTY = { title: '', date: '', category: 'General', image: '', description: '', status: 'published' };

export default function HighlightFormModal({ open, onClose, onSave, highlight }) {
  const {
    state: form,
    setState: setForm,
    undo,
    redo,
    canUndo,
    canRedo,
    reset
  } = useUndoRedo(highlight || EMPTY);

  React.useEffect(() => {
    reset(highlight || EMPTY);
  }, [highlight, open, reset]);

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
    setForm({ ...form, [name]: value }, false); // false = debounced
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  const inputCls = "w-full px-4 py-2.5 bg-white/40 dark:bg-slate-900/35 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-brandSky dark:focus:border-brandSky focus:bg-white/80 dark:focus:bg-slate-900/75 focus:ring-2 focus:ring-brandSky/15 transition-all shadow-sm";
  const labelCls = "text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block";

  return (
    <FormModal open={open} onClose={onClose} title={highlight ? 'Edit Spotlight Event' : 'Add Spotlight Event'} subtitle="Manage clinic highlights & events">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelCls}>Event/Highlight Title</label>
            <input name="title" value={form.title || ''} onChange={handleChange} placeholder="e.g. Advanced Aligner Lab Launched" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Date</label>
            <input name="date" value={form.date || ''} onChange={handleChange} placeholder="e.g. October 12, 2024" required className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelCls}>Category</label>
            <input name="category" value={form.category || ''} onChange={handleChange} placeholder="e.g. Milestone, Technology, New Service" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Image URL</label>
            <input name="image" value={form.image || ''} onChange={handleChange} placeholder="e.g. /images/jerush-banner1.webp" required className={inputCls} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Status</label>
          <select name="status" value={form.status || 'published'} onChange={handleChange} className={inputCls}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>Full Description</label>
          <textarea name="description" value={form.description || ''} onChange={handleChange} placeholder="Detailed text for the highlight..." rows={5} required className="w-full px-4 py-2.5 bg-white/40 dark:bg-slate-900/35 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-brandSky dark:focus:border-brandSky focus:bg-white/80 dark:focus:bg-slate-900/75 focus:ring-2 focus:ring-brandSky/15 transition-all shadow-sm resize-none" />
        </div>

        {/* Undo/Redo Buttons & Submit */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-5">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={!canUndo}
              onClick={undo}
              className="p-2 rounded-lg text-slate-450 dark:text-slate-500 hover:text-brandBlue dark:hover:text-brandSky hover:bg-slate-50 dark:hover:bg-slate-900/50 disabled:opacity-40 disabled:pointer-events-none transition-all"
              title="Undo"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={!canRedo}
              onClick={redo}
              className="p-2 rounded-lg text-slate-450 dark:text-slate-500 hover:text-brandBlue dark:hover:text-brandSky hover:bg-slate-50 dark:hover:bg-slate-900/50 disabled:opacity-40 disabled:pointer-events-none transition-all"
              title="Redo"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-550 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors uppercase tracking-wider">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brandBlue to-brandSky text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 uppercase tracking-wider">
              Save changes
            </button>
          </div>
        </div>
      </form>
    </FormModal>
  );
}
