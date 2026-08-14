import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function TagInput({ value = [], onChange, placeholder = 'Type a specialty and press Enter...' }) {
  const [input, setInput] = useState('');
  
  // Safe normalization of value prop (handles null or undefined DB outputs)
  const tags = Array.isArray(value) ? value : [];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed && !tags.includes(trimmed)) {
        onChange([...tags, trimmed]);
      }
      setInput('');
    } else if (e.key === 'Backspace' && input === '' && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const handleBlur = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput('');
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 min-h-[44px] px-3.5 py-2.5 bg-white/50 dark:bg-slate-950/40 border border-slate-250/60 dark:border-slate-800/60 rounded-xl focus-within:border-brandSky dark:focus-within:border-brandSky focus-within:bg-white/80 dark:focus-within:bg-slate-950/85 focus-within:ring-2 focus-within:ring-brandSky/20 transition-all">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-brandBlue/10 to-brandSky/10 dark:from-brandBlue/20 dark:to-brandSky/20 border border-brandBlue/20 dark:border-brandBlue/40 rounded-lg text-xs font-semibold text-brandBlue dark:text-brandSky shadow-sm"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="text-brandBlue/50 dark:text-brandSky/60 hover:text-red-500 dark:hover:text-red-400 transition-colors ml-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="bg-transparent outline-none text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 flex-1 min-w-[120px] py-1"
      />
    </div>
  );
}

