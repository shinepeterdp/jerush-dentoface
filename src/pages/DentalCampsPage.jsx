import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, Clock, MapPin, Sparkles, Search,
  Phone, HeartHandshake, X, ChevronRight,
  ChevronLeft, Camera, Eye, Filter, Layers, Zap, Smile, Activity,
  Images
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import { campsService, CAMPS_UPDATE_EVENT } from '../services/campsService';

export default function DentalCampsPage() {
  const navigate = useNavigate();
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Camp Photo Gallery Lightbox State
  const [selectedCampForGallery, setSelectedCampForGallery] = useState(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const loadCamps = async () => {
    try {
      const data = await campsService.getCamps();
      setCamps(data);
    } catch (err) {
      console.error('Error fetching camps:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCamps();
    const handleUpdate = () => loadCamps();
    window.addEventListener(CAMPS_UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(CAMPS_UPDATE_EVENT, handleUpdate);
  }, []);

  const stats = campsService.getStats();

  const categoriesList = [
    { id: 'all', label: 'All Speciality Camps', icon: Sparkles },
    { id: 'dental', label: 'Dental Camps', icon: Smile },
    { id: 'aligner', label: 'Aligner Camps', icon: Layers },
    { id: 'skin', label: 'Skin & Laser Camps', icon: Sparkles },
    { id: 'hair', label: 'Hair & Scalp Camps', icon: Zap },
    { id: 'fat-reduction', label: 'Body Fat Reduction', icon: Activity },
    { id: 'social', label: 'Social & Rural Outreach', icon: HeartHandshake }
  ];

  const filteredCamps = camps.filter((camp) => {
    const matchesSearch =
      camp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (camp.tagline && camp.tagline.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    const matchesCategory = activeCategory === 'all' || camp.category === activeCategory;
    return matchesCategory;
  });

  const getCategoryCount = (catId) => {
    if (catId === 'all') return camps.length;
    return camps.filter((c) => c.category === catId).length;
  };

  const openGalleryModal = (camp, initialGalleryIdx = 0) => {
    setSelectedCampForGallery(camp);
    setActiveGalleryIndex(initialGalleryIdx);
  };

  const closeGalleryModal = () => {
    setSelectedCampForGallery(null);
    setActiveGalleryIndex(0);
  };

  return (
    <div className="w-full bg-[#f8fbfe] font-body text-left relative overflow-hidden">
      <PageBreadcrumbHero
        title="Speciality Health & Community Outreach Camps"
        breadcrumbs={[
          { label: 'Smile Stories', path: '/smile-stories' },
          { label: 'Speciality & Outreach Camps', active: true }
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-12 space-y-8">
        {/* Section Header & Search Box */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-blue-100">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-brandBlue font-headline font-bold text-[11px] uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5" />
              Outreach & Speciality Care
            </div>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
              Explore Our{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Speciality Camps & Photos
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Filter by camp category below to view photos and highlights from our specialized dental, aligner, laser skin, hair restoration, and community outreach camps.
            </p>
          </div>

          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brandBlue/60" />
            <input
              type="text"
              placeholder="Search camp or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-blue-200 text-slate-800 rounded-2xl placeholder-slate-400 focus:outline-none focus:border-brandSky transition-all text-sm shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* ─── Impact Statistics Section (Positioned directly above Select Camp Category) ─── */}
        <div className="bg-gradient-to-r from-blue-900 via-brandBlue to-[#0e4e88] rounded-3xl p-6 sm:p-8 shadow-xl text-white grid grid-cols-2 lg:grid-cols-4 gap-6 text-center border border-blue-700/50">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1 relative">
              {idx !== 0 && (
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/20" />
              )}
              <div className="font-headline font-black text-3xl sm:text-4xl text-cyan-300">
                {stat.value}
              </div>
              <div className="font-headline font-bold text-white text-sm">{stat.label}</div>
              <div className="text-[11px] text-blue-100/70 font-medium">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* ─── Category Filter Navigation Bar ─── */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-headline flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-brandBlue" />
              Select Camp Category:
            </span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {categoriesList.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const count = getCategoryCount(cat.id);

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-headline font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2.5 cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white shadow-md shadow-brandBlue/20 border-transparent scale-102'
                      : 'bg-white text-slate-700 hover:text-brandBlue hover:bg-blue-50/70 border-blue-100 shadow-xs'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-brandSky'}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-white/25 text-white' : 'bg-blue-50 text-brandBlue'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="py-24 flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredCamps.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-blue-100 p-8 space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-blue-50 text-brandBlue rounded-full flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="font-headline font-bold text-xl text-slate-900">No Camps Found</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              No camps match this specific category. Try switching back to "All Speciality Camps".
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-brandBlue text-white font-headline font-bold text-xs uppercase tracking-wider hover:bg-brandBlue/90 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Reset Category
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCamps.map((camp) => {
              const gallery = camp.galleryImages && camp.galleryImages.length > 0 ? camp.galleryImages : [camp.coverImage];

              return (
                <div
                  key={camp.id}
                  className="bg-gradient-to-b from-[#f0f6fc] to-[#e4f0fa] rounded-3xl border-2 border-blue-200/90 shadow-lg hover:shadow-2xl hover:border-brandBlue transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div
                    onClick={() => openGalleryModal(camp, 0)}
                    className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-900 cursor-pointer"
                  >
                    <img
                      src={camp.coverImage}
                      alt={camp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = '/images/events/medical-camp/free-community-medical-camp-group-photo.webp';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 rounded-xl bg-blue-900/90 backdrop-blur-md text-cyan-300 font-headline font-extrabold text-[11px] uppercase tracking-wider shadow-md border border-cyan-400/30 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                        {camp.campType}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md text-white font-headline font-bold text-[11px] shadow-md border border-white/20 flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-brandSky" />
                        <span>{gallery.length} Photos</span>
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-brandBlue text-white px-3.5 py-1.5 rounded-xl text-xs font-bold font-headline flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-4 h-4" />
                      Click to View Photos
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div>
                        <h3
                          onClick={() => openGalleryModal(camp, 0)}
                          className="font-headline font-black text-xl sm:text-2xl text-slate-900 leading-tight hover:text-brandBlue transition-colors cursor-pointer"
                        >
                          {camp.title}
                        </h3>
                        {camp.tagline && (
                          <p className="text-brandBlue font-medium text-xs sm:text-sm mt-1 leading-snug">
                            {camp.tagline}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-3 border-y border-blue-200/70 text-xs bg-white/60 rounded-2xl px-4">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Calendar className="w-4 h-4 text-brandBlue shrink-0" />
                          <span className="font-bold">{camp.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <Clock className="w-4 h-4 text-brandSky shrink-0" />
                          <span>{camp.time}</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-700 sm:col-span-2">
                          <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span className="font-medium text-slate-800">{camp.location}</span>
                        </div>
                      </div>

                      {gallery.length > 1 && (
                        <div className="space-y-2 pt-1">
                          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-headline flex items-center justify-between">
                            <span>Camp Photos Preview:</span>
                            <span className="text-brandBlue text-[11px] font-semibold">Click thumbnail to view</span>
                          </div>
                          <div className="flex items-center gap-2.5 overflow-x-auto">
                            {gallery.slice(0, 4).map((imgUrl, gIdx) => (
                              <button
                                key={gIdx}
                                onClick={() => openGalleryModal(camp, gIdx)}
                                className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 border-white shadow-sm hover:border-brandBlue hover:scale-105 transition-all cursor-pointer group/thumb"
                              >
                                <img
                                  src={imgUrl}
                                  alt={`Camp Photo ${gIdx + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.src = '/images/events/medical-camp/free-community-medical-camp-group-photo.webp';
                                  }}
                                />
                                {gIdx === 3 && gallery.length > 4 && (
                                  <div className="absolute inset-0 bg-brandBlue/80 text-white text-xs font-black flex items-center justify-center">
                                    +{gallery.length - 4}
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 flex items-center gap-3 border-t border-blue-200/80 mt-2">
                      <button
                        onClick={() => openGalleryModal(camp, 0)}
                        className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md shadow-brandBlue/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Images className="w-4 h-4" />
                        View Camp Photos ({gallery.length})
                      </button>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(camp.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-4 rounded-xl bg-white border border-blue-200 text-slate-700 hover:text-rose-600 hover:border-rose-300 font-headline font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
                        title="View Location on Google Maps"
                      >
                        <MapPin className="w-4 h-4 text-rose-500" />
                        <span>Map</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {selectedCampForGallery && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 text-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-blue-500/30 animate-in fade-in zoom-in-95 duration-200 relative flex flex-col">
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md z-20 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-headline font-bold uppercase tracking-wider bg-brandSky/20 text-cyan-300 border border-cyan-400/30">
                  {selectedCampForGallery.campType}
                </span>
                <h3 className="font-headline font-black text-lg sm:text-xl text-white pt-1">
                  {selectedCampForGallery.title}
                </h3>
              </div>
              <button
                onClick={closeGalleryModal}
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedCampForGallery.galleryImages[activeGalleryIndex] || selectedCampForGallery.coverImage}
                  alt={`${selectedCampForGallery.title} Photo ${activeGalleryIndex + 1}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = '/images/events/medical-camp/free-community-medical-camp-group-photo.webp';
                  }}
                />
                {selectedCampForGallery.galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveGalleryIndex(
                          (activeGalleryIndex - 1 + selectedCampForGallery.galleryImages.length) %
                            selectedCampForGallery.galleryImages.length
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 text-white hover:bg-brandBlue flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer border border-white/20"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveGalleryIndex(
                          (activeGalleryIndex + 1) % selectedCampForGallery.galleryImages.length
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 text-white hover:bg-brandBlue flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer border border-white/20"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-bold font-headline border border-white/10">
                  Photo {activeGalleryIndex + 1} of {selectedCampForGallery.galleryImages.length}
                </div>
              </div>

              {selectedCampForGallery.galleryImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {selectedCampForGallery.galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        activeGalleryIndex === idx
                          ? 'border-cyan-400 ring-2 ring-cyan-400/40 scale-105'
                          : 'border-slate-700 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/images/events/medical-camp/free-community-medical-camp-group-photo.webp';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Camp Venue & Timing Details Strip */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-300 shrink-0" />
                  <span className="font-bold text-white">{selectedCampForGallery.date}</span>
                  <span className="text-slate-500">•</span>
                  <span>{selectedCampForGallery.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{selectedCampForGallery.location}</span>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={closeGalleryModal}
                  className="px-6 py-2.5 rounded-xl bg-brandBlue text-white font-headline font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
                >
                  Close Photo Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Doctor CTA Section (Custom Rules Compliant) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 pt-8">
        <div className="bg-gradient-to-r from-brandBlue to-brandSky rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-8 items-stretch">
            {/* Left side: Doctor Cutout Image */}
            <div className="relative flex items-end justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 bg-black/5 min-h-[320px] lg:min-h-0 pt-8 lg:pt-0">
              <img
                src="/images/doctors/dr-binila-portrait.webp"
                alt="DR. C. BINILA BLADBIN - Jerush Dentofacial"
                className="h-[340px] lg:h-[400px] w-auto object-contain object-bottom transition-transform duration-500 hover:scale-102"
                onError={(e) => {
                  e.target.src = '/images/doctors/dr-binila-portrait.webp';
                }}
              />
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm border border-white/10 px-3.5 py-2 rounded-xl text-left shadow-lg">
                <p className="text-[10px] font-bold text-brandSky uppercase tracking-wider">Director & Oral Surgeon</p>
                <p className="text-xs font-headline font-black text-white">DR. C. BINILA BLADBIN</p>
              </div>
            </div>

            {/* Right side: CTA details */}
            <div className="p-8 sm:p-12 flex flex-col justify-center text-left space-y-6">
              <h2 className="font-headline font-black text-2xl sm:text-3xl relative z-10 leading-tight">
                Need Advanced Clinical Care Beyond Outreach Camps?
              </h2>
              <p className="text-white/80 text-sm sm:text-base max-w-xl leading-relaxed relative z-10">
                Consult with our senior dental and maxillofacial consultants at our state-of-the-art super-speciality dental hospital in Thuckalay.
              </p>
              <div className="flex flex-wrap gap-4 relative z-10">
                <button
                  onClick={() => {
                    navigate('/contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-brandBlue font-headline font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md hover:bg-slate-50 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Book Hospital Appointment
                </button>
                <a
                  href="tel:+919489160055"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-white/40 text-white font-headline font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-white/10 hover:border-white transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call +91 94891 60055
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
