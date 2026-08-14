import React, { useState } from 'react';
import { Save } from 'lucide-react';

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);

  const [hero, setHero] = useState({
    title: 'Precision. Innovation. Confidence.',
    subtitle: "South India's Leading Dental and Cosmetic Care",
    videoUrl: '/videos/jerush-hero-video.mp4'
  });

  const [welcome, setWelcome] = useState({
    message: 'Welcome to Jerush Dentoface — where world-class dental diagnostics and facial aesthetic innovations meet 22+ years of trusted clinical excellence.'
  });

  const [chairman, setChairman] = useState({
    message: 'Our commitment is to deliver premium, ethically-driven healthcare with international standards right here in Tamil Nadu.'
  });

  const [stats, setStats] = useState([
    { label: 'Years of Excellence', value: '25+' },
    { label: 'Smiling Patients', value: '1,00,000+' },
    { label: 'Clinic Locations', value: '4' },
    { label: 'Specialist Doctors', value: '8+' },
  ]);

  const [contact, setContact] = useState({
    email: 'info@jerushdentoface.com',
    mainPhone: '+91 94891 60055',
    workingHours: '9:00 AM - 8:30 PM',
    workingDays: 'Monday - Saturday'
  });

  const [seo, setSeo] = useState({
    siteTitle: 'Jerush | South India\'s Leading Dental and Cosmetic Care',
    metaDescription: 'Jerush Dentoface is a premier dental and cosmetic centre in Tamil Nadu with 22+ years of experience in implants, aligners, laser therapies, and facial aesthetics.',
    ogImage: ''
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputCls = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 outline-none focus:border-brandSky focus:bg-white transition-colors";
  const labelCls = "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline font-extrabold text-xl text-slate-800">Settings</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Configure homepage content, SEO, and contact information</p>
        </div>
        <button onClick={handleSave} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 ${saved ? 'bg-emerald-500 text-white' : 'bg-gradient-to-r from-brandBlue to-brandSky text-white hover:shadow-lg'}`}>
          <Save className="w-3.5 h-3.5" />
          {saved ? 'Saved!' : 'Save All Settings'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hero Settings */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <h3 className="font-headline font-extrabold text-sm text-slate-800 pb-3 border-b border-slate-100">Hero Section</h3>
          <div>
            <label className={labelCls}>Hero Title</label>
            <input value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Hero Subtitle</label>
            <input value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Background Video URL</label>
            <input value={hero.videoUrl} onChange={(e) => setHero({ ...hero, videoUrl: e.target.value })} className={inputCls} />
          </div>
        </div>

        {/* Welcome & Chairman */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <h3 className="font-headline font-extrabold text-sm text-slate-800 pb-3 border-b border-slate-100">Content Sections</h3>
          <div>
            <label className={labelCls}>Welcome Message</label>
            <textarea value={welcome.message} onChange={(e) => setWelcome({ ...welcome, message: e.target.value })} rows={3} className={`${inputCls} resize-y min-h-[80px]`} />
          </div>
          <div>
            <label className={labelCls}>Chairman's Message</label>
            <textarea value={chairman.message} onChange={(e) => setChairman({ ...chairman, message: e.target.value })} rows={3} className={`${inputCls} resize-y min-h-[80px]`} />
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <h3 className="font-headline font-extrabold text-sm text-slate-800 pb-3 border-b border-slate-100">Milestone Statistics</h3>
          {stats.map((stat, idx) => (
            <div key={idx} className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Label</label>
                <input
                  value={stat.label}
                  onChange={(e) => {
                    const updated = [...stats];
                    updated[idx] = { ...updated[idx], label: e.target.value };
                    setStats(updated);
                  }}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Value</label>
                <input
                  value={stat.value}
                  onChange={(e) => {
                    const updated = [...stats];
                    updated[idx] = { ...updated[idx], value: e.target.value };
                    setStats(updated);
                  }}
                  className={inputCls}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <h3 className="font-headline font-extrabold text-sm text-slate-800 pb-3 border-b border-slate-100">Contact Information</h3>
          <div>
            <label className={labelCls}>Email Address</label>
            <input value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Main Phone</label>
            <input value={contact.mainPhone} onChange={(e) => setContact({ ...contact, mainPhone: e.target.value })} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Working Days</label>
              <input value={contact.workingDays} onChange={(e) => setContact({ ...contact, workingDays: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Working Hours</label>
              <input value={contact.workingHours} onChange={(e) => setContact({ ...contact, workingHours: e.target.value })} className={inputCls} />
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <h3 className="font-headline font-extrabold text-sm text-slate-800 pb-3 border-b border-slate-100">SEO & Meta</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Site Title</label>
              <input value={seo.siteTitle} onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>OG Image URL</label>
              <input value={seo.ogImage} onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })} placeholder="https://..." className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Meta Description</label>
            <textarea value={seo.metaDescription} onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })} rows={2} className={`${inputCls} resize-y`} />
          </div>
        </div>
      </div>
    </div>
  );
}
