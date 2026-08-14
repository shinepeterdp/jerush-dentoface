import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Star } from 'lucide-react';
import { reviewService } from '../services/reviewService';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';

// Static default video testimonials
const STATIC_VIDEOS = [
  {
    id: 'static-1',
    type: 'video',
    name: 'Lajona',
    location: 'Thuckalay',
    rating: 5,
    treatment: 'Clear Aligners (Jerushaligne)',
    video_thumbnail: '/images/testimonials/lajona-clear-aligner-jerushaligne.webp',
    text: 'Braces vs Jerushaligne clear aligners experience. Lajona shares why she chose invisible aligners and her comfortable smile journey.',
    video_url: 'https://www.youtube.com/watch?v=wDrLjQpwOf0'
  },
  {
    id: 'static-2',
    type: 'video',
    name: 'Mr. Arul',
    location: 'Kanyakumari',
    rating: 5,
    treatment: 'Hair Transplant',
    video_thumbnail: '/images/testimonials/arul-hair-transplant.webp',
    text: 'Watch Arul share his hair transplant recovery journey and the stunning natural density results he achieved at Jerush.',
    video_url: 'https://www.youtube.com/watch?v=2Bo8CwRZ5XE'
  },
  {
    id: 'static-3',
    type: 'video',
    name: 'Austin',
    location: 'Thuckalay',
    rating: 5,
    treatment: 'Cosmetic Dermatology',
    video_thumbnail: '/images/testimonials/austin-skin-treatment.webp',
    text: 'Austin shares his 10/10 skin transformation review after advanced cosmetic dermatology treatments.',
    video_url: 'https://www.youtube.com/watch?v=TTWuVlz3H8Y'
  },
  {
    id: 'static-4',
    type: 'video',
    name: 'Brylin Shijo',
    location: 'Thuckalay',
    rating: 5,
    treatment: 'Dental Crown',
    video_thumbnail: '/images/testimonials/brylin-shijo-tooth-crown.webp',
    text: 'Brylin Shijo reviews the dental crown procedure and the expert care provided by our prosthodontics team.',
    video_url: 'https://www.youtube.com/watch?v=21FlI7IDQdk'
  },
  {
    id: 'static-5',
    type: 'video',
    name: 'Hair Care Patient',
    location: 'Kanyakumari',
    rating: 5,
    treatment: 'Dandruff & Hair Care',
    video_thumbnail: '/images/testimonials/dandruff-treatment-patients.webp',
    text: 'The truth about hair fall and dandruff laser treatment. Watch this patient share her honest clinic experience.',
    video_url: 'https://www.youtube.com/watch?v=jAMgP_XeDWk'
  },
  {
    id: 'static-6',
    type: 'video',
    name: 'Jeba Priya',
    location: 'Thuckalay',
    rating: 5,
    treatment: 'Root Canal Treatment',
    video_thumbnail: '/images/testimonials/jeba-priya-root-canal.webp',
    text: 'Scared of root canals? Jeba Priya shares her painless single-visit root canal treatment experience at Jerush.',
    video_url: 'https://www.youtube.com/watch?v=3tOb9FVW4rM'
  },
  {
    id: 'static-7',
    type: 'video',
    name: 'Skincare Patient',
    location: 'Nagercoil',
    rating: 5,
    treatment: 'Cosmetic Skincare',
    video_thumbnail: '/images/testimonials/pigmentation-darkspots-review.webp',
    text: 'Advanced Hydrafacial treatment review. Watch this skincare patient share her glowing results.',
    video_url: 'https://www.youtube.com/watch?v=bf2K2aBBR5c'
  },
  {
    id: 'static-8',
    type: 'instagram',
    name: 'Jerush Hospital',
    location: 'Thuckalay',
    rating: 5,
    treatment: 'Hydrafacial Treatment',
    video_thumbnail: '/images/testimonials/hydrafacial-treatment.webp',
    text: 'Watch this Hydrafacial Glow Up reel on Instagram for instant visible skin transformation.',
    video_url: 'https://www.instagram.com/reel/DIV3FZZACMb/'
  }
];

// Parser helper for URLs
const parseVideoLink = (url, type) => {
  if (!url) return null;
  if (type === 'video') {
    const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(ytRegex);
    return match ? match[1] : null;
  } else if (type === 'instagram') {
    const instaRegex = /instagram\.com\/(?:reel|p)\/([A-Za-z0-9_-]+)/;
    const match = url.match(instaRegex);
    return match ? match[1] : null;
  }
  return null;
};

export default function VideoTestimonialsPage() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'video' | 'instagram'
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const fetchVideoReviews = async () => {
      setLoading(true);
      try {
        const dbReviews = await reviewService.getReviews();
        // Filter DB reviews for video reviews
        const dbVideos = dbReviews
          .filter(r => r.type === 'video' || r.type === 'instagram')
          .map(r => ({
            id: r.id,
            type: r.type,
            name: r.name,
            location: r.location,
            rating: r.rating || 5,
            treatment: r.treatment,
            video_thumbnail: r.video_thumbnail || r.image || '/images/placeholder-video.webp',
            text: r.text,
            video_url: r.video_url
          }));

        // Merge with static defaults, avoiding duplicates by name/url
        const merged = [...dbVideos];
        STATIC_VIDEOS.forEach(staticItem => {
          const exists = merged.some(m => m.name.toLowerCase() === staticItem.name.toLowerCase() || m.video_url === staticItem.video_url);
          if (!exists) {
            merged.push(staticItem);
          }
        });

        setVideos(merged);
      } catch (err) {
        console.warn("Failed to fetch dynamic video reviews, using fallback:", err);
        setVideos(STATIC_VIDEOS);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoReviews();
  }, []);

  const filteredVideos = videos.filter(v => {
    if (filter === 'all') return true;
    return v.type === filter;
  });

  const handleBookClick = (e) => {
    e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-slate-50 font-body text-left relative pt-0 pb-24 min-h-screen">
      <PageBreadcrumbHero
        title="Video Testimonials"
        breadcrumbs={[{ label: 'Video Testimonials', active: true }]}
      />

      <div className="max-w-7xl mx-auto px-6 mt-12">
        {/* Category Filters */}
        <div className="flex justify-center gap-3 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-xl font-headline font-bold text-xs uppercase tracking-wider transition-all border ${filter === 'all'
              ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white border-transparent shadow-md'
              : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'
              }`}
          >
            All Videos ({videos.length})
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-5 py-2.5 rounded-xl font-headline font-bold text-xs uppercase tracking-wider transition-all border ${filter === 'video'
              ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white border-transparent shadow-md'
              : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'
              }`}
          >
            YouTube Reviews
          </button>
          <button
            onClick={() => setFilter('instagram')}
            className={`px-5 py-2.5 rounded-xl font-headline font-bold text-xs uppercase tracking-wider transition-all border ${filter === 'instagram'
              ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white border-transparent shadow-md'
              : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'
              }`}
          >
            Instagram Reels
          </button>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredVideos.map((video) => {
              const videoId = parseVideoLink(video.video_url, video.type);
              return (
                <div
                  key={video.id}
                  onClick={() => videoId && setActiveVideo({ ...video, parsedId: videoId })}
                  className={`bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col p-2 group ${videoId ? 'cursor-pointer' : ''}`}
                >
                  {/* Thumbnail / Video Container */}
                  <div className="relative aspect-[9/16] w-full overflow-hidden bg-slate-900 rounded-2xl border border-slate-100">
                    <img
                      src={video.video_thumbnail}
                      alt={video.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Platform Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      {video.type === 'video' ? (
                        <div className="w-7 h-7 rounded-lg bg-[#FF0000] flex items-center justify-center shadow-md">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.516 3.5 12 3.5 12 3.5s-7.516 0-9.387.555A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.484 20.5 12 20.5 12 20.5s7.516 0 9.387-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center shadow-md">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-300 flex items-center justify-center">
                      <span className={`w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300 ${video.type === 'instagram' ? 'text-[#E1306C]' : 'text-brandBlue'}`}>
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-grow flex flex-col justify-between text-left">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-headline font-extrabold text-sm text-slate-900 truncate">{video.name}</h4>
                        <div className="flex gap-0.5 text-amber-400">
                          {[...Array(video.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-brandSky font-bold uppercase tracking-wider">{video.treatment} &bull; {video.location}</p>
                      <p className="text-slate-500 text-[11px] leading-relaxed italic line-clamp-3">"{video.text}"</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredVideos.length === 0 && !loading && (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-2xl">
            <p className="text-slate-500 font-headline font-bold text-lg">No video testimonials found.</p>
            <p className="text-slate-400 text-xs mt-1">Try another category tab.</p>
          </div>
        )}
      </div>

      {/* Video Modal Player Dialog */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={() => setActiveVideo(null)}></div>

            <div className="bg-slate-950 w-full max-w-[360px] sm:w-[380px] aspect-[9/16] max-h-[85vh] relative border-[8px] border-white rounded-[2.5rem] shadow-2xl z-10">
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-3 -right-3 z-50 w-9 h-9 rounded-full bg-black border border-white/10 text-brandSky hover:text-brandSky/85 hover:scale-110 flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full h-full rounded-[2rem] overflow-hidden bg-black relative">
                {activeVideo.type === 'video' ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.parsedId}?autoplay=1`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube video player"
                  ></iframe>
                ) : (
                  <iframe
                    src={`https://www.instagram.com/reel/${activeVideo.parsedId}/embed/`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Instagram Reel"
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
