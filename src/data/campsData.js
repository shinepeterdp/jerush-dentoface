export const CAMP_CATEGORIES = [
  { id: 'all', label: 'All Camps', count: 6 },
  { id: 'upcoming', label: 'Upcoming Camps', count: 2 },
  { id: 'rural', label: 'Rural & Village Outreach', count: 2 },
  { id: 'school', label: 'School Smile Bright', count: 1 },
  { id: 'specialist', label: 'Specialist Screening', count: 1 }
];

export const CAMP_SERVICES = [
  {
    id: 'oral-cancer',
    title: 'Free Oral Cancer Screening',
    description: 'Specialized visual & VELscope screening for early detection of pre-cancerous lesions, leukoplakia, and tobacco-induced mucosal changes.',
    icon: 'ShieldCheck',
    badge: '100% Free'
  },
  {
    id: 'cavity-detection',
    title: 'Digital Caries & Gum Diagnosis',
    description: 'Comprehensive dental charting, periodontal probing, and intraoral camera diagnostics to identify hidden cavities and gingival inflammation.',
    icon: 'Search',
    badge: 'Digital Imaging'
  },
  {
    id: 'pediatric-fluoride',
    title: 'Pediatric Pit & Fissure Sealants',
    description: 'Fluoride varnish application and protective fissure sealants for school children to prevent milk & permanent tooth decay.',
    icon: 'Sparkles',
    badge: 'Children Care'
  },
  {
    id: 'scaling-token',
    title: 'Subsidized Cleaning & Scaling Tokens',
    description: 'Distribution of subsidized ultrasonic tartar removal vouchers and free antiseptic mouthwash rinses for community members.',
    icon: 'CheckCircle2',
    badge: 'Hygiene Pass'
  },
  {
    id: 'emergency-extractions',
    title: 'Mobile Pain Relief & Extractions',
    description: 'Emergency chairside pain management, mobile extractions for severely decayed non-restorable teeth with zero discomfort.',
    icon: 'Activity',
    badge: 'Immediate Relief'
  },
  {
    id: 'free-hygiene-kits',
    title: 'Free Oral Hygiene Kits & Pastes',
    description: 'Complimentary distribution of branded soft-bristle toothbrushes, fluoridated toothpaste, and oral hygiene educational flyers.',
    icon: 'Gift',
    badge: 'Giveaway'
  }
];

export const CAMP_STATS = [
  { value: '150+', label: 'Camps Conducted', sub: 'Across Tamil Nadu & Kerala' },
  { value: '45,000+', label: 'Patients Screened', sub: 'Adults, Children & Seniors' },
  { value: '100%', label: 'Free Diagnostics', sub: 'Zero Consultation Charges' },
  { value: '25+', label: 'Years Legacy', sub: 'Under Dr. A. Bladbin' }
];

export const defaultCamps = [
  {
    id: 'mega-camp-thuckalay-2026',
    title: 'Mega Free Dental & Oral Health Screening Camp',
    tagline: 'Comprehensive Oral Care & Free Specialist Consultations for All Age Groups',
    category: 'upcoming',
    campType: 'Rural & Community Outreach',
    status: 'upcoming',
    date: 'September 28, 2026',
    isoDate: '2026-09-28T09:00:00',
    time: '9:00 AM – 4:30 PM',
    location: 'Jerush Community Hall, Near Bus Stand, Thuckalay',
    targetBeneficiaries: 'General Public, Senior Citizens & School Students',
    expectedBeneficiaries: '600+ Patients',
    leadDoctors: 'Dr. A. Bladbin, MDS, PhD & Dr. C. Binila Asir, MDS',
    teamSize: '8 Dental Surgeons, 4 Hygienists, 6 Nursing Staff',
    coverImage: '/images/events/jerushaligne-opening-event/jerushaligne-manufacturing-units-open.webp',
    galleryImages: [
      '/images/events/jerushaligne-opening-event/jerushaligne-manufacturing-units-open.webp',
      '/images/events/dr-bladbin-birthday/bladbin-birthday-cover.webp'
    ],
    servicesProvided: [
      'Free Oral Cancer & Leukoplakia Screening',
      'Digital Intraoral Camera Checkups',
      'Free Fluoride Treatment for Kids',
      'Tooth Extraction for Emergency Pain Relief',
      'Free Toothbrush & Paste Kit Distribution',
      '50% Concession Vouchers for Crowns & Bridges'
    ],
    description: 'Jerush Dentofacial is organizing a mega one-day dental outreach camp to provide free high-standard oral diagnosis, pain relief, and hygiene awareness to families in and around Thuckalay, Marthandam, and Kanyakumari district.',
    organizer: 'Jerush Medical Foundation & Rotary Club of Thuckalay',
    contactNumber: '+91 94891 60055',
    registrationRequired: true,
    capacity: 500,
    registeredCount: 142
  },
  {
    id: 'school-smile-nagercoil-2026',
    title: 'School Smile Bright — Pediatric Preventive Dental Camp',
    tagline: 'Empowering Children with Healthy Cavity-Free Smiles & Good Oral Habits',
    category: 'school',
    campType: 'School Smile Bright',
    status: 'upcoming',
    date: 'October 12, 2026',
    isoDate: '2026-10-12T09:30:00',
    time: '9:30 AM – 3:30 PM',
    location: 'St. Joseph Higher Secondary School Auditorium, Nagercoil',
    targetBeneficiaries: 'Primary & High School Students (Ages 5–16)',
    expectedBeneficiaries: '850+ Students',
    leadDoctors: 'Dr. Sherine Ponraj, MDS & Dr. Suryambika, BDS',
    teamSize: '5 Pediatric Dental Specialists, 6 Clinical Assistants',
    coverImage: '/images/events/dr-bladbin-birthday/bladbin-birthday-cover.webp',
    galleryImages: [
      '/images/events/dr-bladbin-birthday/bladbin-birthday-cover.webp'
    ],
    servicesProvided: [
      'Milk & Permanent Tooth Decay Screening',
      'Pit & Fissure Sealant Applications',
      'Topical Fluoride Cavity Barrier Varnish',
      'Brushing Technique Interactive Demonstration',
      'Personalized Dental Health Report Card for Parents',
      'Free Smile Champion Medals & Dental Care Kits'
    ],
    description: 'A comprehensive school-level oral health intervention aiming to eliminate childhood caries, promote dietary awareness, and instruct proper two-minute circular brushing methods.',
    organizer: 'Jerush Pediatric Dental Wing & School PTA',
    contactNumber: '+91 94891 60055',
    registrationRequired: false,
    capacity: 900,
    registeredCount: 380
  },
  {
    id: 'coastal-geriatric-kanyakumari-2026',
    title: 'Coastal Community Free Denture & Senior Oral Health Camp',
    tagline: 'Restoring Chewing Function, Nutrition & Dignity for Elderly Coastal Residents',
    category: 'rural',
    campType: 'Rural & Village Outreach',
    status: 'completed',
    date: 'July 18, 2026',
    isoDate: '2026-07-18T09:00:00',
    time: '9:00 AM – 5:00 PM',
    location: 'St. Mary\'s Parish Community Centre, Colachel Coastal Road',
    targetBeneficiaries: 'Fishermen Families, Elderly Citizens (Ages 55+)',
    expectedBeneficiaries: '450+ Screened',
    leadDoctors: 'Dr. A. Bladbin, MDS, PhD & Dr. C. Binila Asir, MDS',
    teamSize: '6 Maxillofacial Specialists, 4 Prosthodontists',
    coverImage: '/images/events/jerushaligne-opening-event/jerushaligne-manufacturing-units-open.webp',
    galleryImages: [
      '/images/events/jerushaligne-opening-event/jerushaligne-manufacturing-units-open.webp'
    ],
    servicesProvided: [
      'Complete & Partial Removable Denture Consultations',
      'Free Mobile Tooth Extractions for Mobility & Pain',
      'Periodontal Root Cleaning & Antiseptic Irrigation',
      'Tobacco & Betel Nut Pre-Cancer Screening',
      'Blood Pressure & Blood Sugar Cross-Screening',
      'Free Vitamin Supplements & Denture Cleansing Tablets'
    ],
    description: 'A deeply impactful outreach focused on geriatric coastal patients suffering from tooth loss and chewing difficulty, resulting in 48 subsidized complete dentures delivered post-camp.',
    organizer: 'Jerush Charitable Trust & Coastal Fishermen Welfare Association',
    contactNumber: '+91 94891 60055',
    registrationRequired: false,
    capacity: 500,
    registeredCount: 472
  },
  {
    id: 'industrial-workers-trichy-2026',
    title: 'Industrial Workforce Ergonomic & Dental Wellness Camp',
    tagline: 'Preventive Oral Health, Stress Jaw Care & TMJ Screening for Factory Employees',
    category: 'specialist',
    campType: 'Specialist Screening',
    status: 'completed',
    date: 'May 22, 2026',
    isoDate: '2026-05-22T10:00:00',
    time: '10:00 AM – 4:00 PM',
    location: 'SIDCO Industrial Estate Recreation Centre, Thuvakudi, Trichy',
    targetBeneficiaries: 'Manufacturing Technicians, Shift Workers & Staff',
    expectedBeneficiaries: '320+ Workers',
    leadDoctors: 'Dr. A. Prabin, CEO & Dr. C. Binila Asir, MDS',
    teamSize: '4 Dental Specialists, 3 Occupational Health Staff',
    coverImage: '/images/events/dr-bladbin-birthday/bladbin-birthday-cover.webp',
    galleryImages: [
      '/images/events/dr-bladbin-birthday/bladbin-birthday-cover.webp'
    ],
    servicesProvided: [
      'Stress-Related Teeth Grinding (Bruxism) & TMJ Assessment',
      'Night Guard Prescription & Bite Alignment Consultations',
      'Oral Cancer & Tobacco Cessation Counseling',
      'Ultrasonic Calculus Removal Tokens',
      'Full Mouth Panoramic X-Ray Referrals'
    ],
    description: 'Organized in collaboration with industrial unions to assess work-stress related jaw clenching, attrition, and provide preventive dental care for heavy machinery technicians.',
    organizer: 'Jerush Trichy Super-Speciality Dental Centre',
    contactNumber: '+91 94891 60055',
    registrationRequired: true,
    capacity: 350,
    registeredCount: 318
  },
  {
    id: 'marthandam-tribal-outreach-2026',
    title: 'Hill Tracts & Forest Fringe Community Oral Health Mission',
    tagline: 'Reaching the Unreached with Mobile Dental Operatory & Advanced Sterilization',
    category: 'rural',
    campType: 'Rural & Village Outreach',
    status: 'completed',
    date: 'March 14, 2026',
    isoDate: '2026-03-14T09:00:00',
    time: '9:00 AM – 4:00 PM',
    location: 'Pechiparai Tribal Settlement Welfare School Grounds',
    targetBeneficiaries: 'Indigenous Residents, Forest Fringe Families & Children',
    expectedBeneficiaries: '280+ Screened',
    leadDoctors: 'Dr. A. Bladbin, MDS, PhD',
    teamSize: '5 Mobile Dental Surgeons, 4 Field Volunteers',
    coverImage: '/images/events/jerushaligne-opening-event/jerushaligne-manufacturing-units-open.webp',
    galleryImages: [
      '/images/events/jerushaligne-opening-event/jerushaligne-manufacturing-units-open.webp'
    ],
    servicesProvided: [
      'Mobile Unit Restorations (Glass Ionomer Fillings)',
      'Atraumatic Restorative Treatment (ART)',
      'Severe Pulpitis Pain Relief & Medication',
      'Childhood Malnutrition & Dental Fluorosis Study',
      'Free Toothpaste & Toothbrush Kits for 200+ Children'
    ],
    description: 'Equipped with Jerush’s portable dental operatory, doctors traveled deep into forest settlements to deliver clean, sterilized dental treatment where healthcare access was minimal.',
    organizer: 'Jerush Tribal Healthcare Outreach Program',
    contactNumber: '+91 94891 60055',
    registrationRequired: false,
    capacity: 300,
    registeredCount: 285
  }
];

export const defaultCampInquiries = [
  {
    id: 'inq-101',
    organizationName: 'Rotary Club of Marthandam',
    contactPerson: 'Mr. S. Rajendran',
    designation: 'Community Service Director',
    phone: '+91 98421 77211',
    email: 'rajendran.rotary@gmail.com',
    preferredDate: '2026-11-15',
    location: 'Marthandam Town Hall',
    campType: 'General Community Dental Camp',
    expectedCount: '300-400 People',
    notes: 'We would like to request Jerush Mobile Dental Unit for a Sunday free screening camp focusing on rural families.',
    status: 'approved',
    submittedAt: '2026-08-10T14:30:00'
  },
  {
    id: 'inq-102',
    organizationName: 'Little Flower Matriculation School',
    contactPerson: 'Sister Philomina',
    designation: 'Principal',
    phone: '+91 94432 88123',
    email: 'littleflower.thuckalay@edu.in',
    preferredDate: '2026-11-28',
    location: 'School Campus, Thuckalay',
    campType: 'School Pediatric Screening',
    expectedCount: '650 Students',
    notes: 'Requesting pediatric screening for grades 1 to 8 with toothbrush distribution.',
    status: 'pending',
    submittedAt: '2026-08-15T11:15:00'
  }
];
