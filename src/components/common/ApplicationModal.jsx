import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Upload, CheckCircle2, Briefcase, User, Mail, Phone, FileText } from 'lucide-react';
import { careerService } from '../../services/careerService';


export default function ApplicationModal({ open, onClose, defaultPosition = '' }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: defaultPosition || '',
    experience: '',
    resumeName: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Enable Escape key to close modal
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    // Restrict input to digits only, maximum 10 digits
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setForm(prev => ({ ...prev, phone: digitsOnly }));
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm(prev => ({ 
          ...prev, 
          resumeName: file.name,
          resumeData: event.target.result // Base64 representation of file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await careerService.submitApplication(form);
      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting job application:", err);
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm({ name: '', email: '', phone: '', position: defaultPosition || '', experience: '', resumeName: '', resumeData: '', notes: '' });
    onClose();
  };

  if (!open) return null;

  const inputCls = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-brandSky focus:bg-white focus:ring-2 focus:ring-brandSky/20 transition-all font-medium";
  const labelCls = "text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 block font-headline";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative max-w-lg w-full max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden z-10 text-left border border-slate-100 my-auto"
        >
          {/* Header */}
          <div className="px-5 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-slate-900 via-[#16274D] to-brandBlue text-white flex items-center justify-between shrink-0">
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-brandSky font-headline block mb-0.5">
                JERUSH CAREERS
              </span>
              <h3 className="font-headline font-black text-base sm:text-lg text-white">
                Submit Job Application
              </h3>
            </div>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {submitted ? (
            <div className="p-6 sm:p-8 text-center space-y-4 overflow-y-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-headline font-black text-xl text-slate-900">Application Received!</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Thank you for applying to Jerush Hospitals. Our HR team will review your qualifications and contact you if your profile matches our requirements.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Ananya Sharma"
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g. ananya@domain.com"
                    required
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Phone Number (10 Digits)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handlePhoneChange}
                    placeholder="e.g. 9876543210"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    title="Please enter a 10-digit phone number"
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Position / Specialty</label>
                  <input
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    placeholder="e.g. Dental Surgeon"
                    required
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Years of Experience</label>
                <input
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="e.g. 3 Years clinical experience"
                  required
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Upload Resume / CV</label>
                <label className="flex items-center justify-between border-2 border-dashed border-slate-200 rounded-xl p-3 cursor-pointer hover:border-brandSky transition-all bg-slate-50">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-brandSky" />
                    <span className="text-xs font-semibold text-slate-700">
                      {form.resumeName || 'Select PDF or DOC File'}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-brandBlue uppercase tracking-wider">Browse</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className={labelCls}>Additional Notes / Cover Letter Summary</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Briefly introduce yourself and preferred branch..."
                  rows={3}
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  Submit Application
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
