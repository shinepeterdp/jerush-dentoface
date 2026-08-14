import React from 'react';
import PageBreadcrumbHero from '../../components/common/PageBreadcrumbHero';
import { ShieldCheck, Award, GraduationCap, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DrPrabinPage() {
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
        title="Dr. A. Prabin"
        breadcrumbs={[
          { label: 'About Jerush', path: '/about' },
          { label: 'Dr. A. Prabin', active: true }
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Side: Profile Image & Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-white p-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 relative">
                <img
                  src="/images/adminstration/prabin-chief-executive-officer.webp"
                  alt="Dr. A. Prabin"
                  className="w-full h-full object-cover"
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
                  <p className="text-sm text-slate-600 font-semibold">Chief Executive Officer</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brandBlue/5 flex items-center justify-center text-brandBlue shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-headline font-bold text-xs text-slate-800 uppercase tracking-wide">Role</h5>
                  <p className="text-sm text-slate-600 font-semibold">Operations, Growth & Quality Control</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brandBlue/5 flex items-center justify-center text-brandBlue shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-headline font-bold text-xs text-slate-800 uppercase tracking-wide">Headquarters</h5>
                  <p className="text-sm text-slate-600 font-semibold">Jerush Corporate HQ</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Qualifications & Biography */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-bold text-brandSky uppercase tracking-widest leading-none block mb-2">
                Chief Executive Officer
              </span>
              <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-primary">
                DR. A. PRABIN
              </h2>
              <p className="text-brandBlue font-semibold text-xs sm:text-sm font-headline tracking-wide uppercase mt-1">
                BDS, MBA (Healthcare Management)
              </p>
              <p className="text-slate-800 font-bold font-headline text-base mt-2">
                Chief Executive Officer | Healthcare Operations Director
              </p>
            </div>

            {/* Key Focus & Expertise */}
            <div className="space-y-4">
              <h3 className="font-headline font-extrabold text-lg text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brandSky" />
                Administrative & Clinical Excellence
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky mt-2 shrink-0"></span>
                  <span>Strategic Expansion & Infrastructure Development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky mt-2 shrink-0"></span>
                  <span>Quality Assurance & Medical Protocol Oversight</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky mt-2 shrink-0"></span>
                  <span>Clinical Patient Flow Optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky mt-2 shrink-0"></span>
                  <span>Healthcare Compliance & Branch Integration</span>
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
                Dr. A. Prabin is a Chief Executive Officer with over 25 years of experience in Electrical engineering, specifically within the Healthcare sector. Holding a Doctorate in Electrical Engineering, along with Bachelor’s and Master’s degrees.
              </p>
              <p>
                Dr. Prabin blends technical excellence with strong leadership and business acumen.He is particularly skilled in account management, where he is responsible for managing key client relationships, ensuring satisfaction, and driving business growth. He works closely with healthcare providers, technology suppliers and stakeholders to ensure that services and products meet the highest quality standards and are aligned with customer needs.
              </p>
              <p>
                .His ability to balance technical innovation with strategic account management enables him to not only deliver cutting-edge healthcare solutions but also manage the financial and operational aspects of client relationships. He ensures that each project is delivered on time, within budget and meets both technical and commercial objectives, fostering long-term partnerships with clients.
              </p>
              <p>
                .His leadership is characterised by a strong focus on client retention, business development and cross-functional collaboration, allowing him to drive continuous improvements and sustainable growth in the healthcare sector.
              </p>
            </div>

            {/* CTA Book appointment */}
            <div className="pt-6">
              <a
                href="#"
                onClick={handleCtaClick}
                className="inline-flex items-center gap-2 px-8 py-4 bg-brandBlue text-white font-headline font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Connect with CEO's Office
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
