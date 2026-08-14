import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users2, Award, Search } from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import { teamService } from '../services/teamService';
import { teamDepartments } from '../data/team';

// Department icon colours for visual variety
const DEPT_COLOURS = {
  management: 'from-violet-500 to-purple-600',
  pro: 'from-brandBlue to-brandSky',
  accounts: 'from-emerald-500 to-teal-600',
  aligners: 'from-sky-500 to-cyan-500',
  radiology: 'from-amber-500 to-orange-500',
  it: 'from-indigo-500 to-violet-500',
  dental_assistants: 'from-rose-400 to-pink-500',
  cosmetic_assistants: 'from-fuchsia-500 to-pink-600',
  front_desk: 'from-brandSky to-cyan-400',
  maintenance: 'from-slate-500 to-slate-600',
  housekeeping: 'from-green-400 to-emerald-500',
  security: 'from-red-500 to-rose-600',
};

const BRANCH_BADGE = {
  'Jerush Head Clinic – Thuckalay': 'bg-brandBlue/8 text-brandBlue border-brandBlue/15',
  'Jerush Chennai Branch': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Jerush Trichy Branch': 'bg-amber-50 text-amber-700 border-amber-200',
  'Jerush Groups': 'bg-violet-50 text-violet-700 border-violet-200',
};

function getInitials(name) {
  return name.split(' ').filter(Boolean).slice(-2).map(n => n[0]).join('').toUpperCase();
}

export default function TeamPage() {
  const [allMembers, setAllMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDept, setActiveDept] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    teamService.getTeamMembers()
      .then(data => { setAllMembers(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const deptCounts = teamDepartments.reduce((acc, d) => {
    acc[d.id] = allMembers.filter(m => m.department === d.id).length;
    return acc;
  }, {});

  const filtered = allMembers.filter(m => {
    const matchesDept = activeDept === 'all' || m.department === activeDept;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || (m.branch || '').toLowerCase().includes(q);
    return matchesDept && matchesSearch;
  });

  // Group by department for display
  const grouped = teamDepartments
    .filter(d => activeDept === 'all' ? deptCounts[d.id] > 0 : d.id === activeDept)
    .map(d => ({
      ...d,
      members: filtered.filter(m => m.department === d.id)
    }))
    .filter(d => d.members.length > 0);

  return (
    <div className="w-full bg-slate-50 font-body text-left relative min-h-screen">
      <PageBreadcrumbHero
        title="Our Team"
        breadcrumbs={[{ label: 'Our Team', active: true }]}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Headline + stats bar */}
        <div className="text-center mb-10 space-y-3">
          <span className="inline-block text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3 py-1.5 rounded-full border border-brandSky/15">
            Behind the Smiles
          </span>
          <h1 className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900">
            The Passionate Team at Jerush Dentofacial
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
            Every great smile begins with an equally great team. Meet the dedicated professionals who work tirelessly behind the scenes across all our branches.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-3">
            <div className="text-center">
              <p className="font-headline font-black text-2xl text-brandBlue">{allMembers.length}+</p>
              <p className="text-xs text-slate-400 font-semibold">Team Members</p>
            </div>
            <div className="text-center">
              <p className="font-headline font-black text-2xl text-brandBlue">{teamDepartments.length}</p>
              <p className="text-xs text-slate-400 font-semibold">Departments</p>
            </div>
            <div className="text-center">
              <p className="font-headline font-black text-2xl text-brandBlue">4+</p>
              <p className="text-xs text-slate-400 font-semibold">Branches</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, role, or branch..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 text-slate-800 rounded-xl placeholder-slate-400 focus:outline-none focus:border-brandSky transition-colors text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Department filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            onClick={() => setActiveDept('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeDept === 'all'
                ? 'bg-brandBlue text-white border-brandBlue shadow-md'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
          >
            All ({allMembers.length})
          </button>
          {teamDepartments.filter(d => deptCounts[d.id] > 0).map(d => (
            <button
              key={d.id}
              onClick={() => setActiveDept(d.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeDept === d.id
                  ? 'bg-brandBlue text-white border-brandBlue shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
            >
              {d.label} ({deptCounts[d.id]})
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 flex justify-center">
            <div className="w-10 h-10 border-4 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Department sections */}
        {!loading && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDept + searchQuery}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-14"
            >
              {grouped.map((dept, di) => {
                const gradient = DEPT_COLOURS[dept.id] || 'from-brandBlue to-brandSky';
                return (
                  <motion.div
                    key={dept.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: di * 0.05 }}
                  >
                    {/* Department header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm shrink-0`}>
                        <Users2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="font-headline font-extrabold text-lg text-slate-900">{dept.label}</h2>
                        <p className="text-xs text-slate-400 font-semibold">{dept.members.length} member{dept.members.length !== 1 ? 's' : ''}</p>
                      </div>
                      <div className="flex-1 h-px bg-slate-100 ml-2" />
                    </div>

                    {/* Member cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {dept.members.map((member, mi) => {
                        const branchClass = BRANCH_BADGE[member.branch] || 'bg-slate-50 text-slate-500 border-slate-200';
                        return (
                          <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: mi * 0.05 }}
                            className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between w-full max-w-[290px] sm:max-w-none mx-auto relative overflow-hidden"
                          >
                            {/* Soft glow accents */}
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brandSky/5 group-hover:bg-gradient-to-br group-hover:from-brandBlue/20 group-hover:to-brandSky/30 group-hover:scale-125 transition-all duration-500 pointer-events-none -translate-y-10 translate-x-10" />

                            <div className="relative z-10">
                              {/* Aspect-ratio photo container */}
                              <div className={`aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-gradient-to-br ${gradient} relative flex items-center justify-center`}>
                                <span className="font-headline font-black text-2xl text-white/80 absolute z-0 select-none">
                                  {getInitials(member.name)}
                                </span>
                                {member.image && (
                                  <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover object-top relative z-10 transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                  />
                                )}
                              </div>

                              <div className="space-y-1.5 text-left px-1">
                                <h4 className="font-headline font-extrabold text-base text-primary group-hover:text-brandBlue transition-colors leading-tight">
                                  {member.name}
                                </h4>
                                <p className="text-brandSky font-bold text-[11px] uppercase tracking-wider">
                                  {member.role}
                                </p>
                              </div>
                            </div>

                            {member.branch && (
                              <div className="relative z-10 mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                                <div className={`inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full border ${branchClass}`}>
                                  <MapPin className="w-2.5 h-2.5 shrink-0" />
                                  <span className="truncate max-w-[130px]">{member.branch.replace('Jerush ', '').replace(' – Thuckalay', '')}</span>
                                </div>
                                <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-brandBlue group-hover:to-brandSky text-slate-500 group-hover:text-white flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                                  <span className="text-xs font-bold group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}

              {grouped.length === 0 && !loading && (
                <div className="text-center py-20">
                  <p className="text-slate-400 font-headline font-bold text-lg">No team members found.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Note */}
        <p className="text-center text-xs text-slate-400 mt-16">
          This page features all currently listed team members. More departments will be added as they are updated.
        </p>
      </div>
    </div>
  );
}
