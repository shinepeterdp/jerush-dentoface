import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Clock, MapPin, Sparkles, ArrowRight, X,
  CheckCircle2, Bell, ChevronLeft, ChevronRight, Layers, Award, PartyPopper, BookOpen, Image as ImageIcon, Bookmark
} from 'lucide-react';
import { upcomingEvents as defaultEvents } from '../../data/upcomingEvents';
import { galleryService } from '../../services/galleryService';

// Premium luxury countdown widget with live pulse & responsive flip-card styling
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

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINS', value: timeLeft.minutes },
    { label: 'SECS', value: timeLeft.seconds }
  ];

  return (
    <div className="w-full max-w-full sm:max-w-md bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-blue-800/60 rounded-2xl p-2.5 sm:p-4 shadow-xl shadow-blue-950/25">
      {/* Live Badge & Section Title Header */}
      <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3 pb-1.5 sm:pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-cyan-400"></span>
          </span>
          <span className="text-[10px] sm:text-[11px] font-headline font-extrabold uppercase tracking-wider sm:tracking-widest text-cyan-300">
            Live Event Countdown
          </span>
        </div>
        <Clock className="w-3.5 h-3.5 text-cyan-400/70 shrink-0" />
      </div>

      {/* 4 Digit Unit Cards Container */}
      <div className="flex items-start justify-between gap-1 sm:gap-2.5">
        {units.map((item, i) => (
          <React.Fragment key={i}>
            <div className="flex-1 min-w-0 group relative flex flex-col items-center">
              {/* Digit Box */}
              <div className="w-full h-12 sm:h-15 rounded-xl bg-gradient-to-b from-[#111c30] via-[#0f284e] to-[#0b172a] border border-cyan-500/30 shadow-inner shadow-black/60 flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:border-cyan-400 group-hover:scale-[1.02]">
                {/* Top Glossy Highlight */}
                <div className="absolute top-0 inset-x-0 h-1/2 bg-white/[0.07] border-b border-black/40 pointer-events-none" />

                {/* Flip Divider Line */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-slate-950 shadow-[0_1px_0_rgba(255,255,255,0.1)] z-10" />

                {/* Digit Display */}
                <span className="relative z-10 font-headline font-black text-xl sm:text-2xl lg:text-[26px] text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-300 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {String(item.value).padStart(2, '0')}
                </span>
              </div>

              {/* Unit Tag Below Box */}
              <span className="mt-1.5 text-[8.5px] sm:text-[10px] font-headline font-black tracking-wider sm:tracking-widest text-cyan-300 uppercase px-1 sm:px-1.5 py-0.5 bg-cyan-950/90 rounded-md border border-cyan-500/30 w-full text-center truncate shadow-sm">
                {item.label}
              </span>
            </div>

            {/* Glowing Colon Separator */}
            {i < units.length - 1 && (
              <div className="flex flex-col gap-1 items-center justify-center h-12 sm:h-15 text-cyan-400/80 font-bold animate-pulse shrink-0 px-0.5">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// Typewriter Writing Effect Component for Title & Tagline
function TypewriterText({ text, speed = 25, className = "", cursorColor = "bg-brandBlue" }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    let index = 0;

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className="inline">
      <span className={className}>{displayedText}</span>
      {isTyping && (
        <span className={`inline-block w-[3px] h-[0.8em] ${cursorColor} ml-1 animate-pulse align-middle rounded-full shadow-xs`} />
      )}
    </span>
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
          // Merge admin photo counts & album IDs into standard curated events without creating duplicate tabs
          const updated = defaultEvents.map(evt => {
            const match = adminEvents.find(adm => {
              const admTitle = (adm.title || '').toLowerCase();
              const evtTitle = evt.title.toLowerCase();
              return adm.id === evt.galleryEventId || admTitle.includes('onam') && evt.id.includes('onam') ||
                admTitle.includes('anniversary') && evt.id.includes('anniversary') ||
                admTitle.includes('jerushaligne') && evt.id.includes('jerushaligne') ||
                admTitle.includes('bladbin') && evt.id.includes('bladbin');
            });
            if (match) {
              return {
                ...evt,
                photoCount: match.photos?.length || match.photo_count || evt.photoCount,
                galleryEventId: match.id || evt.galleryEventId,
              };
            }
            return evt;
          });
          setEventsList(updated);
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

      <div className="max-w-[1480px] xl:max-w-[1640px] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">

        {/* Section Header & Apple-Style Segmented Tab Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl 2xl:max-w-3xl text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-brandBlue/5 border border-brandBlue/15 rounded-full text-[11px] xl:text-xs font-headline font-bold uppercase tracking-wider text-brandBlue mb-3">
              <BookOpen className="w-3.5 h-3.5 text-brandSky" />
              Jerush Celebrations &amp; Milestones
            </span>

            <h2 className="font-headline font-extrabold text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-slate-900 leading-tight tracking-tight">
              Events &amp; Celebrations at{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Jerush Dentofacial
              </span>
            </h2>
          </div>

          {/* Right: Clean Segmented Tab Switcher & Arrow Controls */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner backdrop-blur-md overflow-x-auto scrollbar-none w-full sm:w-auto max-w-full">
              {eventsList.map((item, idx) => {
                const isActive = activeIndex === idx;
                const shortTitles = ['Onam 2026', '24th Anniversary', 'Jerushaligne Units', "Founder's Day"];
                const title = shortTitles[idx] || item.title.replace(/ Celebration| 2026/g, '');
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(idx)}
                    className={`px-3.5 py-2 xl:px-4 xl:py-2.5 rounded-xl text-xs xl:text-sm font-headline font-bold transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${isActive
                        ? 'bg-white text-brandBlue shadow-md shadow-slate-300/60 scale-[1.02]'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
                      }`}
                  >
                    {title}
                  </button>
                );
              })}
            </div>

            {/* Slider Controls */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={handlePrevSlide}
                className="w-10 h-10 xl:w-11 xl:h-11 rounded-xl bg-white border border-slate-200/90 text-slate-700 hover:text-brandBlue hover:border-brandSky/60 shadow-sm flex items-center justify-center transition-all cursor-pointer hover:scale-105"
                title="Previous Event"
                aria-label="Previous Event"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextSlide}
                className="w-10 h-10 xl:w-11 xl:h-11 rounded-xl bg-white border border-slate-200/90 text-slate-700 hover:text-brandBlue hover:border-brandSky/60 shadow-sm flex items-center justify-center transition-all cursor-pointer hover:scale-105"
                title="Next Event"
                aria-label="Next Event"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* AUTHENTIC PHYSICAL OPEN BOOK CONTAINER (JERUSH SIGNATURE GRADIENT HARDCOVER BORDER) */}
        <div className="bg-gradient-to-r from-brandBlue via-brandSky to-brandBlue p-2 sm:p-3.5 xl:p-4 2xl:p-5 rounded-[26px] sm:rounded-[38px] xl:rounded-[44px] 2xl:rounded-[50px] shadow-[0_25px_70px_rgba(40,83,164,0.25)] relative group overflow-hidden border border-brandSky/40">

          {/* HANGING GOLD SILK BOOKMARK RIBBON FROM TOP CENTER */}
          <div className="hidden lg:flex flex-col items-center absolute top-0 left-[52%] -translate-x-1/2 z-40 w-5 xl:w-6 pointer-events-none">
            <div className="w-full h-24 sm:h-28 xl:h-32 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 shadow-2xl rounded-b-md border-x border-amber-200/60 flex flex-col justify-end items-center pb-1">
              <Sparkles className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-slate-955 animate-pulse" />
            </div>
          </div>

          {/* INNER TWO-PAGE OPEN BOOK SPREAD */}
          <div className="bg-[#FCFDFE] rounded-[20px] sm:rounded-[30px] xl:rounded-[36px] 2xl:rounded-[40px] overflow-hidden flex flex-col lg:flex-row items-stretch relative border border-slate-200/90 shadow-inner">

            {/* CENTER BOOK SPINE CREASE DIVIDER */}
            <div className="hidden lg:block absolute left-[52%] top-0 bottom-0 w-6 xl:w-8 -translate-x-1/2 bg-gradient-to-r from-slate-300/40 via-slate-400/60 to-slate-300/40 pointer-events-none z-30 shadow-[inset_0_0_15px_rgba(0,0,0,0.08)] border-x border-slate-300/50" />

            {/* LEFT BOOK PAGE: STATIC JOURNAL CONTENT PAGE */}
            <div className="flex-grow flex items-center p-4 sm:p-8 lg:p-10 xl:p-14 2xl:p-16 bg-[#FCFDFE] lg:w-[52%] shrink-0 relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentEvent.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full max-w-[620px] xl:max-w-[700px] 2xl:max-w-[800px] mx-auto lg:mx-0 space-y-5 xl:space-y-6 text-left"
                >
                  {/* Category Pill & Page Number Indicator */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap items-center gap-2 max-w-full">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 rounded-xl text-[10px] sm:text-[10.5px] xl:text-xs font-headline font-bold uppercase tracking-wider shrink-0 ${currentEvent.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/70'
                          : currentEvent.id.includes('onam')
                            ? 'bg-amber-50 text-amber-700 border border-amber-200/70'
                            : 'bg-sky-50 text-brandBlue border border-sky-200/70'
                        }`}>
                        {currentEvent.status === 'completed' ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <Sparkles className="w-3 h-3" />}
                        {currentEvent.badge}
                      </span>
                      <span className="text-[10px] sm:text-[11px] xl:text-xs font-bold text-slate-400 uppercase tracking-widest truncate">
                        {currentEvent.category}
                      </span>
                    </div>

                    {/* Book Page Indicator */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 rounded-full bg-slate-100/90 border border-slate-200 text-[10px] sm:text-[10.5px] xl:text-xs font-headline font-bold text-slate-600 shadow-inner shrink-0 ml-auto sm:ml-0">
                      <BookOpen className="w-3 h-3 text-brandSky shrink-0" />
                      <span>Journal Page 0{activeIndex + 1} / 0{eventsList.length}</span>
                    </div>
                  </div>


                  {/* Event Title with Gradient & Typewriter Writing Effect (Slower Pace) */}
                  <div>
                    <h3 className="font-headline font-extrabold text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] 2xl:text-[46px] leading-tight tracking-tight">
                      <TypewriterText
                        text={currentEvent.title}
                        speed={50}
                        className="bg-gradient-to-r from-slate-950 via-brandBlue to-[#1E97D4] bg-clip-text text-transparent"
                        cursorColor="bg-brandBlue"
                      />
                    </h3>
                    <p className="text-brandSky font-headline font-bold text-xs sm:text-sm xl:text-base mt-2 tracking-wide">
                      {currentEvent.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm lg:text-[14.5px] xl:text-base 2xl:text-[17px] leading-relaxed font-medium">
                    {currentEvent.description}
                  </p>

                  {/* COUNTDOWN OR COMPLETED MILESTONE SUMMARY BADGE */}
                  <div className="pt-1">
                    {currentEvent.status === 'completed' ? (
                      <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3 sm:p-3.5 xl:p-4 flex items-center gap-3 shadow-sm max-w-md xl:max-w-lg 2xl:max-w-xl">
                        <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 shrink-0">
                          <CheckCircle2 className="w-5 h-5 xl:w-6 xl:h-6" />
                        </div>
                        <div className="text-left">
                          <span className="text-[10px] xl:text-xs font-headline font-extrabold uppercase tracking-wider text-emerald-700 block">
                            Milestone Celebrated
                          </span>
                          <span className="text-xs xl:text-sm font-bold text-slate-900 block mt-0.5">
                            {currentEvent.photoCount} High-Res Exhibition Photos Published
                          </span>
                        </div>
                      </div>
                    ) : (
                      <CountdownTimer targetIsoDate={currentEvent.isoDate} />
                    )}
                  </div>

                  {/* Date & Location Strip */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-4 xl:gap-6 text-xs xl:text-sm text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-brandBlue shrink-0" />
                      <span className="font-bold text-slate-900">{currentEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="truncate max-w-[240px] xl:max-w-[340px] 2xl:max-w-[420px]">{currentEvent.location}</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {currentEvent.status === 'completed' ? (
                      <button
                        onClick={() => handleGoToGalleryAlbum(currentEvent.galleryEventId)}
                        className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 xl:px-7 xl:py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-headline font-bold text-xs sm:text-sm xl:text-base rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
                      >
                        <ImageIcon className="w-4 h-4" />
                        <span>View Exhibition Album ({currentEvent.photoCount} Photos)</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOpenModal(currentEvent)}
                        className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 xl:px-7 xl:py-4 bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs sm:text-sm xl:text-base rounded-xl shadow-lg shadow-brandBlue/15 hover:shadow-brandBlue/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
                      >
                        <span>Event Schedule &amp; RSVP</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}

                    <Link
                      to="/events"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 xl:px-6 xl:py-4 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-headline font-bold text-xs sm:text-sm xl:text-base rounded-xl border border-slate-200 transition-all cursor-pointer"
                    >
                      <span>All Event Albums</span>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT BOOK PAGE: MOUNTED PHOTO PAGE WITH 3D PAGE FLIP */}
            <div
              className="w-full lg:w-[48%] shrink-0 relative min-h-[300px] sm:min-h-[380px] lg:min-h-[480px] xl:min-h-[560px] 2xl:min-h-[640px] bg-[#F4F6F9] p-3 sm:p-4 xl:p-6 flex items-center justify-center"
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
