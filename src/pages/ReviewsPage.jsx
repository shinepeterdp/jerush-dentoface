import React, { useState, useEffect } from 'react';
import { reviewService } from '../services/reviewService';
import { reviews } from '../data/reviews';
import { Search, Star } from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';

export default function ReviewsPage() {
  const [reviewsList, setReviewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const data = await reviewService.getReviews();
        // Enrich reviews with static fallback images if DB image is empty
        const enriched = data.map(rev => {
          if (!rev.image) {
            const cleanName = (name) => name.toLowerCase()
              .replace(/^(shri\.|mr\.|mrs\.|dr\.)\s+/gi, '')
              .replace(/[^a-z0-9]/gi, '');
            const dbClean = cleanName(rev.name);
            const matchingStatic = reviews.find(r => {
              const staticClean = cleanName(r.name);
              return staticClean.includes(dbClean) || dbClean.includes(staticClean);
            });
            if (matchingStatic && matchingStatic.image) {
              return { ...rev, image: matchingStatic.image };
            }
          }
          return rev;
        });
        setReviewsList(enriched);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const filteredReviews = reviewsList.filter((rev) => {
    const query = searchQuery.toLowerCase();
    return (
      rev.name.toLowerCase().includes(query) ||
      rev.location.toLowerCase().includes(query) ||
      rev.treatment.toLowerCase().includes(query) ||
      rev.text.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full bg-slate-50 font-body text-left relative pt-0 pb-24 min-h-screen">
      {/* Page Header */}
      <PageBreadcrumbHero 
        title="Patient Reviews" 
        breadcrumbs={[{ label: 'Reviews', active: true }]} 
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Search Bar */}
        <div className="flex justify-end mb-10">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by treatment, name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 text-slate-800 rounded-xl placeholder-slate-400 focus:outline-none focus:border-brandSky transition-colors text-sm shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 relative"
              >
                {/* Quote symbol decoration */}
                <div className="absolute top-4 right-6 text-slate-100 text-7xl font-serif select-none pointer-events-none">
                  “
                </div>

                <div className="space-y-4 relative z-10">
                  {/* Stars */}
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-sm sm:text-base italic leading-relaxed text-slate-600 font-medium">
                    "{rev.text}"
                  </blockquote>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-4 border-t border-slate-50 relative z-10">
                  {/* Avatar Profile */}
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-100 shrink-0 bg-slate-100 flex items-center justify-center select-none shadow-sm">
                    {rev.image ? (
                      <img 
                        src={rev.image} 
                        alt={rev.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-brandBlue to-brandSky flex items-center justify-center text-white font-extrabold text-base uppercase">
                        {rev.name.replace(/^(Shri\.|Mr\.|Mrs\.)\s+/i, '').split(/\s+/).map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    )}
                  </div>

                  <div className="text-left">
                    <h4 className="font-headline font-extrabold text-sm sm:text-base text-slate-900 leading-none">
                      {rev.name}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-1 font-bold uppercase tracking-wider">
                      {rev.treatment} &bull; {rev.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredReviews.length === 0 && !loading && (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-2xl">
            <p className="text-slate-500 font-headline font-bold text-lg">No reviews found.</p>
            <p className="text-slate-400 text-xs mt-1">Try adapting your query terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
