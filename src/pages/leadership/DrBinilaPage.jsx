import React from 'react';
import PageBreadcrumbHero from '../../components/common/PageBreadcrumbHero';
import { ShieldCheck, Award, GraduationCap, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DrBinilaPage() {
  const navigate = useNavigate();

  const handleCtaClick = (e) => {
    e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#FAFBFD] font-body text-left relative pt-0 overflow-hidden min-h-screen">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandSky/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-brandBlue/5 rounded-full blur-3xl pointer-events-none"></div>

      <PageBreadcrumbHero 
        title="Dr. C. Binila Bladbin" 
        breadcrumbs={[
          { label: 'About Jerush', path: '/about' },
          { label: 'Dr. C. Binila Bladbin', active: true }
        ]} 
      />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Profile Image & Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-white p-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 relative">
                <img 
                  src="/images/doctors/dr-binila-parallax.webp" 
                  alt="Dr. C. Binila Bladbin" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600';
                  }}
                />
              </div>
            </div>

            {/* Quick Stats/Badges */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm max-w-md mx-auto space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brandBlue/5 flex items-center justify-center text-brandBlue shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-headline font-bold text-xs text-slate-800 uppercase tracking-wide">Designation</h5>
                  <p className="text-sm text-slate-600 font-semibold">Managing Director</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brandBlue/5 flex items-center justify-center text-brandBlue shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-headline font-bold text-xs text-slate-800 uppercase tracking-wide">Experience</h5>
                  <p className="text-sm text-slate-600 font-semibold">20+ Years in Oral & Maxillofacial Care</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brandBlue/5 flex items-center justify-center text-brandBlue shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-headline font-bold text-xs text-slate-800 uppercase tracking-wide">Primary Location</h5>
                  <p className="text-sm text-slate-600 font-semibold">Thuckalay main hospital</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Qualifications & Biography */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-bold text-brandSky uppercase tracking-widest leading-none block mb-2">
                Managing Director & Co-Founder
              </span>
              <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-primary">
                DR. C. BINILA BLADBIN
              </h2>
              <p className="text-brandBlue font-semibold text-xs sm:text-sm font-headline tracking-wide uppercase mt-1">
                MDS (Oral & Maxillofacial Surgery)
              </p>
              <p className="text-slate-800 font-bold font-headline text-base mt-2">
                Oral & Maxillofacial Surgeon & Cosmetologist
              </p>
            </div>

            {/* Qualifications / Achievements List */}
            <div className="space-y-4">
              <h3 className="font-headline font-extrabold text-lg text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brandSky" />
                Key Focus & Expertise
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky mt-2 shrink-0"></span>
                  <span>Oral and Maxillofacial Reconstructive Surgery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky mt-2 shrink-0"></span>
                  <span>Certified in Clinical Cosmetology & Laser Aesthetics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky mt-2 shrink-0"></span>
                  <span>Over 20 Years of Clinical Dental & Surgical Practice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky mt-2 shrink-0"></span>
                  <span>Expertise in Restorative and Aesthetic Dentistry</span>
                </li>
              </ul>
            </div>

            {/* Biography text */}
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <h3 className="font-headline font-extrabold text-lg text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brandSky" />
                Professional Biography
              </h3>
              <p>
                Dr. C. Binila Bladbin serves as the esteemed Managing Director of the Jerush Dental Hospitals and Cosmetic Laser Groups. With over 20 years of clinical experience, she stands as one of the most prominent Maxillofacial Surgeons and Cosmetologists in South India.
              </p>
              <p>
                Dr. Binila graduated with her BDS in 2004, and subsequently completed her postgraduate Master's degree (MDS) in Oral & Maxillofacial Surgery in 2012. Her clinical expertise spans complex oral surgical extractions, jaw reconstructions, and advanced laser aesthetics.
              </p>
              <p>
                As Managing Director, she has been instrumental in overseeing clinical quality parameters, implementing international sterilization protocols, and ensuring empathetic, high-standard patient care across all branches.
              </p>
            </div>

            {/* CTA Book appointment */}
            <div className="pt-6">
              <a
                href="#"
                onClick={handleCtaClick}
                className="inline-flex items-center gap-2 px-8 py-4 bg-brandBlue text-white font-headline font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Schedule consultation with Dr. Binila
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
