import React, { useState, useEffect } from 'react';
import { doctorService } from '../services/doctorService';
import { Search } from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import DoctorProfileModal from '../components/common/DoctorProfileModal';

export default function DoctorsPage() {
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const data = await doctorService.getDoctors();
        setDoctorsList(data);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);



  const filteredDoctors = doctorsList.filter((doc) => {
    const query = searchQuery.toLowerCase();
    return (
      doc.name.toLowerCase().includes(query) ||
      doc.role.toLowerCase().includes(query) ||
      doc.qualification.toLowerCase().includes(query) ||
      doc.specialties.some(spec => spec.toLowerCase().includes(query))
    );
  });

  return (
    <div className="w-full bg-slate-50 font-body text-left relative pt-0 pb-24 min-h-screen">
      {/* Page Header */}
      <PageBreadcrumbHero 
        title="Our Specialists" 
        breadcrumbs={[{ label: 'Doctors', active: true }]} 
      />

      <div className="jerush-container pt-12">
        {/* Search Bar */}
        <div className="flex justify-end mb-10">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search specialists by name or role..."
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoctor(doc)}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between w-full max-w-[290px] sm:max-w-none mx-auto relative overflow-hidden"
              >
                {/* Soft glow accents */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brandSky/5 group-hover:bg-gradient-to-br group-hover:from-brandBlue/20 group-hover:to-brandSky/30 group-hover:scale-125 transition-all duration-500 pointer-events-none -translate-y-10 translate-x-10" />

                <div className="relative z-10">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden mb-5 bg-slate-100 relative">
                    <img
                      src={doc.image || doc.fallbackImg}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 will-change-transform backface-hidden"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = doc.fallbackImg;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-[10px] text-white font-headline font-bold uppercase tracking-wider bg-brandSky/95 px-3 py-1.5 rounded-lg">
                        View Profile
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <h4 className="font-headline font-extrabold text-base text-primary group-hover:text-brandBlue transition-colors leading-tight">
                      {doc.name}
                    </h4>
                    <p className="text-brandSky font-bold text-[11px] uppercase tracking-wider">
                      {doc.role}
                    </p>
                    <p className="text-slate-400 text-xs font-semibold leading-snug">
                      {doc.qualification}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-secondary font-headline font-bold uppercase tracking-wide">
                  <span>{doc.experience}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-brandBlue group-hover:to-brandSky text-slate-500 group-hover:text-white flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                    <span className="text-sm font-bold group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredDoctors.length === 0 && !loading && (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-2xl">
            <p className="text-slate-500 font-headline font-bold text-lg">No specialists found.</p>
            <p className="text-slate-400 text-xs mt-1">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <DoctorProfileModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
}
