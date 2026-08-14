import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogService } from '../../services/blogService';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogPreviewSection({ blogs }) {
  const navigate = useNavigate();
  const [localBlogs, setLocalBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setLocalBlogs(blogs.slice(0, 3));
      setLoading(false);
    } else {
      setLoading(true);
      blogService.getRecentBlogs(3)
        .then((data) => {
          setLocalBlogs(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch blog previews:", err);
          setLoading(false);
        });
    }
  }, [blogs]);

  const handleBlogClick = (slug) => {
    navigate(`/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllClick = () => {
    navigate('/blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className="w-full py-16 bg-white text-slate-800 font-body relative overflow-hidden text-left border-t border-slate-100 flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  if (localBlogs.length === 0) {
    return null; // Don't render anything if there are no blogs
  }

  return (
    <section id="blog-preview" className="w-full py-16 lg:py-20 bg-white text-slate-800 font-body relative overflow-hidden text-left border-t border-slate-100">
      {/* Decorative glows */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brandBlue/5 rounded-full blur-3xl pointer-events-none -ml-40 -mt-20"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brandSky/5 rounded-full blur-3xl pointer-events-none -mr-40 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header (Centered) */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/10 mb-4 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-brandSky relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandSky opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brandSky"></span>
            </span>
            <span className="text-[10px] font-bold text-brandBlue uppercase tracking-wider font-headline">
              Blog
            </span>
          </div>
          <h2 className="font-headline font-black text-3xl sm:text-4xl text-primary leading-tight">
            Our Latest Insights
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xl mx-auto">
            Explore diagnostics, treatment plans, oral wellness tips and skin care guidance authored by our leading medical specialists.
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {localBlogs.map((blog, idx) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={() => handleBlogClick(blog.slug)}
              className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden flex flex-col justify-between shadow-[0_15px_40px_rgba(40,83,164,0.03)] cursor-pointer hover:shadow-xl hover:shadow-brandBlue/5 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="flex flex-col h-full">
                {/* Top Split Banner */}
                <div className="relative h-[160px] bg-gradient-to-br from-brandBlue to-[#1B408B] overflow-hidden flex select-none">
                  {/* Decorative blur */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full translate-x-12 -translate-y-12 blur-2xl"></div>

                  {/* Left Side: White Background with diagonal cut */}
                  <div
                    className="bg-white p-5 flex flex-col justify-between z-10 relative text-left"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 84% 100%, 0% 100%)', width: '65%' }}
                  >
                    <div>
                      {/* Jerush Logo Branding */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-brandBlue flex items-center justify-center text-[9px] text-white font-black font-headline shadow-sm shadow-brandBlue/10">J</div>
                        <div>
                          <p className="text-[9px] font-black text-brandBlue tracking-wider uppercase leading-none font-headline">Jerush</p>
                          <p className="text-[6px] font-bold text-slate-400 tracking-widest uppercase leading-none mt-0.5 font-headline">Dentoface</p>
                        </div>
                      </div>

                      {/* Headline inside banner */}
                      <p className="text-slate-900 font-headline font-black text-[10px] sm:text-[11px] leading-snug mt-4 line-clamp-3 uppercase tracking-wide">
                        {blog.title}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Brand Color Background with centered featured image */}
                  <div className="bg-transparent flex-grow flex items-center justify-center p-3 relative z-10">
                    <div className="w-20 h-[84px] sm:w-[92px] sm:h-[92px] rounded-xl overflow-hidden border-2 border-white shadow-md bg-white">
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Blue Gradient Divider Line */}
                <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-brandBlue to-transparent"></div>

                {/* Text Content */}
                <div className="p-6 flex flex-col justify-between flex-grow text-left space-y-4">
                  <div className="space-y-3">
                    {/* Category Tag */}
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-brandBlue bg-brandBlue/5 px-2.5 py-1 rounded-md border border-brandBlue/10 font-headline">
                        {blog.category}
                      </span>
                    </div>
                    <h3 className="font-headline font-black text-base text-slate-900 line-clamp-2 group-hover:text-brandBlue transition-colors duration-300">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm line-clamp-3 leading-relaxed font-medium">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Read More button as rounded pill */}
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1 px-5 py-2.5 bg-brandBlue text-white hover:bg-brandSky font-headline font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 group-hover:shadow-md group-hover:shadow-brandBlue/10">
                      Read More
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore All Articles Button Centered at Bottom */}
        <div className="flex justify-center mt-12">
          <button
            onClick={handleViewAllClick}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-50 border border-slate-200 text-brandBlue hover:text-white hover:bg-brandBlue font-headline font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brandBlue/5 active:scale-95"
          >
            Explore All Articles
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
