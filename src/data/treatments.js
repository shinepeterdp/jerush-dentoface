export const treatments = [
  // ─────────────────────────────────────────────────────────────
  // 🦷 DENTAL CARE
  // ─────────────────────────────────────────────────────────────
  {
    id: 'clear-aligners',
    title: 'Clear Aligners (Jerushaligne)',
    category: 'dental',
    desc: 'Custom invisible aligners designed and manufactured in-house for precise, comfortable teeth straightening without metal braces.',
    iconName: 'Smile',
    image: '/images/treatments/clear_aligners.png',
    details: 'Nearly invisible orthodontic treatment using custom digital modeling (CAD/CAM). Removable for meals and oral hygiene, offering a highly convenient alternative to traditional braces.',
    benefits: ['Nearly invisible treatment', 'Removable for eating & cleaning', 'Digital 3D treatment planning'],
    subtitle: 'Custom invisible aligners designed in-house',
    backDesc: 'Our proprietary Jerushaligne clear aligners offer a virtually invisible way to straighten your teeth with precision-engineered, custom-fit trays.'
  },
  {
    id: 'metal-braces',
    title: 'Metal Orthodontic Braces',
    category: 'dental',
    desc: 'Traditional high-grade stainless steel braces providing reliable, cost-effective tooth alignment for complex bite conditions.',
    iconName: 'Smile',
    image: '/images/treatments/orthodontics_braces.png',
    details: 'Precision metal brackets and archwires systematically guiding teeth into optimal functional and aesthetic positions.',
    benefits: ['Highly effective for complex cases', 'Durable stainless steel construction', 'Cost-effective alignment']
  },
  {
    id: 'ceramic-braces',
    title: 'Tooth-Coloured Ceramic Braces',
    category: 'dental',
    desc: 'Aesthetic ceramic brackets that blend in with natural enamel color for discrete orthodontic alignment.',
    iconName: 'Smile',
    image: '/images/treatments/orthodontics_braces.png',
    details: 'Translucent ceramic brackets designed to match your tooth shade while delivering the full structural alignment power of conventional braces.',
    benefits: ['Discreet tooth-colored brackets', 'Stain-resistant ceramic material', 'Effective for all age groups']
  },
  {
    id: 'lingual-braces',
    title: 'Lingual Hidden Braces',
    category: 'dental',
    desc: 'Custom braces fitted on the inside (lingual) surface of your teeth for completely invisible orthodontic treatment.',
    iconName: 'Smile',
    image: '/images/treatments/orthodontics_braces.png',
    details: 'Custom-cast brackets attached to the back of teeth, providing total aesthetic invisibility during adult orthodontic correction.',
    benefits: ['Completely hidden behind teeth', 'Customized for your bite', 'Zero front enamel obstruction']
  },
  {
    id: 'self-ligating-braces',
    title: 'Self-Ligating Low-Friction Braces',
    category: 'dental',
    desc: 'Advanced Damon-style self-ligating brackets requiring no elastic ties, resulting in faster movement and easier hygiene.',
    iconName: 'Smile',
    image: '/images/treatments/orthodontics_braces.png',
    details: 'Specialized slide mechanism brackets reducing friction on archwires, leading to quicker appointment visits and gentler tooth movement.',
    benefits: ['Faster overall treatment time', 'Easier oral cleaning without elastics', 'Gentler tooth pressure']
  },
  {
    id: 'smile-makeover',
    title: 'Comprehensive Smile Makeover',
    category: 'dental',
    desc: 'Full mouth aesthetic reconstruction combining aligners, veneers, whitening, and gum contouring for your dream smile.',
    iconName: 'Sparkles',
    image: '/images/treatments/teeth_whitening.png',
    details: 'Custom smile design mapping facial proportions, tooth shape, and lip symmetry to craft a harmonious, radiant smile.',
    benefits: ['Customized 3D digital smile preview', 'Combines multiple cosmetic techniques', 'Restores facial youthful aesthetics']
  },
  {
    id: 'dental-veneers',
    title: 'Porcelain & Composite Veneers',
    category: 'dental',
    desc: 'Ultra-thin porcelain laminates custom bonded over front teeth to instantly correct chips, gaps, and severe discoloration.',
    iconName: 'Sparkles',
    image: '/images/treatments/teeth_whitening.png',
    details: 'Durable ceramic shells sculpted by master dental ceramists to transform tooth shape, shade, and alignment with minimal tooth preparation.',
    benefits: ['Instant porcelain perfection', 'Stain-resistant glass ceramic', 'Corrects chips, gaps & misalignments']
  },
  {
    id: 'dental-implants',
    title: 'Advanced Dental Implants',
    category: 'dental',
    desc: 'CBCT-guided precision titanium implants for permanent tooth replacement with digital 3D planning for optimal results.',
    iconName: 'ShieldCheck',
    image: '/images/treatments/dental_implants.png',
    details: 'Bio-compatible titanium anchors placed directly into the jawbone, acting as artificial roots. Provides permanent, robust foundations for crowns, bridges, or dentures.',
    benefits: ['CBCT-guided precision planning', '98% success rate globally', 'Lifetime durability with care'],
    subtitle: 'Precision titanium implants for permanent teeth',
    backDesc: 'State-of-the-art digital implant placement using CBCT-guided 3D planning for permanent, natural-looking tooth replacement that lasts a lifetime.'
  },
  {
    id: 'fixed-partial-denture',
    title: 'Crowns & Bridges (Fixed Partial Denture)',
    category: 'dental',
    desc: 'Precision dental bridge prosthetics and custom zirconia crowns cemented in place to restore missing or damaged teeth.',
    iconName: 'ShieldCheck',
    image: '/images/treatments/fixed_partial_denture.png',
    details: 'Custom bridges created from premium ceramics or zirconia, permanently fixed to adjacent teeth to bridge dental gaps and restore a complete bite.',
    benefits: ['Permanent fixed bridge', 'Natural appearance', 'Restores facial structure']
  },
  {
    id: 'dentures',
    title: 'Complete & Removable Partial Dentures',
    category: 'dental',
    desc: 'Custom-fitted acrylic and BPS flexible dentures for comfortable, natural-looking full or partial tooth replacement.',
    iconName: 'ShieldCheck',
    image: '/images/treatments/fixed_partial_denture.png',
    details: 'Lightweight, bio-compatible prosthetics designed to match facial muscle contours and restore masticatory function.',
    benefits: ['Comfortable custom fit', 'BPS bio-functional option', 'Affordable tooth replacement']
  },
  {
    id: 'root-canal',
    title: 'Single-Visit Root Canal Treatment',
    category: 'dental',
    desc: 'Single-visit painless root canal procedures using advanced rotary instruments and apex locators to save damaged teeth.',
    iconName: 'Heart',
    image: '/images/treatments/root_canal.png',
    details: 'Minimally invasive, single-visit therapy using high-precision rotary instruments to clean, disinfect, and seal infected tooth root canals with virtually zero pain.',
    benefits: ['Completed in a single visit', 'Painless with modern anesthesia', 'Save natural tooth structure'],
    subtitle: 'Single-visit painless root canal with rotary tech',
    backDesc: 'Our advanced single-visit root canal procedure uses precision rotary instruments and apex locators to save infected teeth painlessly and efficiently.'
  },
  {
    id: 'tooth-coloured-fillings',
    title: 'Tooth-Coloured Composite Fillings',
    category: 'dental',
    desc: 'Aesthetic bio-compatible nano-composite resin fillings that match your exact natural tooth shade.',
    iconName: 'Sparkles',
    image: '/images/treatments/teeth_whitening.png',
    details: 'Seamless cosmetic restorations replacing old silver amalgam or repairing fresh decay with shade-matched composite resin bonded directly to enamel.',
    benefits: ['Seamless natural shade matching', 'Mercury-free bio-compatible material', 'Protects tooth structure']
  },
  {
    id: 'post-and-core',
    title: 'Post & Core Restoration',
    category: 'dental',
    desc: 'Specialized structural reinforcement post inserted into root-canal treated teeth before final crown placement.',
    iconName: 'ShieldCheck',
    image: '/images/treatments/root_canal.png',
    details: 'Custom fiber or metal post anchored within the root canal to rebuild lost coronal tooth structure, ensuring long-term crown retention.',
    benefits: ['Restores severely broken teeth', 'Provides anchor for crowns', 'Enhances structural strength']
  },
  {
    id: 'teeth-whitening',
    title: 'Professional Teeth Whitening',
    category: 'dental',
    desc: 'In-office laser-assisted whitening treatment that brightens teeth up to 8 shades in a single comfortable session.',
    iconName: 'Sparkles',
    image: '/images/treatments/teeth_whitening.png',
    details: 'Clinically supervised whitening utilizing premium bleaching gels activated by cool-blue LED lasers, delivering immediate dramatic results safely.',
    benefits: ['Up to 8 shades whiter', 'Safe on enamel', 'Immediate 45-minute results']
  },
  {
    id: 'gum-disease-treatment',
    title: 'Gum Disease & Periodontal Therapy',
    category: 'dental',
    desc: 'Comprehensive clinical care for bleeding gums, gingivitis, and deep periodontal pocket infections.',
    iconName: 'ShieldCheck',
    image: '/images/treatments/root_canal.png',
    details: 'Targeted ultrasonic debridement, antibiotic irrigation, and soft tissue laser therapy to halt bone loss and eliminate gum infection.',
    benefits: ['Stops gum bleeding & infection', 'Prevents tooth looseness', 'Laser antibacterial decontamination']
  },
  {
    id: 'dental-curettage',
    title: 'Dental Curettage & Deep Cleaning',
    category: 'dental',
    desc: 'Subgingival scaling and deep periodontal curettage to clear bacterial plaque, tartar, and diseased tissue under the gums.',
    iconName: 'ShieldCheck',
    image: '/images/treatments/root_canal.png',
    details: 'Specialized deep cleaning procedure using ultrasonic scalers and hand curettes to eliminate pocket infections and stop gum disease progression.',
    benefits: ['Stops progressive gum disease', 'Removes deep subgingival tartar', 'Freshens breath & tightens gums']
  },
  {
    id: 'gum-surgery',
    title: 'Periodontal Flap Surgery & Laser Surgery',
    category: 'dental',
    desc: 'Advanced surgical flap procedure and laser pocket reduction for deep-seated periodontal bone & tissue restoration.',
    iconName: 'Scissors',
    image: '/images/treatments/root_canal.png',
    details: 'Microsurgical gum pocket clearing and regenerative bone grafting performed under localized anesthesia.',
    benefits: ['Reduces deep gum pockets', 'Regenerates supporting bone', 'Preserves natural teeth long-term']
  },
  {
    id: 'gum-graft-surgery',
    title: 'Gum Graft Surgery',
    category: 'dental',
    desc: 'Specialized periodontal graft procedure to restore recessed gums, cover exposed roots, and protect teeth from sensitivity.',
    iconName: 'ShieldCheck',
    image: '/images/treatments/root_canal.png',
    details: 'Minimally invasive periodontal grafting to reinforce thinning gum tissue, stop progressive recession, and improve aesthetic smile symmetry.',
    benefits: ['Covers exposed tooth roots', 'Prevents further gum recession', 'Reduces root sensitivity']
  },
  {
    id: 'wisdom-tooth',
    title: 'Wisdom Tooth Extraction',
    category: 'dental',
    desc: 'Safe, minimally invasive extraction of impacted or problematic wisdom teeth with advanced surgical techniques.',
    iconName: 'Activity',
    image: '/images/treatments/wisdom_tooth.png',
    details: 'Surgical removal of impacted third molars performed under localized anesthesia, utilizing advanced sutures and healing protocols to minimize swelling.',
    benefits: ['Relieves chronic jaw pain', 'Minimally invasive extraction', 'Prevents damage to adjacent teeth']
  },
  {
    id: 'facial-surgery-treatment',
    title: 'Facial Surgery & Maxillofacial Reconstruction',
    category: 'dental',
    desc: 'Expert surgical corrective procedures for facial trauma, jaw aesthetics, soft tissue revision, and aesthetic harmony.',
    iconName: 'ShieldCheck',
    image: '/images/treatments/dental_implants.png',
    details: 'Comprehensive facial reconstructive and cosmetic surgical procedures performed by certified maxillofacial surgeons for functional correction and enhanced facial aesthetics.',
    benefits: ['Board-certified surgical expertise', 'Restores facial symmetry & function', 'Advanced 3D surgical planning']
  },
  {
    id: 'cleft-lip-palate',
    title: 'Cleft Lip & Palate Reconstruction',
    category: 'dental',
    desc: 'Specialized pediatric and adult corrective reconstructive surgery for cleft lip and palate deformities.',
    iconName: 'Heart',
    image: '/images/treatments/dental_implants.png',
    details: 'Comprehensive multi-disciplinary surgical restoration improving speech, eating, dental development, and facial appearance.',
    benefits: ['Restores speech & eating function', 'Specialized pediatric surgical team', 'Comprehensive aesthetic revision']
  },
  {
    id: 'pediatric-dentistry',
    title: 'Pediatric Dental Care',
    category: 'dental',
    desc: 'Gentle, child-friendly preventive and corrective dental treatments tailored for infants, children, and teenagers.',
    iconName: 'Smile',
    image: '/images/treatments/clear_aligners.png',
    details: 'Specialized pediatric dental care including fluoride treatments, pit and fissure sealants, habit-breaking appliances, and cavity fillings.',
    benefits: ['Child-friendly pain-free environment', 'Preventive sealants & fluoride', 'Early habit correction']
  },
  {
    id: 'oral-pathology',
    title: 'Oral Cancer Screening & Pathology',
    category: 'dental',
    desc: 'Diagnostic checkups, soft tissue evaluations, and biopsy screenings for early detection of oral mucosal lesions.',
    iconName: 'Activity',
    image: '/images/treatments/wisdom_tooth.png',
    details: 'Comprehensive clinical examination using specialized diagnostic lights and biopsy sampling to evaluate suspicious sores, patches, or growths early.',
    benefits: ['Early detection saves lives', 'Non-invasive diagnostic check', 'Histopathology verification']
  },

  // ─────────────────────────────────────────────────────────────
  // ✨ LASER & COSMETIC DERMATOLOGY
  // ─────────────────────────────────────────────────────────────
  {
    id: 'acne-treatment',
    title: 'Clinical Acne & Pimple Control',
    category: 'cosmetic',
    desc: 'Dermatologist-formulated acne treatment protocols combining medical peels, comedone extraction, and anti-inflammatory light therapy.',
    iconName: 'Sparkles',
    image: '/images/treatments/chemical_peels.png',
    details: 'Targeted therapy suppressing oil gland hyperactivity, clearing active acne lesions, and preventing post-inflammatory hyperpigmentation.',
    benefits: ['Clears active painful breakouts', 'Controls excess sebum & oil', 'Prevents acne scarring']
  },
  {
    id: 'fractional-co2-laser',
    title: 'Fractional CO₂ Laser Resurfacing',
    category: 'cosmetic',
    desc: 'FDA-approved fractional laser resurfacing for deep acne scar reduction, wrinkle correction, and skin texture improvement.',
    iconName: 'Flame',
    image: '/images/treatments/fractional_co2_laser.png',
    details: 'Highly advanced carbon dioxide laser emitting columns of thermal energy to trigger deep dermal repair and stimulate abundant collagen, smoothing skin surfaces.',
    benefits: ['Visible results in 3-4 sessions', 'Stimulates collagen production', 'Minimal downtime recovery'],
    subtitle: 'Advanced skin resurfacing for acne scars & wrinkles',
    backDesc: 'FDA-approved fractional laser technology for deep skin resurfacing, dramatically reducing acne scars, fine lines, and uneven skin texture.'
  },
  {
    id: 'pigmentation-treatment',
    title: 'Melasma & Pigmentation Toning',
    category: 'cosmetic',
    desc: 'Specialized laser toning and topical therapies for dark spots, melasma patches, and uneven tan lines.',
    iconName: 'TrendingUp',
    image: '/images/treatments/pico_laser.png',
    details: 'Advanced Q-switched laser toning combined with clinical anti-pigment serums to shatter deep epidermal and dermal melanin safely.',
    benefits: ['Targets hormonal melasma', 'Fades freckles & sun spots', 'Safe for Indian skin tones']
  },
  {
    id: 'uneven-skin-tone',
    title: 'Uneven Skin Tone & Dark Spot Correction',
    category: 'cosmetic',
    desc: 'Custom multi-modality therapies targeting dermal hyperpigmentation for an even, glowing complexion.',
    iconName: 'Sparkles',
    image: '/images/treatments/pico_laser.png',
    details: 'Combined gentle laser toning, mesotherapy, and antioxidant serums to reduce localized melanin clusters.',
    benefits: ['Restores uniform complexion', 'Smooths dull rough patches', 'Dermatologist supervised']
  },
  {
    id: 'freckles-removal',
    title: 'Freckles & Sun Tan Removal',
    category: 'cosmetic',
    desc: 'Pico and Q-switched laser treatment to clear sun spots, freckles, and dark tanning lines rapidly.',
    iconName: 'Sparkles',
    image: '/images/treatments/pico_laser.png',
    details: 'Precise light pulses shattering superficial melanin deposits caused by sun exposure without damaging surrounding skin.',
    benefits: ['Rapid removal of sun spots', 'Brightens sun-tanned skin', 'Non-invasive procedure']
  },
  {
    id: 'hydrafacial',
    title: 'HydraFacial Treatment',
    category: 'cosmetic',
    desc: 'Patented multi-step treatment combining cleansing, exfoliation, extraction, and hydration with nutrient-rich serums for instant glow.',
    iconName: 'Sparkles',
    image: '/images/treatments/hydrafacial.png',
    details: 'A clinical skin conditioning therapy using vortex-extraction to deeply purify pores, apply medical-grade chemical peels, and infuse high-dose antioxidants.',
    benefits: ['Instant visible skin glow', 'Suitable for all skin types', 'Zero downtime, pain-free'],
    subtitle: 'Multi-step facial for deep cleansing & radiance',
    backDesc: 'A patented multi-step treatment that cleanses, exfoliates, extracts, and hydrates the skin with nutrient-rich serums for instant visible glow.'
  },
  {
    id: 'carbon-peel-laser-treatment',
    title: 'Carbon Peel Laser Treatment',
    category: 'cosmetic',
    desc: 'Non-invasive Hollywood carbon laser peel that purifies pores, reduces oiliness, and brightens dull skin instantly.',
    iconName: 'Sparkles',
    image: '/images/treatments/carbon_peel.png',
    details: 'A liquid carbon layer is applied to the face and blasted with laser light, deep cleansing pores, exfoliating dead skin cells, and controlling oil production for instant porcelain glow.',
    benefits: ['Instant skin radiance & glow', 'Deep pore cleansing & oil control', 'Zero downtime procedure']
  },
  {
    id: 'chemical-peels',
    title: 'Medical Chemical Peels',
    category: 'cosmetic',
    desc: 'Medical-grade chemical exfoliation treatments to improve skin texture, reduce pigmentation, and reveal fresher, younger-looking skin.',
    iconName: 'Scissors',
    image: '/images/treatments/chemical_peels.png',
    details: 'Controlled application of clinical acids (salicylic, glycolic, lactic, TCA) to target acne, superficial scars, and sun damage, promoting cell turnover.',
    benefits: ['Clears active acne', 'Fades hyperpigmentation', 'Improves overall radiance']
  },
  {
    id: 'skin-whitening-treatment',
    title: 'Skin Whitening & Brightening Therapy',
    category: 'cosmetic',
    desc: 'Advanced medical dermatological solutions for skin tone brightening, hyperpigmentation correction, and even complexion.',
    iconName: 'Sparkles',
    image: '/images/treatments/skin_whitening.png',
    details: 'Custom combination of medical peels, laser toning, and nutrient infusions to reduce melanin production, fade stubborn dark spots, and restore uniform skin brilliance.',
    benefits: ['Fades dark spots & hyperpigmentation', 'Enhances natural radiance', 'Dermatologist guided safety']
  },
  {
    id: 'anti-ageing-facial',
    title: 'Clinical Anti-Ageing Facial & Collagen Boost',
    category: 'cosmetic',
    desc: 'Advanced anti-ageing facial utilizing micro-currents, peptide serums, and LED phototherapy for firm, supple skin.',
    iconName: 'TrendingUp',
    image: '/images/treatments/hydrafacial.png',
    details: 'Deep restorative facial boosting dermal microcirculation, smoothing fine lines, and restoring natural moisture barrier.',
    benefits: ['Smooths fine dehydration lines', 'Restores skin elasticity', 'Relaxing clinical facial']
  },
  {
    id: 'mole-removal',
    title: 'Mole, Wart & Skin Tag Removal',
    category: 'cosmetic',
    desc: 'RF cautery and CO₂ laser precision removal of benign moles, skin tags, warts, and xanthelasma with minimal scarring.',
    iconName: 'Scissors',
    image: '/images/treatments/chemical_peels.png',
    details: 'Single-session painless radiofrequency cautery or laser vaporization of superficial skin growths under topical numbing gel.',
    benefits: ['Painless single session', 'Minimal to zero scar risk', 'Quick healing time']
  },
  {
    id: 'benign-skin-growth-removal',
    title: 'Xanthelasma & Benign Growth Removal',
    category: 'cosmetic',
    desc: 'Targeted laser precision clearance of cholesterol eyelid deposits (xanthelasma) and benign facial keratoses.',
    iconName: 'Scissors',
    image: '/images/treatments/chemical_peels.png',
    details: 'Microscopic ablation of yellowish cholesterol plaques around the eyes and benign epidermal spots.',
    benefits: ['High precision around delicate eye area', 'Scar-minimizing technique', 'Quick outpatient visit']
  },
  {
    id: 'laser-hair-removal',
    title: 'Full Body Laser Hair Removal',
    category: 'cosmetic',
    desc: 'Triple-wavelength diode laser hair reduction for smooth, hair-free skin across face and body with contact cooling.',
    iconName: 'Sparkles',
    image: '/images/treatments/hydrafacial.png',
    details: 'Advanced contact-cooled diode laser targeting hair follicle melanin to achieve long-lasting hair reduction safely and comfortably.',
    benefits: ['Permanent hair reduction', 'Advanced contact cooling tech', 'Safe for all skin complexions']
  },
  {
    id: 'facial-laser-hair-removal',
    title: 'Facial Hair Removal & Lip Brightening',
    category: 'cosmetic',
    desc: 'Precision laser hair removal for upper lip, chin, and sideburns, combined with gentle lip laser brightening.',
    iconName: 'Sparkles',
    image: '/images/treatments/hydrafacial.png',
    details: 'Gentle facial diode laser clearing fine dark facial hair while correcting smoker/tan lip pigmentation.',
    benefits: ['Gentle on sensitive facial skin', 'Prevents ingrown chin hair', 'Restores natural pink lips']
  },
  {
    id: 'botox-fillers',
    title: 'Botox & Dermal Fillers',
    category: 'cosmetic',
    desc: 'Expert facial rejuvenation with US FDA-approved botulinum toxin and hyaluronic acid fillers for wrinkle smoothing and volume restoration.',
    iconName: 'UserCheck',
    image: '/images/treatments/botox_fillers.png',
    details: 'Injectable cosmetics precisely administered by specialized dermatologists to relax dynamic lines and restore volume to cheeks, lips, and under-eyes.',
    benefits: ['Restores youthful volume', 'Softens deep forehead lines', 'Natural-looking contours']
  },
  {
    id: 'hifu-skin-tightening',
    title: 'HIFU Non-Surgical Facelift',
    category: 'cosmetic',
    desc: 'High-Intensity Focused Ultrasound (HIFU) for non-surgical face lifting, jawline snatching, and neck tightening.',
    iconName: 'TrendingUp',
    image: '/images/treatments/botox_fillers.png',
    details: 'Delivers ultrasound energy deep into the SMAS layer to contract tissue and generate collagen, lifting sagging cheeks and defining the jawline.',
    benefits: ['Lifts sagging skin non-surgically', 'Single annual treatment', 'Zero downtime']
  },
  {
    id: 'microdermabrasion',
    title: 'Diamond Microdermabrasion',
    category: 'cosmetic',
    desc: 'Diamond-tip mechanical resurfacing to buff away dead stratum corneum cells for silky smooth skin texture.',
    iconName: 'Sparkles',
    image: '/images/treatments/hydrafacial.png',
    details: 'Non-invasive diamond wand exfoliating dead surface skin while vacuuming away debris to unclog pores and enhance product absorption.',
    benefits: ['Instantly smooths rough skin', 'Improves makeup application', 'Unclogs congested pores']
  },
  {
    id: 'excimer-laser-therapy',
    title: 'Excimer Laser Therapy',
    category: 'cosmetic',
    desc: 'Targeted 308nm UVB laser light therapy for effective treatment of vitiligo, psoriasis, atopic dermatitis, and alopecia areata.',
    iconName: 'Flame',
    image: '/images/treatments/pico_laser.png',
    details: '308nm monochrome Excimer laser technology delivers high-intensity targeted light to repigment vitiligo patches and clear localized skin lesions without affecting surrounding healthy skin.',
    benefits: ['Precision targeted 308nm beam', 'Stimulates repigmentation', 'Safe and pain-free treatment']
  },
  {
    id: 'keloid-treatment',
    title: 'Keloid & Hypertrophic Scar Reduction',
    category: 'cosmetic',
    desc: 'Steroid micro-injections, cryotherapy, and laser therapy to flatten raised keloids and surgical scars.',
    iconName: 'ShieldCheck',
    image: '/images/treatments/fractional_co2_laser.png',
    details: 'Multimodality scar therapy softening tough collagen cords and relieving keloid itching and tenderness.',
    benefits: ['Flattens thick raised keloids', 'Relieves chronic itching & pain', 'Prevents keloid recurrence']
  },
  {
    id: 'rhinoplasty',
    title: 'Rhinoplasty & Scar Revision Surgery',
    category: 'cosmetic',
    desc: 'Aesthetic rhinoplasty, lip reshaping, and scar revision surgeries performed by consultant facial cosmetic surgeons.',
    iconName: 'ShieldCheck',
    image: '/images/treatments/dental_implants.png',
    details: 'Refined cosmetic surgical procedures designed to reshape nasal structure, enhance lip volume, and minimize surgical or traumatic facial scars.',
    benefits: ['Restores aesthetic proportion', 'Permanent subtle enhancements', 'Specialized plastic surgery team']
  },

  // ─────────────────────────────────────────────────────────────
  // 💇 HAIR RESTORATION
  // ─────────────────────────────────────────────────────────────
  {
    id: 'prp-hair-treatment',
    title: 'PRP Hair Therapy',
    category: 'hair',
    desc: 'Platelet-Rich Plasma micro-injections rich in growth factors to nourish hair roots and reduce active hair fall.',
    iconName: 'Activity',
    image: '/images/treatments/gfc_hair_therapy.png',
    details: 'Concentrated autologous blood plasma injected directly into scalp thinning zones to improve follicle vascularization.',
    benefits: ['100% natural autologous plasma', 'Reduces active hair shedding', 'Thickens existing hair shafts']
  },
  {
    id: 'gfc-hair',
    title: 'GFC Hair Therapy',
    category: 'hair',
    desc: 'Growth Factor Concentrate therapy using your own blood-derived growth factors to stimulate dormant follicles and promote natural hair regrowth.',
    iconName: 'Activity',
    image: '/images/treatments/gfc_hair_therapy.png',
    details: 'Next-generation autologous therapy where high concentrations of growth factors are extracted from the patient\'s blood platelets and delivered into the scalp.',
    benefits: ['100% natural autologous therapy', 'Visible results in 6 sessions', 'No synthetic chemicals involved'],
    subtitle: 'Growth Factor Concentrate for natural hair regrowth',
    backDesc: 'Growth Factor Concentrate therapy uses your own blood-derived growth factors to stimulate dormant hair follicles and promote natural, thick hair regrowth.'
  },
  {
    id: 'qr678-therapy',
    title: 'QR678 Hair Regrowth Therapy',
    category: 'hair',
    desc: 'Patented Indian hair regrowth formulation QR678 that targets hair follicle stem cells for clinically proven anti-hair-loss results.',
    iconName: 'TrendingUp',
    image: '/images/treatments/qr678_therapy.png',
    details: 'A bio-engineered peptide solution containing essential hair growth factors, micro-injected into the scalp to arrest hair loss and trigger new follicle growth.',
    benefits: ['USA & Indian patented', 'Clinically proven results', 'Minimal discomfort']
  },
  {
    id: 'exocell-hair-treatment',
    title: 'Exocell & Bio Cell Scalp Therapy',
    category: 'hair',
    desc: 'Advanced exosome and bio-cellular signaling therapy to reactivate dormant miniaturized hair follicles.',
    iconName: 'Activity',
    image: '/images/treatments/gfc_hair_therapy.png',
    details: 'Recombinant cellular signal molecules delivered via micro-needling to stimulate scalp stem cell activity in hereditary pattern baldness.',
    benefits: ['Advanced exosome technology', 'Stimulates miniaturized roots', 'Painless application protocol']
  },
  {
    id: 'fue-transplant',
    title: 'Micro-FUE Hair Transplant',
    category: 'hair',
    desc: 'Minimally invasive follicular unit extraction technique for natural-looking hair transplantation with faster recovery and no linear scars.',
    iconName: 'Scissors',
    image: '/images/treatments/gfc_hair_therapy.png',
    details: 'Individual hair grafts are harvested from the donor site using micro-punches and implanted into the balding area with natural density and angle.',
    benefits: ['Natural hair density', 'Virtually scarless recovery', 'Permanent follicular grafts']
  },
  {
    id: 'beard-hairline-transplant',
    title: 'Beard & Hairline Restoration',
    category: 'hair',
    desc: 'Precision micro-transplant procedures to recreate a sharp natural hairline or dense beard aesthetics.',
    iconName: 'Scissors',
    image: '/images/treatments/gfc_hair_therapy.png',
    details: 'Artistic graft placement reconstructing receding hairlines or filling patchy beard zones using single-hair micro-follicular units.',
    benefits: ['Natural artistic hairline design', 'Fills patchy beard areas', 'Permanent growing hair']
  },
  {
    id: 'dandruff-treatment',
    title: 'Clinical Dandruff & Scalp Cleansing',
    category: 'hair',
    desc: 'Dermatological scalp detox removing stubborn flaking, fungal malassezia overgrowth, and seborrheic crusts.',
    iconName: 'Activity',
    image: '/images/treatments/qr678_therapy.png',
    details: 'Medicated scalp peeling combined with high-frequency anti-fungal treatment to calm scalp itchiness and eliminate dandruff scales.',
    benefits: ['Eliminates stubborn scalp flakes', 'Calms chronic scalp itching', 'Restores healthy scalp microbiome']
  },
  {
    id: 'scalp-laser',
    title: 'Scalp Laser & Hair Growth Booster',
    category: 'hair',
    desc: 'Low-level laser therapy (LLLT) for scalp stimulation, improving blood circulation and follicular health for thicker hair.',
    iconName: 'Activity',
    image: '/images/treatments/qr678_therapy.png',
    details: 'Cool-laser light therapy that increases cellular ATP production in hair follicles while clarifying scalp buildup.',
    benefits: ['Non-invasive, drug-free', 'Boosts scalp microcirculation', 'Strengthens thinning hair']
  },

  // ─────────────────────────────────────────────────────────────
  // 🏃 BODY CONTOURING & WELLNESS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'cryo-sculpting',
    title: 'Cryo Cool Sculpting (Fat Freezing)',
    category: 'body',
    desc: 'FDA-cleared cryolipolysis technology that freezes and eliminates stubborn fat cells without surgery, needles, or downtime.',
    iconName: 'Heart',
    image: '/images/treatments/cryo_sculpting.png',
    details: 'Non-surgical cooling targets fat cells beneath the skin, causing them to crystalize and die. Over time, the body naturally processes and eliminates them.',
    benefits: ['Non-surgical fat reduction', 'Up to 25% fat loss per session', 'No downtime, resume activities'],
    subtitle: 'Non-invasive fat reduction with controlled cooling',
    backDesc: 'FDA-cleared cryolipolysis technology that freezes and eliminates stubborn fat cells without surgery, needles, or downtime for targeted body contouring.'
  },
  {
    id: 'em-sculpting',
    title: 'EM-Muscle Sculpting & Toning',
    category: 'body',
    desc: 'High-intensity focused electromagnetic energy for targeted muscle building and fat reduction — equivalent to 20,000 crunches per session.',
    iconName: 'Activity',
    image: '/images/treatments/cryo_sculpting.png',
    details: 'Induces supramaximal muscle contractions using HIFEM energy. Rebuilds muscle fibers and burns regional fat cells in short, comfortable 30-minute sessions.',
    benefits: ['Builds muscle & burns fat', 'Equivalent to 20,000 sit-ups', 'Improves posture & tone']
  },
  {
    id: 'emsella-wellness',
    title: 'Emsella Pelvic Wellness Chair',
    category: 'body',
    desc: 'Revolutionary non-invasive electromagnetic chair therapy for pelvic floor strengthening and urinary incontinence treatment.',
    iconName: 'UserCheck',
    image: '/images/treatments/cryo_sculpting.png',
    details: 'Uses High-Intensity Focused Electromagnetic (HIFEM) technology to stimulate thousands of pelvic floor muscle contractions, equivalent to 11,000 Kegels.',
    benefits: ['Restores bladder control', 'Non-invasive (fully clothed)', 'Improves core wellness']
  },
  {
    id: 'pelvic-floor-treatment',
    title: 'Pelvic Floor Strengthening & Core Rehab',
    category: 'body',
    desc: 'Targeted pelvic floor muscle re-education and core strengthening therapy for women post-childbirth and seniors.',
    iconName: 'UserCheck',
    image: '/images/treatments/cryo_sculpting.png',
    details: 'Specialized non-invasive electromagnetic pelvic floor rehabilitation improving muscle tone, intimate wellness, and core stability.',
    benefits: ['Post-natal core rehabilitation', 'Non-invasive comfortable therapy', 'Enhances pelvic muscle endurance']
  },
  {
    id: 'muscle-toning',
    title: 'Body Muscle Toning & Sculpting',
    category: 'body',
    desc: 'Targeted electromagnetic body sculpting defining abs, glutes, thighs, and arms with high-frequency contractions.',
    iconName: 'Activity',
    image: '/images/treatments/cryo_sculpting.png',
    details: 'Electromagnetic muscle stimulation targeting specific body zones to firm muscle bundles and sculpt athletic contours without gym strain.',
    benefits: ['Tones abs, glutes & thighs', 'Non-surgical body definition', 'Zero fatigue or joint strain']
  },
  {
    id: 'rf-body-tightening',
    title: 'RF Body Skin Tightening',
    category: 'body',
    desc: 'Radiofrequency thermal body sculpting to tighten lax skin and smooth cellulitic dimples post weight loss.',
    iconName: 'TrendingUp',
    image: '/images/treatments/cryo_sculpting.png',
    details: 'Deep tissue radiofrequency heating stimulates dermal collagen remodeling, firming loose belly, arm, and thigh skin comfortably.',
    benefits: ['Firms loose post-pregnancy skin', 'Reduces cellulite appearance', 'Comfortable thermal massage feel']
  },
  {
    id: 'clinical-wellness',
    title: 'Clinical Body Wellness & Metabolism Programs',
    category: 'body',
    desc: 'Physician-guided body composition analysis, detox therapies, and personalized metabolic wellness programs.',
    iconName: 'Heart',
    image: '/images/treatments/cryo_sculpting.png',
    details: 'Comprehensive body wellness evaluation assessing visceral fat levels, basal metabolic rate, and customized clinical body rejuvenation.',
    benefits: ['Physician-guided wellness', 'Body composition analysis', 'Sustainable lifestyle rejuvenation']
  }
];
