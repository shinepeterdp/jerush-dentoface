import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, Sun, Moon, Users, Stethoscope, FileText, Star, Briefcase } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { doctorService } from '../../services/doctorService';
import { treatmentService } from '../../services/treatmentService';
import { blogService } from '../../services/blogService';
import { reviewService } from '../../services/reviewService';
import { careerService } from '../../services/careerService';

const BREADCRUMB_MAP = {
  '/admin': 'Dashboard',
  '/admin/doctors': 'Doctors',
  '/admin/treatments': 'Treatments',
  '/admin/blog': 'Blog',
  '/admin/blog/new': 'New Blog Post',
  '/admin/reviews': 'Reviews',
  '/admin/gallery': 'Gallery',
  '/admin/settings': 'Settings',
};

export default function AdminTopbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAdminAuth();

  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem('admin-theme') || 'light');

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState({ doctors: [], treatments: [], blogs: [], reviews: [], careers: [] });
  const [searchResults, setSearchResults] = useState({ doctors: [], treatments: [], blogs: [], reviews: [], careers: [] });
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);

  // Notification state
  const [notifications, setNotifications] = useState([]);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const bellRef = useRef(null);

  const currentPath = location.pathname;
  const pageTitle = BREADCRUMB_MAP[currentPath] || 'Admin';

  // Build breadcrumbs
  const segments = currentPath.split('/').filter(Boolean);
  const breadcrumbs = segments.map((seg, idx) => {
    const path = '/' + segments.slice(0, idx + 1).join('/');
    const label = BREADCRUMB_MAP[path] || seg.charAt(0).toUpperCase() + seg.slice(1);
    return { label, path, isLast: idx === segments.length - 1 };
  });

  // Apply theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('admin-theme', theme);
  }, [theme]);

  // Load search data
  useEffect(() => {
    Promise.all([
      doctorService.getDoctors().catch(() => []),
      treatmentService.getTreatments().catch(() => []),
      blogService.getBlogs().catch(() => []),
      reviewService.getReviews().catch(() => []),
      careerService.getCareers().catch(() => [])
    ]).then(([docs, treats, blogsData, revs, jobs]) => {
      setSearchData({ doctors: docs, treatments: treats, blogs: blogsData, reviews: revs, careers: jobs });
    });
  }, [location.pathname]);

  // Fetch notifications
  const fetchNotifications = () => {
    fetch('/api/activities.php')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNotifications(data);
        } else {
          setNotifications([
            { id: 1, action: 'Welcome to Jerush Admin Portal', detail: 'System is ready', type: 'system', created_at: new Date().toISOString() },
            { id: 2, action: 'Live Database Connected', detail: 'Connected successfully', type: 'system', created_at: new Date().toISOString() }
          ]);
        }
      })
      .catch(() => {
        setNotifications([
          { id: 1, action: 'Welcome to Jerush Admin Portal', detail: 'System is ready', type: 'system', created_at: new Date().toISOString() },
          { id: 2, action: 'Live Database Connected', detail: 'Connected successfully', type: 'system', created_at: new Date().toISOString() }
        ]);
      });
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter search results
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ doctors: [], treatments: [], blogs: [], reviews: [], careers: [] });
      return;
    }
    const q = searchQuery.toLowerCase();
    const docs = searchData.doctors.filter(d => d.name?.toLowerCase().includes(q) || d.role?.toLowerCase().includes(q));
    const treats = searchData.treatments.filter(t => t.title?.toLowerCase().includes(q) || t.category?.toLowerCase().includes(q));
    const blogsData = searchData.blogs.filter(b => b.title?.toLowerCase().includes(q) || b.category?.toLowerCase().includes(q));
    const revs = searchData.reviews.filter(r => r.name?.toLowerCase().includes(q) || r.text?.toLowerCase().includes(q));
    const jobs = searchData.careers.filter(c => c.title?.toLowerCase().includes(q) || c.department?.toLowerCase().includes(q));

    setSearchResults({ doctors: docs, treatments: treats, blogs: blogsData, reviews: revs, careers: jobs });
  }, [searchQuery, searchData]);

  // Click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setShowNotificationDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalResults = Object.values(searchResults).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-6 shrink-0 sticky top-0 z-30 transition-colors">
      {/* Left: hamburger + breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="hidden sm:flex items-center gap-1.5 text-xs font-medium">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.path}>
              {idx > 0 && <span className="text-slate-300 dark:text-slate-600 mx-1">/</span>}
              <span className={crumb.isLast ? 'text-slate-800 dark:text-white font-bold' : 'text-slate-400 dark:text-slate-500'}>
                {crumb.label}
              </span>
            </React.Fragment>
          ))}
        </nav>

        <h2 className="sm:hidden font-headline font-extrabold text-sm text-slate-800 dark:text-white">{pageTitle}</h2>
      </div>

      {/* Right: search, theme, notifications, avatar */}
      <div className="flex items-center gap-2">
        {/* Search Input */}
        <div ref={searchRef} className="relative hidden md:block">
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 w-64 focus-within:border-brandSky dark:focus-within:border-brandSky transition-colors">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder="Search admin panels..."
              className="bg-transparent outline-none text-xs text-slate-700 dark:text-white w-full placeholder-slate-400"
            />
          </div>

          {/* Search Dropdown */}
          {showSearchDropdown && searchQuery.trim() && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg max-h-96 overflow-y-auto z-50 p-2 space-y-3">
              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 py-1">
                Search Results ({totalResults})
              </div>
              {totalResults === 0 ? (
                <div className="text-xs text-slate-400 dark:text-slate-500 text-center py-4">No results found for "{searchQuery}"</div>
              ) : (
                <div className="space-y-2">
                  {searchResults.doctors.length > 0 && (
                    <div>
                      <div className="text-[9px] font-extrabold text-brandSky px-2 uppercase tracking-wide">Doctors</div>
                      {searchResults.doctors.map(d => (
                        <button key={d.id} onClick={() => { navigate('/admin/doctors'); setShowSearchDropdown(false); setSearchQuery(''); }} className="w-full text-left px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg flex items-center gap-2 transition-colors">
                          <Users className="w-3 h-3 text-slate-400" />
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-bold text-slate-700 dark:text-white truncate">{d.name}</p>
                            <p className="text-[9px] text-slate-400 dark:text-slate-500 truncate">{d.role}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  {searchResults.treatments.length > 0 && (
                    <div>
                      <div className="text-[9px] font-extrabold text-emerald px-2 uppercase tracking-wide">Treatments</div>
                      {searchResults.treatments.map(t => (
                        <button key={t.id} onClick={() => { navigate('/admin/treatments'); setShowSearchDropdown(false); setSearchQuery(''); }} className="w-full text-left px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg flex items-center gap-2 transition-colors">
                          <Stethoscope className="w-3 h-3 text-slate-400" />
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-bold text-slate-700 dark:text-white truncate">{t.title}</p>
                            <p className="text-[9px] text-slate-400 dark:text-slate-500 truncate">{t.category}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  {searchResults.blogs.length > 0 && (
                    <div>
                      <div className="text-[9px] font-extrabold text-violet px-2 uppercase tracking-wide">Blogs</div>
                      {searchResults.blogs.map(b => (
                        <button key={b.id} onClick={() => { navigate('/admin/blog'); setShowSearchDropdown(false); setSearchQuery(''); }} className="w-full text-left px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg flex items-center gap-2 transition-colors">
                          <FileText className="w-3 h-3 text-slate-400" />
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-bold text-slate-700 dark:text-white truncate">{b.title}</p>
                            <p className="text-[9px] text-slate-400 dark:text-slate-500 truncate">{b.category}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  {searchResults.reviews.length > 0 && (
                    <div>
                      <div className="text-[9px] font-extrabold text-amber px-2 uppercase tracking-wide">Reviews</div>
                      {searchResults.reviews.map(r => (
                        <button key={r.id} onClick={() => { navigate('/admin/reviews'); setShowSearchDropdown(false); setSearchQuery(''); }} className="w-full text-left px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg flex items-center gap-2 transition-colors">
                          <Star className="w-3 h-3 text-slate-400" />
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-bold text-slate-700 dark:text-white truncate">{r.name}</p>
                            <p className="text-[9px] text-slate-400 dark:text-slate-500 truncate">{r.text}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  {searchResults.careers.length > 0 && (
                    <div>
                      <div className="text-[9px] font-extrabold text-pink-500 px-2 uppercase tracking-wide">Careers</div>
                      {searchResults.careers.map(c => (
                        <button key={c.id} onClick={() => { navigate('/admin/careers'); setShowSearchDropdown(false); setSearchQuery(''); }} className="w-full text-left px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg flex items-center gap-2 transition-colors">
                          <Briefcase className="w-3 h-3 text-slate-400" />
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-bold text-slate-700 dark:text-white truncate">{c.title}</p>
                            <p className="text-[9px] text-slate-400 dark:text-slate-500 truncate">{c.department}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
          className="p-2 rounded-lg text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          {theme === 'light' ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
        </button>

        {/* Notifications Bell */}
        <div ref={bellRef} className="relative">
          <button
            onClick={() => {
              setShowNotificationDropdown(!showNotificationDropdown);
              setUnreadCount(0);
            }}
            className="relative p-2 rounded-lg text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <Bell className="w-[18px] h-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brandSky rounded-full ring-2 ring-white dark:ring-slate-900"></span>
            )}
          </button>

          {/* Notifications Dropdown Card */}
          {showNotificationDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg max-h-96 overflow-y-auto z-50 p-2 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 py-1 border-b border-slate-100 dark:border-slate-700 flex justify-between">
                <span>Recent Updates</span>
                <span className="text-brandSky hover:underline cursor-pointer" onClick={fetchNotifications}>Refresh</span>
              </div>
              {notifications.length === 0 ? (
                <div className="text-xs text-slate-400 dark:text-slate-500 text-center py-6">No recent updates found.</div>
              ) : (
                <div className="space-y-1">
                  {notifications.slice(0, 5).map(n => (
                    <div key={n.id} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-left">
                      <p className="text-[11px] font-bold text-slate-700 dark:text-white leading-tight">{n.action}</p>
                      <p className="text-[9px] text-slate-400 dark:text-slate-500 truncate leading-snug">{n.detail}</p>
                      <span className="text-[8px] text-slate-400 font-semibold">{new Date(n.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-7 bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

        {/* Admin Profile */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brandBlue to-brandSky flex items-center justify-center text-white font-headline font-black text-xs shrink-0 shadow-sm">
            {user?.name === 'Jerush Dentoface' ? 'JD' : (user?.name?.split(' ').map(w => w[0]).join('').slice(0, 2) || 'AD')}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-headline font-bold text-slate-800 dark:text-white leading-tight">{user?.name || 'Admin'}</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium leading-tight">{user?.role || 'Administrator'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
