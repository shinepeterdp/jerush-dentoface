import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Clock, MapPin, Sparkles, ArrowRight, X,
  CheckCircle2, Bell, ChevronLeft, ChevronRight, Layers, Award, PartyPopper, BookOpen, Image as ImageIcon, Bookmark
} from 'lucide-react';
import { upcomingEvents as defaultEvents } from '../../data/upcomingEvents';
import { galleryService } from '../../services/galleryService';

// Clean, minimalistic luxury countdown widget
function CountdownTimer({ targetIsoDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetIsoDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(calculateTime);
  }, [targetIsoDate]);

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs sm:max-w-sm">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds }
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white border border-slate-200/90 rounded-2xl p-2 sm:p-2.5 text-center shadow-sm hover:border-brandSky/40 transition-all duration-300 group"
        >
          <span className="block font-headline font-extrabold text-base sm:text-xl text-slate-900 tracking-tight">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="block text-[8px] sm:text-[9.5px] font-extrabold uppercase tracking-widest text-slate-400 mt-0.5">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function UpcomingEventsSection() {
  const navigate = useNavigate();
  const [eventsList, setEventsList] = useState(defaultEvents);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward page turn, -1 = backward page turn
  const [isPaused, setIsPaused] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');

  // Synchronize with Admin Panel Events via galleryService API
  useEffect(() => {
    galleryService.getEvents()
      .then(adminEvents => {
        if (Array.isArray(adminEvents) && adminEvents.length > 0) {
          // Filter out obsolete 2025 entries so 2026 events take precedence
          const validAdminEvents = adminEvents.filter(evt => {
            const titleLower = (evt.title || '').toLowerCase();
            return !titleLower.includes('2k25') && !titleLower.includes('2025');
          });

          if (validAdminEvents.length > 0) {
            // Format admin events to ensure compatible journal fields
            const formattedAdminEvents = validAdminEvents.map(evt => {
              const staticMatch = defaultEvents.find(d => d.id === evt.slug || d.title === evt.title || d.galleryEventId === evt.id);
              return {
                id: evt.slug || `admin-event-${evt.id}`,
                title: evt.title || staticMatch?.title || 'Jerush Special Event 2026',
                tagline: evt.tagline || staticMatch?.tagline || 'Surgical Excellence & Compassionate Healthcare',
                category: evt.category || staticMatch?.category || 'Celebration',
                status: evt.status === 'completed' || staticMatch?.status === 'completed' ? 'completed' : 'upcoming',
                date: evt.date || staticMatch?.date || 'September 2026',
                isoDate: evt.isoDate || staticMatch?.isoDate || '2026-09-05T10:00:00',
                time: evt.time || staticMatch?.time || '10:00 AM IST',
                location: evt.location || staticMatch?.location || 'Jerush Main Campus Auditorium, Thuckalay',
                badge: evt.badge || staticMatch?.badge || (evt.status === 'completed' ? 'Completed Milestone' : 'Upcoming Event'),
                badgeColor: staticMatch?.badgeColor || 'from-brandSky to-cyan-400',
                coverImage: evt.coverImage || staticMatch?.coverImage || '/images/events/jerushaligne-opening-event/jerush-outdoor.webp',
                galleryEventId: evt.id || staticMatch?.galleryEventId,
                photoCount: evt.photoCount || evt.photos?.length || staticMatch?.photoCount || 30,
                description: evt.description || staticMatch?.description || 'Jerush Dentofacial celebration and healthcare event.',
                schedule: evt.schedule || staticMatch?.schedule || [
                  { time: '10:00 AM', activity: 'Inauguration & Welcome Session' },
                  { time: '02:00 PM', activity: 'Clinical & Patient Felicitation' }
                ],
                organizer: evt.organizer || staticMatch?.organizer || 'Jerush Executive Board'
              };
            });

            // Start with authoritative default 2026 events, then append any new admin events
            const merged = [...defaultEvents];
            formattedAdminEvents.forEach(adm => {
              const exists = merged.some(m => m.id === adm.id || m.title.toLowerCase() === adm.title.toLowerCase());
              if (!exists) {
                merged.push(adm);
              }
            });

            setEventsList(merged);
          }
        }
      })
      .catch(err => {
        console.warn("Using default static events for Celebrations Journal:", err);
      });
  }, []);

  const currentEvent = useMemo(() => eventsList[activeIndex] || eventsList[0] || defaultEvents[0], [activeIndex, eventsList]);

  // Auto rotate slides every 7 seconds when not paused
  useEffect(() => {
    if (isPaused || selectedEvent || eventsList.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % eventsList.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, selectedEvent, eventsList]);

  const handleNextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % eventsList.length);
  };

  const handlePrevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + eventsList.length) % eventsList.length);
  };

  const handleTabClick = (idx) => {
    if (idx === activeIndex) return;
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  const handleOpenModal = (eventItem) => {
    setSelectedEvent(eventItem);
    setRsvpSubmitted(false);
    setRsvpName('');
    setRsvpPhone('');
  };

  const handleGoToGalleryAlbum = (eventId) => {
    navigate(`/events?eventId=${eventId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpName || !rsvpPhone) return;
    setRsvpSubmitted(true);
  };

  return (
    <section
      id="jerush-upcoming-events-banner"
      className="w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-slate-50/60 to-white overflow-hidden text-left relative font-body"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative ambient background glow */}
      <div className="absolute -top-32 -right-32 w-[450px] h-[450px] bg-brandSky/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] bg-brandBlue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header & Apple-Style Segmented Tab Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-headline font-bold uppercase tracking-wider text-brandSky mb-3">
              <BookOpen className="w-3.5 h-3.5 text-brandSky" />
              Jerush Celebrations Journal &amp; Milestones
            </span>

            <h2 className="font-headline font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight tracking-tight">
              Events &amp; Celebrations at{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Jerush Dentofacial
              </span>
            </h2>
          </div>

          {/* Apple Segmented Control Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner backdrop-blur-md w-full lg:w-auto">
            {eventsList.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-headline font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${isActive
                      ? 'bg-white text-slate-900 shadow-md shadow-slate-200/80 scale-[1.02]'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
                    }`}
                >
                  {item.id.includes('onam') && <span>🌺</span>}
                  {item.id.includes('anniversary') && <span>👑</span>}
                  {item.id.includes('jerushaligne') && <span>🏢</span>}
                  {item.id.includes('bladbin') && <span>🎂</span>}
                  {!item.id.includes('onam') && !item.id.includes('anniversary') && !item.id.includes('jerushaligne') && !item.id.includes('bladbin') && <span>🎉</span>}
                  <span>{item.title.split(' Celebration')[0]}</span>
                  {item.status === 'completed' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block ml-0.5" title="Completed Event" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* AUTHENTIC PHYSICAL OPEN BOOK CONTAINER (JERUSH SIGNATURE GRADIENT HARDCOVER BORDER) */}
        <div className="bg-gradient-to-r from-brandBlue via-brandSky to-brandBlue p-2.5 sm:p-3.5 rounded-[38px] shadow-[0_25px_70px_rgba(40,83,164,0.25)] relative group overflow-hidden border border-brandSky/40">

          {/* HANGING GOLD SILK BOOKMARK RIBBON FROM TOP CENTER */}
          <div className="hidden lg:flex flex-col items-center absolute top-0 left-[53%] -translate-x-1/2 z-40 w-5 pointer-events-none">
            <div className="w-full h-24 sm:h-28 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 shadow-2xl rounded-b-md border-x border-amber-200/60 flex flex-col justify-end items-center pb-1">
              <Sparkles className="w-3.5 h-3.5 text-slate-955 animate-pulse" />
            </div>
          </div>

          {/* INNER TWO-PAGE OPEN BOOK SPREAD */}
          <div className="bg-[#FCFDFE] rounded-[30px] overflow-hidden flex flex-col lg:flex-row items-stretch relative border border-slate-200/90 shadow-inner">

            {/* CENTER BOOK SPINE CREASE DIVIDER */}
            <div className="hidden lg:block absolute left-[53%] top-0 bottom-0 w-6 -translate-x-1/2 bg-gradient-to-r from-slate-300/40 via-slate-400/60 to-slate-300/40 pointer-events-none z-30 shadow-[inset_0_0_15px_rgba(0,0,0,0.08)] border-x border-slate-300/50" />

            {/* LEFT BOOK PAGE: STATIC JOURNAL CONTENT PAGE */}
            <div className="flex-grow flex items-center p-6 sm:p-8 lg:p-11 xl:p-12 bg-[#FCFDFE] lg:w-[53%] shrink-0 relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentEvent.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full max-w-[540px] mx-auto lg:mx-0 space-y-5 text-left"
                >
                  {/* Category Pill & Page Number Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10.5px] font-headline font-bold uppercase tracking-wider ${currentEvent.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/70'
                          : currentEvent.id.includes('onam')
                            ? 'bg-amber-50 text-amber-700 border border-amber-200/70'
                            : 'bg-sky-50 text-brandBlue border border-sky-200/70'
                        }`}>
                        {currentEvent.status === 'completed' ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <Sparkles className="w-3 h-3" />}
                        {currentEvent.badge}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        {currentEvent.category}
                      </span>
                    </div>

                    {/* Book Page Indicator */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-[10.5px] font-headline font-bold text-slate-600 shadow-inner">
                      <BookOpen className="w-3 h-3 text-brandSky" />
                      <span>Journal Page 0{activeIndex + 1} / 0{eventsList.length}</span>
                    </div>
                  </div>

                  {/* Event Title & Tagline */}
                  <div>
                    <h3 className="font-headline font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight tracking-tight">
                      {currentEvent.title}
                    </h3>
                    <p className="text-brandSky font-headline font-bold text-xs sm:text-sm mt-1.5">
                      {currentEvent.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed font-medium">
                    {currentEvent.description}
                  </p>

                  {/* COUNTDOWN OR COMPLETED MILESTONE SUMMARY BADGE */}
                  <div className="pt-1">
                    {currentEvent.status === 'completed' ? (
                      <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 shadow-sm max-w-md">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 shrink-0">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span className="text-[10px] font-headline font-extrabold uppercase tracking-wider text-emerald-700 block">
                            Milestone Celebrated
                          </span>
                          <span className="text-xs font-bold text-slate-900 block mt-0.5">
                            {currentEvent.photoCount} High-Res Exhibition Photos Published
                          </span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="text-[10px] font-headline font-extrabold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-brandSky" /> Countdown To Event
                        </span>
                        <CountdownTimer targetIsoDate={currentEvent.isoDate} />
                      </>
                    )}
                  </div>

                  {/* Date & Location Strip */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-brandBlue shrink-0" />
                      <span className="font-bold text-slate-900">{currentEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="truncate max-w-[240px]">{currentEvent.location}</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {currentEvent.status === 'completed' ? (
                      <button
                        onClick={() => handleGoToGalleryAlbum(currentEvent.galleryEventId)}
                        className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-headline font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
                      >
                        <ImageIcon className="w-4 h-4" />
                        <span>View Exhibition Album ({currentEvent.photoCount} Photos)</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOpenModal(currentEvent)}
                        className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-brandBlue/15 hover:shadow-brandBlue/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
                      >
                        <span>Event Schedule &amp; RSVP</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}

                    <Link
                      to="/events"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-headline font-bold text-xs sm:text-sm rounded-xl border border-slate-200 transition-all cursor-pointer"
                    >
                      <span>All Event Albums</span>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT BOOK PAGE: MOUNTED PHOTO PAGE WITH 3D PAGE FLIP */}
            <div
              className="w-full lg:w-[47%] shrink-0 relative min-h-[280px] sm:min-h-[340px] lg:min-h-auto bg-[#F4F6F9] p-3 sm:p-4 flex items-center justify-center"
              style={{ perspective: 1400 }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentEvent.id}
                  custom={direction}
                  initial={(dir) => ({
                    rotateY: dir > 0 ? 80 : -80,
                    opacity: 0.2,
                    transformOrigin: 'left center'
                  })}
                  animate={{
                    rotateY: 0,
                    opacity: 1,
                    transformOrigin: 'left center'
                  }}
                  exit={(dir) => ({
                    rotateY: dir > 0 ? -80 : 80,
                    opacity: 0.2,
                    transformOrigin: 'left center'
                  })}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 1, 0.5, 1]
                  }}
                  className="w-full h-full relative overflow-hidden bg-slate-955 rounded-2xl shadow-xl border-4 border-white"
                  style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                >
                  {/* Event Photo Artwork - Clean Unblocked View */}
                  <img
                    src={currentEvent.coverImage}
                    alt={currentEvent.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-103 opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-955/40 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Page Turn Controls (Prev / Next Buttons) */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-955/80 hover:bg-brandBlue text-white shadow-2xl border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-30 backdrop-blur-md"
                title="Turn to previous book page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-955/80 hover:bg-brandBlue text-white shadow-2xl border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-30 backdrop-blur-md"
                title="Turn to next book page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* LUXURIOUS PURE WHITE & MEDICAL NAVY EVENT RSVP MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-body">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
            />

            {/* Modal Card Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-white border border-slate-200/90 rounded-[32px] shadow-[0_30px_90px_rgba(0,0,0,0.35)] overflow-hidden z-10 text-left my-8 text-slate-900"
            >
              {/* Header Cover Banner */}
              <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-900">
                <img
                  src={selectedEvent.coverImage}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover opacity-60 filter blur-[1px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all cursor-pointer z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6 z-10 space-y-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-950 bg-amber-400 shadow-md">
                    <Sparkles className="w-3 h-3 text-slate-955" />
                    {selectedEvent.badge}
                  </span>
                  <h3 className="font-headline font-black text-2xl sm:text-3xl text-white leading-tight">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-cyan-300 text-xs font-semibold">
                    {selectedEvent.tagline}
                  </p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">

                {/* Info Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 bg-sky-50/80 p-4 rounded-2xl border border-sky-100 shadow-sm">
                    <div className="w-9 h-9 rounded-xl bg-brandBlue/10 border border-brandBlue/20 flex items-center justify-center text-brandBlue shrink-0">
                      <Calendar className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-headline font-extrabold uppercase text-slate-400 block tracking-wider">
                        Date &amp; Time
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5">
                        {selectedEvent.date}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                        {selectedEvent.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-amber-50/80 p-4 rounded-2xl border border-amber-100 shadow-sm">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0">
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-headline font-extrabold uppercase text-slate-400 block tracking-wider">
                        Venue
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5 leading-snug">
                        {selectedEvent.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* About Event Description */}
                <div>
                  <h4 className="text-xs font-headline font-extrabold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-brandBlue" /> Event Details
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Event Schedule Timeline */}
                <div>
                  <h4 className="text-xs font-headline font-extrabold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brandSky" /> Program Schedule
                  </h4>
                  <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    {selectedEvent.schedule.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs py-1.5 border-b border-slate-200/70 last:border-0">
                        <span className="font-headline font-extrabold text-brandBlue shrink-0 w-24">
                          {item.time}
                        </span>
                        <span className="text-slate-800 font-semibold">
                          {item.activity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RSVP Attendance Interest */}
                <div className="bg-gradient-to-r from-brandBlue to-brandSky p-5 sm:p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Bell className="w-4 h-4 text-amber-300 animate-bounce" />
                    <h4 className="text-xs font-headline font-extrabold uppercase tracking-wider text-white">
                      Attend / Get Event Updates
                    </h4>
                  </div>
                  <p className="text-xs text-sky-100 mb-4 font-medium">
                    Submit your contact details to express interest and receive official event updates.
                  </p>

                  {rsvpSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-xl bg-white/20 border border-white/40 text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                    >
                      <CheckCircle2 className="w-4.5 h-4.5 text-amber-300 shrink-0" />
                      <span>Thank you! Your event attendance interest has been recorded.</span>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleRsvpSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        required
                        className="px-4 py-2.5 rounded-xl bg-white/95 text-slate-900 placeholder-slate-400 border border-white/60 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors shadow-inner"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={rsvpPhone}
                        onChange={(e) => setRsvpPhone(e.target.value)}
                        required
                        className="px-4 py-2.5 rounded-xl bg-white/95 text-slate-900 placeholder-slate-400 border border-white/60 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors shadow-inner"
                      />
                      <button
                        type="submit"
                        className="py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-headline text-xs uppercase font-extrabold tracking-wider hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-md"
                      >
                        Express Interest
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
