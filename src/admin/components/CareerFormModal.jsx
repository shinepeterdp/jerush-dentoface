import React from 'react';
import { Undo, Redo } from 'lucide-react';
import FormModal from './FormModal';
import TagInput from './TagInput';
import useUndoRedo from '../hooks/useUndoRedo';

const EMPTY_CAREER = {
  title: '',
  department: '',
  location: '',
  type: 'Full-Time',
  experience: '',
  description: '',
  requirements: [],
  image: ''
};

const DEPARTMENTS = [
  'Dental Services',
  'Cosmetic & Laser',
  'Administration',
  'In-House Dental Lab',
  'Clinical Support'
];

export default function CareerFormModal({ open, onClose, onSave, career }) {
  const {
    state: form,
    setState: setForm,
    undo,
    redo,
    canUndo,
    canRedo,
    reset
  } = useUndoRedo(career || EMPTY_CAREER);

  const [imageTab, setImageTab] = React.useState('upload'); // 'upload' | 'url'

  React.useEffect(() => {
    reset(career || EMPTY_CAREER);
    if (career && career.image && (career.image.startsWith('http') || career.image.startsWith('/images'))) {
      setImageTab('url');
    } else {
      setImageTab('upload');
    }
  }, [career, open, reset]);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 600;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          setForm({ ...form, image: compressed }, true);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }, false); // false = debounced
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  const inputCls = "w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 outline-none focus:border-brandSky dark:focus:border-brandSky focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-brandSky/20 transition-all shadow-sm font-medium";
  const labelCls = "text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5 block font-headline";
  const optionCls = "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium py-1";

  return (
    <FormModal 
      open={open} 
      onClose={onClose} 
      title={career ? 'Edit Position' : 'Add New Position'} 
      subtitle="Fill in the job opening details"
    >
      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelCls}>Job Title</label>
            <input 
              name="title" 
              value={form.title || ''} 
              onChange={handleChange} 
              placeholder="e.g. Dental Surgeon" 
              required 
              className={inputCls} 
            />
          </div>
          <div>
            <label className={labelCls}>Department</label>
            <select 
              name="department" 
              value={form.department || ''} 
              onChange={handleChange} 
              required 
              className={inputCls}
            >
              <option value="" className={optionCls}>Select Department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept} className={optionCls}>{dept}</option>
              ))}
              <option value="Other" className={optionCls}>Other</option>
            </select>
            {form.department === 'Other' && (
              <input 
                name="customDepartment" 
                placeholder="Enter Department Name" 
                onChange={(e) => setForm({ ...form, department: e.target.value }, true)} 
                required 
                className={`${inputCls} mt-2`} 
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="sm:col-span-2">
            <label className={labelCls}>Location</label>
            <input 
              name="location" 
              value={form.location || ''} 
              onChange={handleChange} 
              placeholder="e.g. Thuckalay, KK District" 
              required 
              className={inputCls} 
            />
          </div>
          <div>
            <label className={labelCls}>Job Type</label>
            <select 
              name="type" 
              value={form.type || 'Full-Time'} 
              onChange={handleChange} 
              required 
              className={inputCls}
            >
              <option value="Full-Time" className={optionCls}>Full-Time</option>
              <option value="Part-Time" className={optionCls}>Part-Time</option>
              <option value="Contract" className={optionCls}>Contract</option>
              <option value="Locum" className={optionCls}>Locum</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>Experience Required</label>
          <input 
            name="experience" 
            value={form.experience || ''} 
            onChange={handleChange} 
            placeholder="e.g. 2+ Years" 
            required 
            className={inputCls} 
          />
        </div>

        {/* Job Photo / Illustration */}
        <div className="grid grid-cols-1 sm:grid-cols-[1.6fr_1fr] gap-6 items-start">
          <div>
            <label className={labelCls}>Job Card Image / Illustration</label>
            
            {/* High-contrast Segmented Tab Switcher */}
            <div className="flex gap-1.5 p-1 bg-slate-200/80 dark:bg-slate-900 rounded-xl mb-3 border border-slate-300/80 dark:border-slate-750 w-fit">
              <button
                type="button"
                onClick={() => setImageTab('upload')}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  imageTab === 'upload'
                    ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setImageTab('url')}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  imageTab === 'url'
                    ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Paste URL
              </button>
            </div>

            {imageTab === 'upload' ? (
              <div className="space-y-3">
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-5 cursor-pointer hover:border-brandSky dark:hover:border-brandSky transition-all bg-slate-50/60 dark:bg-slate-900/60 group">
                  <svg className="w-6 h-6 text-brandSky mb-1.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                  </svg>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Select Image File</span>
                  <span className="text-[9px] font-medium text-slate-400 mt-0.5">PNG, JPG, WEBP formats</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <input 
                name="image" 
                value={form.image || ''} 
                onChange={handleChange} 
                className={inputCls} 
                placeholder="e.g. https://domain.com/path/to/image.jpg" 
              />
            )}
          </div>

          <div>
            <label className={labelCls}>Image Preview</label>
            <div className="flex items-center justify-center border border-slate-200 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-900 rounded-2xl aspect-[4/3] w-full overflow-hidden shrink-0 shadow-inner">
              {form.image ? (
                <img src={form.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                  <svg className="w-8 h-8 mb-1 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">No Image</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className={labelCls}>Description</label>
          <textarea 
            name="description" 
            value={form.description || ''} 
            onChange={handleChange} 
            placeholder="Brief description of the role and responsibilities..." 
            rows={3} 
            required
            className={`${inputCls} resize-y min-h-[80px]`} 
          />
        </div>

        <div>
          <label className={labelCls}>Requirements / Key Qualifications</label>
          <TagInput 
            value={form.requirements} 
            onChange={(tags) => setForm({ ...form, requirements: tags }, true)} // true = immediate
            placeholder="Type a requirement and press Enter" 
          />
        </div>

        {/* Actions & Undo/Redo */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={undo}
              disabled={!canUndo}
              className={`px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-750 text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                canUndo 
                  ? 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer active:scale-95 shadow-xs' 
                  : 'bg-slate-100/50 dark:bg-slate-950/40 text-slate-350 dark:text-slate-650 cursor-not-allowed border-dashed'
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
              className={`px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-750 text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                canRedo 
                  ? 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer active:scale-95 shadow-xs' 
                  : 'bg-slate-100/50 dark:bg-slate-950/40 text-slate-350 dark:text-slate-650 cursor-not-allowed border-dashed'
              }`}
              title="Redo (Ctrl+Y)"
            >
              <Redo className="w-3.5 h-3.5" />
              Redo
            </button>
          </div>

          <div className="flex gap-3 justify-end">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              {career ? 'Save Changes' : 'Add Position'}
            </button>
          </div>
        </div>
      </form>
    </FormModal>
  );
}
