import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, Clock, MapPin, Users, Award, ShieldCheck, CheckCircle2,
  Sparkles, Search, Gift, Activity, ArrowRight, Phone, HeartHandshake,
  Download, Printer, X, Check, Building, Mail, Send, ChevronRight
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import { campsService, CAMPS_UPDATE_EVENT } from '../services/campsService';

export default function DentalCampsPage() {
  const navigate = useNavigate();
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Registration Modal State
  const [selectedCampForPass, setSelectedCampForPass] = useState(null);
  const [passForm, setPassForm] = useState({
    fullName: '',
    phone: '',
    age: '',
    gender: 'General',
    familyMembers: '1',
    preferredTimeSlot: 'Morning (9:30 AM - 12:30 PM)'
  });
  const [passGeneratedToken, setPassGeneratedToken] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  // Request Camp Form State
  const [requestForm, setRequestForm] = useState({
    organizationName: '',
    contactPerson: '',
    designation: '',
    phone: '',
    email: '',
    preferredDate: '',
    location: '',
    campType: 'General Community Dental Camp',
    expectedCount: '200-300 People',
    notes: ''
  });
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

  // Load camps data
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
  const services = campsService.getServices();

  // Filter camps
  const filteredCamps = camps.filter((camp) => {
    const matchesSearch =
      camp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.leadDoctors.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeFilter === 'all') return true;
    if (activeFilter === 'upcoming') return camp.status === 'upcoming';
    if (activeFilter === 'completed') return camp.status === 'completed';
    return camp.category === activeFilter;
  });

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!passForm.fullName || !passForm.phone) return;
    setIsRegistering(true);
    try {
      const result = await campsService.registerForCamp(selectedCampForPass.id, passForm);
      setPassGeneratedToken({
        ...passForm,
        token: result.token,
        campTitle: selectedCampForPass.title,
        campDate: selectedCampForPass.date,
        campTime: selectedCampForPass.time,
        campLocation: selectedCampForPass.location
      });
      loadCamps();
    } catch (err) {
      console.error('Error registering:', err);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleRequestCampSubmit = async (e) => {
    e.preventDefault();
    if (!requestForm.organizationName || !requestForm.phone) return;
    setIsSubmittingRequest(true);
    try {
      await campsService.submitInquiry(requestForm);
      setRequestSubmitted(true);
      setRequestForm({
        organizationName: '',
        contactPerson: '',
        designation: '',
        phone: '',
        email: '',
        preferredDate: '',
        location: '',
        campType: 'General Community Dental Camp',
        expectedCount: '200-300 People',
        notes: ''
      });
    } catch (err) {
      console.error('Error submitting camp inquiry:', err);
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const closePassModal = () => {
    setSelectedCampForPass(null);
    setPassGeneratedToken(null);
    setPassForm({
      fullName: '',
      phone: '',
      age: '',
      gender: 'General',
      familyMembers: '1',
      preferredTimeSlot: 'Morning (9:30 AM - 12:30 PM)'
    });
  };

  const handlePrintPass = () => {
    window.print();
  };

  return (
    <div className="w-full bg-slate-50 font-body text-left relative overflow-hidden">
      {/* ─── Breadcrumb Hero Banner ─── */}
      <PageBreadcrumbHero
        title="Dental Health Camps & Outreach"
        breadcrumbs={[
          { label: 'Smile Stories', path: '/smile-stories' },
          { label: 'Dental Camps', active: true }
        ]}
      />

      {/* ─── Impact Statistics Section ─── */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1 relative">
              {idx !== 0 && (
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-slate-100" />
              )}
              <div className="font-headline font-black text-3xl sm:text-4xl bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="font-headline font-bold text-slate-800 text-sm">{stat.label}</div>
              <div className="text-[11px] text-slate-400 font-medium">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Main Content & Camp Schedule ─── */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-20 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandSky/10 border border-brandSky/20 text-brandSky font-headline font-bold text-[11px] uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5" />
              Community Welfare Initiative
            </div>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-primary leading-tight">
              Upcoming & Recent{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Dental Outreach Camps
              </span>
            </h2>
            <p className="text-secondary text-sm sm:text-base leading-relaxed">
              Bringing state-of-the-art diagnostic dental equipment, specialist maxillofacial surgeons, and free treatments directly to villages, schools, and community centers.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search camp or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 text-slate-800 rounded-xl placeholder-slate-400 focus:outline-none focus:border-brandSky transition-colors text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 pb-2 border-b border-slate-200">
          {[
            { id: 'all', label: 'All Camps' },
            { id: 'upcoming', label: 'Upcoming Camps' },
            { id: 'rural', label: 'Rural & Village' },
            { id: 'school', label: 'School Smile Bright' },
            { id: 'specialist', label: 'Specialist Screening' },
            { id: 'completed', label: 'Past Impact Dossiers' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-headline font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-brandBlue text-white shadow-md shadow-brandBlue/20 scale-102'
                  : 'bg-white text-slate-600 hover:text-brandBlue hover:bg-sky-50 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Camps Grid */}
        {loading ? (
          <div className="py-20 flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredCamps.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-100 p-8 space-y-3">
            <div className="w-12 h-12 bg-sky-50 text-brandBlue rounded-full flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-headline font-bold text-lg text-primary">No Camps Found</h3>
            <p className="text-secondary text-sm">No dental outreach camps match your current filter or search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCamps.map((camp) => {
              const isUpcoming = camp.status === 'upcoming';
              return (
                <div
                  key={camp.id}
                  className="bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  {/* Top Image & Status Banner */}
                  <div className="relative aspect-[16/8] sm:aspect-[16/7] overflow-hidden bg-slate-900">
                    <img
                      src={camp.coverImage}
                      alt={camp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      onError={(e) => {
                        e.target.src = '/images/events/jerushaligne-opening-event/jerushaligne-manufacturing-units-open.webp';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>

                    {/* Status Pill */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-headline font-extrabold uppercase tracking-wider shadow-md ${
                          isUpcoming
                            ? 'bg-emerald-500 text-white animate-pulse'
                            : 'bg-slate-800/90 backdrop-blur-md text-slate-200 border border-white/10'
                        }`}
                      >
                        {isUpcoming ? '• Upcoming Camp' : 'Completed Outreach'}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-brandBlue font-headline font-bold text-[10px] uppercase tracking-wider shadow-sm">
                        {camp.campType}
                      </span>
                    </div>

                    {/* Registrations count badge */}
                    {isUpcoming && (
                      <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-white text-[11px] font-bold">
                        {camp.registeredCount || 0} / {camp.capacity || 500} Passes Claimed
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Title & Tagline */}
                      <div>
                        <h3 className="font-headline font-black text-xl sm:text-2xl text-primary leading-tight group-hover:text-brandBlue transition-colors">
                          {camp.title}
                        </h3>
                        <p className="text-brandSky font-semibold text-xs mt-1">
                          {camp.tagline}
                        </p>
                      </div>

                      {/* Date, Time & Venue Specs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs">
                        <div className="flex items-center gap-2.5 text-slate-700">
                          <Calendar className="w-4 h-4 text-brandBlue shrink-0" />
                          <span className="font-semibold">{camp.date}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-slate-700">
                          <Clock className="w-4 h-4 text-brandSky shrink-0" />
                          <span>{camp.time}</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-slate-700 sm:col-span-2">
                          <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>{camp.location}</span>
                        </div>
                      </div>

                      {/* Lead Doctors & Target Beneficiaries */}
                      <div className="space-y-1.5 text-xs text-slate-600 bg-sky-50/60 p-3.5 rounded-2xl border border-sky-100">
                        <div className="flex items-center gap-2 font-headline font-bold text-brandBlue">
                          <Users className="w-3.5 h-3.5 shrink-0" />
                          <span>Lead Clinicians: {camp.leadDoctors}</span>
                        </div>
                        <p className="text-secondary pl-5 text-[11px]">
                          Target: {camp.targetBeneficiaries}
                        </p>
                      </div>

                      {/* Free Services List */}
                      <div className="space-y-2">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-headline">
                          Free Services Included in Camp:
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                          {camp.servicesProvided.slice(0, 4).map((srv, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{srv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 mt-4">
                      {isUpcoming ? (
                        <button
                          onClick={() => setSelectedCampForPass(camp)}
                          className="flex-1 min-w-[170px] py-3 px-5 rounded-xl bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md shadow-brandBlue/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4" />
                          Get Free Camp Pass
                        </button>
                      ) : (
                        <div className="flex-1 py-3 px-4 rounded-xl bg-slate-100 text-slate-600 font-headline font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600" />
                          Outreach Completed ({camp.expectedBeneficiaries})
                        </div>
                      )}

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(camp.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-4 rounded-xl border border-slate-200 text-slate-700 hover:text-brandBlue hover:border-brandSky font-headline font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
                      >
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        Location
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ─── Free Services Showcase Grid ─── */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandSky/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brandBlue/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandSky/10 border border-brandSky/30 text-brandSky font-headline font-bold text-[11px] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Free Diagnostics & Relief
            </div>
            <h2 className="font-headline font-black text-3xl sm:text-4xl text-white leading-tight">
              What We Offer at Every{' '}
              <span className="bg-gradient-to-r from-brandSky to-cyan-300 bg-clip-text text-transparent">
                Jerush Outreach Camp
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Every participant receives thorough evaluation using mobile surgical operatory equipment and personalized guidance from certified maxillofacial specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-brandSky/50 hover:bg-slate-800 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brandBlue/30 to-brandSky/20 text-brandSky flex items-center justify-center border border-brandSky/20 group-hover:scale-110 transition-transform">
                      {idx === 0 && <ShieldCheck className="w-6 h-6" />}
                      {idx === 1 && <Search className="w-6 h-6" />}
                      {idx === 2 && <Sparkles className="w-6 h-6" />}
                      {idx === 3 && <CheckCircle2 className="w-6 h-6" />}
                      {idx === 4 && <Activity className="w-6 h-6" />}
                      {idx === 5 && <Gift className="w-6 h-6" />}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-brandSky/10 border border-brandSky/30 text-brandSky text-[10px] font-bold uppercase tracking-wider font-headline">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-lg text-white group-hover:text-brandSky transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-brandSky font-headline">
                  <span>Available on-site</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Request a Camp Form Section ─── */}
      <section id="request-camp" className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-white via-sky-50/40 to-blue-50/30 rounded-3xl border border-sky-100 shadow-xl p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Description Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandBlue/10 border border-brandBlue/20 text-brandBlue font-headline font-bold text-[11px] uppercase tracking-wider">
                <Building className="w-3.5 h-3.5" />
                Host In Your Area
              </div>
              <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-primary leading-tight">
                Request a Free Camp for Your{' '}
                <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                  School, NGO, or Village
                </span>
              </h2>
              <p className="text-secondary text-sm sm:text-base leading-relaxed">
                Are you a school principal, village head, NGO leader, or corporate HR? Jerush Medical Foundation provides fully equipped mobile dental vans and specialist doctor teams free of charge for approved social outreach initiatives.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-sm text-slate-800">Zero Cost to Host</h4>
                    <p className="text-secondary text-xs">All doctors, materials, and mobile operatory are provided by Jerush.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-brandSky flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-sm text-slate-800">Complete Mobile Sterilization</h4>
                    <p className="text-secondary text-xs">Hospital-grade autoclave sterilization maintained at all off-site camps.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-brandBlue/10 text-brandBlue flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-sm text-slate-800">Direct Doctor Hotline</h4>
                    <p className="text-secondary text-xs">Direct coordination with outreach director: <a href="tel:+919489160055" className="text-brandBlue font-bold">+91 94891 60055</a></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              {requestSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-headline font-extrabold text-2xl text-slate-900">
                    Camp Request Received!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Thank you for reaching out. Our Community Outreach Coordinator will contact you within 24 hours to finalize dates and logistical arrangements.
                  </p>
                  <button
                    onClick={() => setRequestSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-brandBlue text-white font-headline font-bold text-xs uppercase tracking-wider hover:bg-brandBlue/90 transition-all"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRequestCampSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-headline">
                        Organization / School Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rotary Club / St. Anne's School"
                        value={requestForm.organizationName}
                        onChange={(e) => setRequestForm({ ...requestForm, organizationName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-brandSky transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-headline">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mr. S. Rajendran"
                        value={requestForm.contactPerson}
                        onChange={(e) => setRequestForm({ ...requestForm, contactPerson: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-brandSky transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-headline">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98421 XXXXX"
                        value={requestForm.phone}
                        onChange={(e) => setRequestForm({ ...requestForm, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-brandSky transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-headline">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. contact@domain.org"
                        value={requestForm.email}
                        onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-brandSky transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-headline">
                        Preferred Camp Date
                      </label>
                      <input
                        type="date"
                        value={requestForm.preferredDate}
                        onChange={(e) => setRequestForm({ ...requestForm, preferredDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-brandSky transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-headline">
                        Camp Category
                      </label>
                      <select
                        value={requestForm.campType}
                        onChange={(e) => setRequestForm({ ...requestForm, campType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-brandSky transition-all"
                      >
                        <option value="General Community Dental Camp">General Community Dental Camp</option>
                        <option value="School Pediatric Screening">School Pediatric Screening</option>
                        <option value="Elderly / Geriatric Care Camp">Elderly / Geriatric Care Camp</option>
                        <option value="Industrial / Corporate Wellness">Industrial / Corporate Wellness</option>
                        <option value="Oral Cancer Special Screening">Oral Cancer Special Screening</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-headline">
                        Expected Beneficiaries
                      </label>
                      <select
                        value={requestForm.expectedCount}
                        onChange={(e) => setRequestForm({ ...requestForm, expectedCount: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-brandSky transition-all"
                      >
                        <option value="100-200 People">100-200 People</option>
                        <option value="200-400 People">200-400 People</option>
                        <option value="400-800 People">400-800 People</option>
                        <option value="800+ People (Mega Camp)">800+ People (Mega Camp)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-headline">
                      Venue Location / Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Town Hall Auditorium, Main Road, Nagercoil"
                      value={requestForm.location}
                      onChange={(e) => setRequestForm({ ...requestForm, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-brandSky transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-headline">
                      Additional Requirements or Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Please mention any special focus (e.g. toothbrush kit distribution, elderly denture checkups)..."
                      value={requestForm.notes}
                      onChange={(e) => setRequestForm({ ...requestForm, notes: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-brandSky transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingRequest}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md shadow-brandBlue/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingRequest ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Camp Request to Jerush Foundation
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Registration Modal (Get Free Camp Pass) ─── */}
      {selectedCampForPass && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 relative">
            {/* Close Button */}
            <button
              onClick={closePassModal}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!passGeneratedToken ? (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-brandSky uppercase tracking-wider font-headline">
                    Free Camp Registration
                  </span>
                  <h3 className="font-headline font-black text-xl text-primary leading-tight">
                    {selectedCampForPass.title}
                  </h3>
                  <p className="text-secondary text-xs">
                    {selectedCampForPass.date} • {selectedCampForPass.time}
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-headline">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={passForm.fullName}
                      onChange={(e) => setPassForm({ ...passForm, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-brandSky"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-headline">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit number"
                        value={passForm.phone}
                        onChange={(e) => setPassForm({ ...passForm, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-brandSky"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-headline">
                        Age
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 34"
                        value={passForm.age}
                        onChange={(e) => setPassForm({ ...passForm, age: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-brandSky"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-headline">
                        Family Members Attending
                      </label>
                      <select
                        value={passForm.familyMembers}
                        onChange={(e) => setPassForm({ ...passForm, familyMembers: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-brandSky"
                      >
                        <option value="1">1 Person (Self)</option>
                        <option value="2">2 Persons</option>
                        <option value="3">3 Persons</option>
                        <option value="4+">4+ Persons (Family)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-headline">
                        Time Slot
                      </label>
                      <select
                        value={passForm.preferredTimeSlot}
                        onChange={(e) => setPassForm({ ...passForm, preferredTimeSlot: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-brandSky"
                      >
                        <option value="Morning (9:30 AM - 12:30 PM)">Morning (9:30 AM - 12:30 PM)</option>
                        <option value="Afternoon (1:30 PM - 4:30 PM)">Afternoon (1:30 PM - 4:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 bg-sky-50 p-2.5 rounded-xl border border-sky-100">
                    ℹ️ You will receive an instant digital token. Showing this token at the registration desk grants priority queue access.
                  </p>

                  <button
                    type="submit"
                    disabled={isRegistering}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md shadow-brandBlue/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isRegistering ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Free Priority Pass
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Pass Display Card */
              <div className="p-6 sm:p-8 space-y-6 text-center">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-black text-2xl text-slate-900">
                    Pass Confirmed!
                  </h3>
                  <p className="text-secondary text-xs">
                    Please keep a screenshot or print this token for entry at the camp.
                  </p>
                </div>

                {/* Digital Pass Ticket Box */}
                <div className="bg-slate-900 text-white rounded-2xl p-5 text-left space-y-3 relative overflow-hidden border border-brandSky/30 shadow-lg">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[9px] font-bold text-brandSky uppercase tracking-widest block">JERUSH MEDICAL FOUNDATION</span>
                      <span className="font-headline font-bold text-sm text-white">{passGeneratedToken.campTitle}</span>
                    </div>
                    <span className="px-2 py-1 bg-brandBlue text-white font-mono font-bold text-[10px] rounded">
                      VIP PASS
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Patient Name:</span>
                      <span className="font-bold text-white">{passGeneratedToken.fullName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Token Number:</span>
                      <span className="font-mono font-bold text-brandSky">{passGeneratedToken.token}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Date & Time:</span>
                      <span className="text-slate-200">{passGeneratedToken.campDate} ({passGeneratedToken.preferredTimeSlot.split(' ')[0]})</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Persons:</span>
                      <span className="text-slate-200">{passGeneratedToken.familyMembers} Attendee(s)</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                    📍 {passGeneratedToken.campLocation}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handlePrintPass}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-brandBlue hover:border-brandSky font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Print Pass
                  </button>
                  <button
                    onClick={closePassModal}
                    className="flex-1 py-2.5 rounded-xl bg-brandBlue text-white font-headline font-bold text-xs uppercase tracking-wider hover:bg-brandBlue/90"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Doctor CTA Section (Custom Rules Compliant) ─── */}
      <section className="max-w-7xl mx-auto px-6 pb-20 pt-8">
        <div className="bg-gradient-to-r from-brandBlue to-brandSky rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-8 items-stretch">
            {/* Left side: Doctor Cutout Image */}
            <div className="relative flex items-end justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 bg-black/5 min-h-[300px] lg:min-h-0 pt-8 lg:pt-0">
              <img
                src="/images/doctors/dr-binila-parallax.webp"
                alt="DR. C. BINILA ASIR - Jerush Dentofacial"
                className="h-[320px] lg:h-[380px] w-auto object-contain object-bottom transition-transform duration-500 hover:scale-102"
                onError={(e) => {
                  e.target.src = '/images/doctors/binila1.webp';
                }}
              />
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-xl text-left">
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
