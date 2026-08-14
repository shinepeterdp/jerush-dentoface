import React from 'react';
import { BrowserRouter, useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';
import BackToTop from './layout/BackToTop.jsx';
import FloatingActions from './layout/FloatingActions.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import { AdminAuthProvider } from './admin/context/AdminAuthContext.jsx';
import AdminRoutes from './admin/routes/AdminRoutes.jsx';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [pageLoading, setPageLoading] = React.useState(false);
  const prevPathname = React.useRef(location.pathname);

  React.useEffect(() => {
    // Add noindex, nofollow meta tag on dev domain to prevent search engine indexing
    if (window.location.hostname === 'dev.jerushdentoface.com') {
      let meta = document.querySelector('meta[name="robots"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
      } else {
        meta.content = 'noindex, nofollow';
      }
    }
  }, []);

  React.useEffect(() => {
    if (!isAdmin && location.pathname !== prevPathname.current) {
      setPageLoading(true);
      prevPathname.current = location.pathname;
      const timer = setTimeout(() => {
        setPageLoading(false);
      }, 350); // Snappy 0.35s page switch transition
      return () => clearTimeout(timer);
    } else {
      prevPathname.current = location.pathname;
    }
  }, [location.pathname, isAdmin]);

  if (isAdmin) {
    return (
      <AdminAuthProvider>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </AdminAuthProvider>
    );
  }

  return (
    <div className="boxed_wrapper relative">
      <AnimatePresence>
        {pageLoading && (
          <motion.div 
            initial={{ width: "0%", opacity: 1 }}
            animate={{ width: "90%", opacity: 1 }}
            exit={{ width: "100%", opacity: 0 }}
            transition={{ 
              initial: { duration: 0 },
              animate: { duration: 1.2, ease: "easeOut" },
              exit: { duration: 0.3, ease: "easeIn" }
            }}
            className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#2853A4] via-[#1E97D4] to-[#F77737] z-[999999] shadow-sm shadow-brandSky/45"
          />
        )}
      </AnimatePresence>

      <Header />
      <AppRoutes />
      <Footer />
      <BackToTop />
      <FloatingActions />
    </div>
  );
}

import ScrollToTop from './components/common/ScrollToTop.jsx';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
