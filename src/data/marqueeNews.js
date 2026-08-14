export const defaultMarqueeSettings = {
  enabled: true,
  speed: 'normal', // 'slow' (40s), 'normal' (25s), 'fast' (15s)
  pauseOnHover: true,
  theme: 'dark-gradient', // 'dark-gradient', 'brand-blue', 'sky-glow', 'emerald-notice', 'amber-alert'
  showLiveBadge: true,
  liveBadgeText: 'LIVE UPDATES',
};

export const defaultMarqueeItems = [
  {
    id: 1,
    title: 'Free International Dental & Skin Consultation Camp — Special Booking Offer!',
    badge: 'OFFER',
    badgeColor: 'bg-emerald-500 text-white',
    link: '/contact',
    linkText: 'Book Free Slot',
    isActive: true,
    priority: 1,
  },
  {
    id: 2,
    title: 'German 3D Intraoral Scanning & Digital Aligners now available across all Jerush centres.',
    badge: 'NEW TECH',
    badgeColor: 'bg-brandSky text-white',
    link: '/treatments/dental/jerush-aligners',
    linkText: 'Explore Aligners',
    isActive: true,
    priority: 2,
  },
  {
    id: 3,
    title: '24/7 Emergency Dental & Maxillofacial Trauma Care Line: Call +91 94891 60055',
    badge: 'HELPLINE',
    badgeColor: 'bg-rose-500 text-white',
    link: 'tel:+919489160055',
    linkText: 'Call Emergency',
    isActive: true,
    priority: 3,
  },
  {
    id: 4,
    title: 'Jerush Dubai Deira Clinic Special — 20% Discount on Smile Makeovers & Dimple Creation',
    badge: 'DUBAI SPECIAL',
    badgeColor: 'bg-amber-500 text-slate-950 font-black',
    link: 'tel:+971507253105',
    linkText: 'Call Dubai Branch',
    isActive: true,
    priority: 4,
  },
  {
    id: 5,
    title: 'Free Hair Density & Trichology Diagnostics with German Certified Specialists',
    badge: 'FEATURED',
    badgeColor: 'bg-purple-500 text-white',
    link: '/treatments/hair/hair-reduction-treatment',
    linkText: 'Learn More',
    isActive: true,
    priority: 5,
  },
];
