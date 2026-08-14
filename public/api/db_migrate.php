<?php
require_once 'db.php';

$db = getDB();

try {
    // MySQL 5.7+ compatibility: check columns first, then alter table if missing
    // 1. Check/Add `type` column
    $stmt = $db->query("SHOW COLUMNS FROM `reviews` LIKE 'type'");
    if (!$stmt->fetch()) {
        $db->exec("ALTER TABLE `reviews` ADD COLUMN `type` VARCHAR(50) DEFAULT 'text' AFTER `rating`");
        echo "Column 'type' added.\n";
    } else {
        echo "Column 'type' already exists.\n";
    }

    // 2. Check/Add `video_url` column
    $stmt = $db->query("SHOW COLUMNS FROM `reviews` LIKE 'video_url'");
    if (!$stmt->fetch()) {
        $db->exec("ALTER TABLE `reviews` ADD COLUMN `video_url` VARCHAR(255) DEFAULT NULL AFTER `type`");
        echo "Column 'video_url' added.\n";
    } else {
        echo "Column 'video_url' already exists.\n";
    }

    // 3. Check/Add `video_thumbnail` column
    $stmt = $db->query("SHOW COLUMNS FROM `reviews` LIKE 'video_thumbnail'");
    if (!$stmt->fetch()) {
        $db->exec("ALTER TABLE `reviews` ADD COLUMN `video_thumbnail` VARCHAR(255) DEFAULT NULL AFTER `video_url`");
        echo "Column 'video_thumbnail' added.\n";
    } else {
        echo "Column 'video_thumbnail' already exists.\n";
    }

    // 4. Ensure Dr. S. K. Jerome exists in doctors table
    $stmtDoctor = $db->prepare("SELECT id FROM doctors WHERE name = ?");
    $stmtDoctor->execute(['DR. S. K. JEROME']);
    if (!$stmtDoctor->fetch()) {
        $stmtInsertDoc = $db->prepare("INSERT INTO `doctors` (`name`, `role`, `qualification`, `experience`, `image`, `fallback_img`, `specialties`, `bio`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmtInsertDoc->execute([
            'DR. S. K. JEROME',
            'Senior Periodontist & Implantologist',
            'MDS (Periodontics)',
            '12+ Years Experience',
            'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300',
            'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
            '["Periodontics","Dental Implants","Bone Grafting","Laser-assisted Periodontics"]',
            'Dr. Jerome has over 12 years of experience in single-day dental implants, bone grafting, and laser-assisted periodontics.'
        ]);
        echo "Doctor DR. S. K. JEROME added to database.\n";
    } else {
        echo "Doctor DR. S. K. JEROME already exists in database.\n";
    }

    // 5. Ensure the Chennai dental implants blog post exists in blogs table
    $stmtBlog = $db->prepare("SELECT id FROM blogs WHERE slug = ?");
    $stmtBlog->execute(['dental-implants-in-chennai-cost-benefits-procedure']);
    if (!$stmtBlog->fetch()) {
        $blogContent = '
      <p>Missing teeth can affect your smile, chewing ability, and overall dental health.</p>
      <p>At Jerush Dentofacial and Cosmetic Laser Center, Chennai, we provide advanced dental implants treatment that restores your confidence and gives you a permanent solution to tooth loss.</p>
      <p>Whether you’re looking for a single tooth replacement or full dental implants, our expert implantologists provide inexpensive, reliable, and long-lasting results.</p>
      
      <div class="blog-img-wrapper max-w-2xl mx-auto my-6 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50 p-1">
        <img src="/images/blog/dental-implants-blog/anatomy-of-healthy-teeth-and-tooth-dental-implant.webp" alt="Anatomy of healthy teeth and tooth dental implant" class="w-full h-auto object-cover rounded-xl" />
      </div>

      <h2 id="what-is-dental-implant">What is a Dental Implant?</h2>
      <p>A dental implant is a titanium post that serves as the root of an artificial tooth. Once it is fixed in your jaw, a custom-made crown tooth or bridge is placed, giving you natural-looking and fully functional teeth. Unlike dentures, implants do not slip or cause discomfort.</p>
      <p>Dental implants are considered one of the best dental treatments in India because they are safe, long-lasting, and improve overall dental health care.</p>

      <h2 id="cost-in-chennai">Professional Insights on Dental Implant Cost in Chennai</h2>
      <p>On average, the dental implants cost per tooth in Chennai is affordable and varies depending on the clinic and complexity of the case. Factors influencing the cost of dental implants in Chennai include the implant material, technology utilized, crown type, and additional treatments like bone grafting or sinus lifts.</p>

      <div class="blog-img-wrapper max-w-2xl mx-auto my-6 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50 p-1">
        <img src="/images/blog/dental-implants-blog/wmremove-transformed.webp" alt="Dental implant cost in Chennai" class="w-full h-auto object-cover rounded-xl" />
      </div>

      <h2 id="types-of-implants">Types of Dental Implants</h2>
      <p>We provide a wide array of options designed to fit every budget and clinical requirement:</p>
      <ul>
        <li><strong>Single Tooth Implants:</strong> Ideal for replacing a single missing tooth without affecting neighboring teeth.</li>
        <li><strong>Multiple Implants:</strong> Used for replacing several teeth next to each other.</li>
        <li><strong>Advanced Dental Implants:</strong> Complete full-mouth restoration solutions such as All-on-4 or All-on-6.</li>
      </ul>

      <div class="blog-img-wrapper max-w-2xl mx-auto my-6 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50 p-1">
        <img src="/images/blog/dental-implants-blog/implant-types.webp" alt="Types of dental implants" class="w-full h-auto object-cover rounded-xl" />
      </div>

      <h2 id="materials">Materials Used for Dental Implants</h2>
      <p>Implants are constructed using biocompatible materials that fuse naturally with the jawbone. We primarily use:</p>
      <ul>
        <li><strong>Titanium Implants:</strong> The industry gold standard, known for durability and high success rates.</li>
        <li><strong>Zirconia Implants:</strong> Metal-free ceramic alternatives that offer high aesthetics for front teeth.</li>
      </ul>

      <div class="blog-img-wrapper max-w-2xl mx-auto my-6 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50 p-1">
        <img src="/images/blog/dental-implants-blog/materials-used.webp" alt="Materials used for dental implants" class="w-full h-auto object-cover rounded-xl" />
      </div>

      <h2 id="technology">Advanced Dental Implant Technology</h2>
      <p>We utilize modern digital diagnostic workflows, including 3D CBCT scans and guided surgical software, to perform oral surgery with precision, reducing pain and healing time.</p>

      <div class="blog-img-wrapper max-w-2xl mx-auto my-6 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50 p-1">
        <img src="/images/blog/dental-implants-blog/technology.webp" alt="Dental implants technology" class="w-full h-auto object-cover rounded-xl" />
      </div>

      <h2 id="crown-types">Types of Crowns Available</h2>
      <p>After the implant heals, a custom crown is placed. Options include:</p>
      <ul>
        <li><strong>Zirconia Crowns:</strong> Extreme durability and natural light transmission.</li>
        <li><strong>Porcelain & Ceramic Crowns:</strong> Excellent aesthetic results matching natural teeth.</li>
      </ul>

      <div class="blog-img-wrapper max-w-2xl mx-auto my-6 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50 p-1">
        <img src="/images/blog/dental-implants-blog/crown-types.webp" alt="Crown types for dental implants" class="w-full h-auto object-cover rounded-xl" />
      </div>

      <h2 id="additional-procedures">Additional Procedures</h2>
      <p>For patients with low bone density, we perform prep work such as bone grafting, sinus lifts, or specialized oral surgery to prepare the jawbone for secure implant placement.</p>

      <div class="blog-img-wrapper max-w-2xl mx-auto my-6 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50 p-1">
        <img src="/images/blog/dental-implants-blog/additional-procedures.webp" alt="Additional dental procedures" class="w-full h-auto object-cover rounded-xl" />
      </div>

      <h2 id="price-and-location">Clinic Price and Location in Chennai</h2>
      <p>The cost of dental implants varies, but finding the right clinic that couples affordability with clinical excellence is key. Jerush Dentofacial offers premier implant solutions in Chennai with flexible payment options, keeping costs transparent and affordable.</p>

      <div class="blog-img-wrapper max-w-2xl mx-auto my-6 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50 p-1">
        <img src="/images/blog/dental-implants-blog/price-location.webp" alt="Clinic price and location" class="w-full h-auto object-cover rounded-xl" />
      </div>

      <h2 id="benefits">Benefits of Dental Implants</h2>
      <p>The advantages of choosing dental implants go far beyond simple cosmetics:</p>
      <ul>
        <li>Restore natural smiles and chewing functions.</li>
        <li>Prevents bone damage and supports facial structure.</li>
        <li>Offers prolonged durability compared to bridges or dentures.</li>
        <li>Improves speech and overall confidence.</li>
        <li>Safe and effective with minimal side effects.</li>
      </ul>
      <p>Many patients see dramatic conversions in their before and after dental implant results.</p>

      <div class="blog-img-wrapper max-w-2xl mx-auto my-6 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50 p-1">
        <img src="/images/blog/dental-implants-blog/patient-checking-his-teeth-mirror.webp" alt="Patient checking his teeth in mirror" class="w-full h-auto object-cover rounded-xl" />
      </div>

      <h2 id="conditions">What Conditions Are Treated with Dental Implants?</h2>
      <ul>
        <li>Missing one or more teeth.</li>
        <li>Experiencing dental implants bone loss issues.</li>
        <li>Inability to manage with loose dentures.</li>
        <li>Looking for affordable dental replacement solutions.</li>
        <li>Needing full dental implant packages for complete restoration.</li>
      </ul>

      <div class="blog-img-wrapper max-w-2xl mx-auto my-6 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50 p-1">
        <img src="/images/blog/dental-implants-blog/missing-teeth.webp" alt="Missing teeth" class="w-full h-auto object-cover rounded-xl" />
      </div>

      <h2 id="procedure">Step-by-Step Dental Implants Procedure</h2>
      <p>Understanding the treatment steps can help prepare you for the implant journey:</p>
      <ol>
        <li><strong>Digital Consultation & Planning:</strong> X-rays and 3D CBCT scans are taken to plan your implant placement.
          <div class="blog-img-wrapper-inline my-3"><img src="/images/blog/dental-implants-blog/treatment-plan.webp" alt="Treatment planning" class="w-full max-w-lg h-auto rounded-xl shadow-sm" /></div>
        </li>
        <li><strong>Implant Placement Surgery:</strong> The titanium post is placed gently into the jawbone under localized anesthesia.
          <div class="blog-img-wrapper-inline my-3"><img src="/images/blog/dental-implants-blog/implant-surgery.webp" alt="Implant surgery" class="w-full max-w-lg h-auto rounded-xl shadow-sm" /></div>
        </li>
        <li><strong>Osseointegration (Healing Time):</strong> Usually takes 3–6 months for the bone to grow and bond with the implant.
          <div class="blog-img-wrapper-inline my-3"><img src="/images/blog/dental-implants-blog/healing-time.webp" alt="Healing time" class="w-full max-w-lg h-auto rounded-xl shadow-sm" /></div>
        </li>
        <li><strong>Crown Placement:</strong> A custom zirconia or ceramic crown is attached to the abutment, completing the tooth.
          <div class="blog-img-wrapper-inline my-3"><img src="/images/blog/dental-implants-blog/crown-placeement.webp" alt="Crown placement" class="w-full max-w-lg h-auto rounded-xl shadow-sm" /></div>
        </li>
        <li><strong>Follow-up Care:</strong> Routine visits to monitor healing and ensure long-term stability.
          <div class="blog-img-wrapper-inline my-3"><img src="/images/blog/dental-implants-blog/followup-care.webp" alt="Follow-up care" class="w-full max-w-lg h-auto rounded-xl shadow-sm" /></div>
        </li>
      </ol>

      <h2 id="choosing-clinic">Tips for Choosing the Right Dental Clinic in Chennai</h2>
      <p>When searching for a "dental implant clinic near me," keep these aspects in mind:</p>
      <ul>
        <li>Choose a clinic with certified, experienced implantology experts.</li>
        <li>Check for modern technology like digital guide surgery.</li>
        <li>Compare the prices of dental services for transparent, upfront fees.</li>
        <li>Look for verified patient before-and-after reviews.</li>
        <li>Ensure 24-hour emergency care is available.</li>
      </ul>

      <div class="blog-img-wrapper max-w-2xl mx-auto my-6 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50 p-1">
        <img src="/images/blog/dental-implants-blog/choosing-right-clinic.webp" alt="Choosing the right clinic" class="w-full h-auto object-cover rounded-xl" />
      </div>

      <p>Jerush Dentofacial and Cosmetic Laser Centre is recognized as one of the best clinics for dental implants in Chennai, offering individual treatments with advanced techniques.</p>

      <h2 id="post-care">Post-Implant Care Tips</h2>
      <p>To help your dental implants last a lifetime, follow these post-operative care steps:</p>
      <ul>
        <li>Maintain proper brushing and flossing habits.</li>
        <li>Regularly visit your dentist for checkups.</li>
        <li>Avoid smoking or excessive alcohol consumption.</li>
        <li>Follow a soft diet during the initial healing phases.</li>
        <li>Attend scheduled follow-up checkups.</li>
      </ul>

      <div class="blog-img-wrapper max-w-2xl mx-auto my-6 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50 p-1">
        <img src="/images/blog/dental-implants-blog/post-dental-implant-treatment.webp" alt="Post dental implant care" class="w-full h-auto object-cover rounded-xl" />
      </div>

      <h2 id="why-choose-jerush">Why Choose Jerush Dentofacial for Dental Implants?</h2>
      <p>We combine advanced technology, clinical expertise, and a patient-first approach to provide a premium dental implant experience:</p>
      <ul>
        <li><strong>Experienced Implantologists:</strong> Our doctors bring years of expertise to perform complex surgeries with precision.</li>
        <li><strong>Affordable Fees:</strong> Cost-effective treatment schemes with full pricing transparency.</li>
        <li><strong>Advanced Technology:</strong> Guided 3D surgery and digital impressions for high success rates.</li>
        <li><strong>Custom Restoration:</strong> Top-tier zirconia and ceramic restorations.</li>
        <li><strong>24/7 Support:</strong> Emergency dental support across our branches.</li>
      </ul>

      <h3>Our Clinical Milestones:</h3>
      <ul>
        <li>188K+ Happy Patients</li>
        <li>52K+ Implants Placed</li>
        <li>90K+ Dental Braces & Aligners</li>
        <li>44K+ Facial Surgeries</li>
        <li>4+ Clinics in Tamil Nadu and Kanyakumari</li>
      </ul>

      <h2 id="reviews">Patient Testimonials</h2>
      <blockquote>
        "I recently visited Jerush Hospital for dental treatment, which included a root canal and zirconia crown fitting, and I’m truly happy with the entire experience. I give Jerush Hospital a full 10/10 rating and highly recommend it."
        <cite>— Prathab G</cite>
      </blockquote>
      <blockquote>
        "One of the best dental clinics in town. Having all advanced forms of treatment available, the result is perfect and worth every single penny!"
        <cite>— Anisha Beullah</cite>
      </blockquote>
      <blockquote>
        "I have been undertaking dental treatment here for 2 years. The service is good. Treatment results are satisfying, and the staff tries to give their service at the best level. The hospital environment is also very clean with a good ambience."
        <cite>— Sathya Priya</cite>
      </blockquote>
      <blockquote>
        "I visited Jerush from Australia after my wife recommended this practice. The dental treatment was very affordable comparatively. I had time constraints and they managed to finish the procedure in time as promised. I am very happy with the end result and don\'t hesitate to recommend Jerush to anyone."
        <cite>— Gulamrasool Noohu</cite>
      </blockquote>
';

        $stmtInsertBlog = $db->prepare("INSERT INTO `blogs` (`title`, `slug`, `excerpt`, `content`, `category`, `featured_image`, `author_name`, `published_date`, `reading_time`, `status`, `seo_title`, `seo_description`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmtInsertBlog->execute([
            'Dental Implants in Chennai – Cost, Benefits & Procedure',
            'dental-implants-in-chennai-cost-benefits-procedure',
            'Missing teeth can affect your smile, chewing ability, and overall dental health. In Jerush Dentofacial, Chennai, we provide advanced, affordable dental implants.',
            $blogContent,
            'Dental Care',
            '/images/blog/dental-implants-blog/anatomy-of-healthy-teeth-and-tooth-dental-implant.webp',
            'DR. S. K. JEROME',
            'June 25, 2026',
            '8 min read',
            'published',
            'Dental Implants in Chennai: Cost, Benefits & Procedure at Jerush',
            'Looking for dental implants in Chennai? Get expert insights on dental implant costs, procedure details, and top benefits at Jerush Dentofacial.'
        ]);
        echo "Chennai dental implants blog post inserted.\n";
    } else {
        echo "Chennai dental implants blog post already exists.\n";
    }

    // ─── TEAM MEMBERS TABLE ─────────────────────────────────────────────────
    $db->exec("CREATE TABLE IF NOT EXISTS `team_members` (
        `id`         INT AUTO_INCREMENT PRIMARY KEY,
        `name`       VARCHAR(255) NOT NULL,
        `role`       VARCHAR(255) NOT NULL,
        `department` VARCHAR(100) NOT NULL,
        `branch`     VARCHAR(255) DEFAULT '',
        `image`      VARCHAR(500) DEFAULT '',
        `sort_order` INT DEFAULT 0,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "team_members table ready.\n";

    $teamSeedData = [
        // Management
        ['Mr. Rajesh Kumar Pius', 'Manager', 'management', 'Jerush Groups', 1],
        // PRO
        ['Miss. Monika',        'Dental PRO',          'pro', 'Jerush Head Clinic – Thuckalay', 1],
        ['Mrs. Renisha',        'Cosmetic PRO',         'pro', 'Jerush Head Clinic – Thuckalay', 2],
        ['Miss. Ashmi Sharo',   'Cosmetic PRO',         'pro', 'Jerush Head Clinic – Thuckalay', 3],
        ['Miss. Shivani Sharo', 'PRO',                  'pro', 'Jerush Chennai Branch',          4],
        // Accounts
        ['Mrs. Suja',      'Accountant',       'accounts', 'Jerush Head Clinic – Thuckalay', 1],
        ['Miss. Anishka',  'Accountant',       'accounts', 'Jerush Head Clinic – Thuckalay', 2],
        ['Miss. Ashika',   'Accountant',       'accounts', 'Jerush Head Clinic – Thuckalay', 3],
        ['Mrs. Praveena',  'Accountant',       'accounts', 'Jerush Chennai Branch',          4],
        ['Miss. Jenisha',  'Accountant & PRO', 'accounts', 'Jerush Trichy Branch',           5],
        // Aligners
        ['Mrs. Berlin Monisha', 'Clear Aligner Technician',  'aligners', 'Jerush Head Clinic – Thuckalay', 1],
        ['Mr. Sukustel Martin', 'Clear Aligner Technician',  'aligners', 'Jerush Head Clinic – Thuckalay', 2],
        ['Mr. Darbin',          'Ceramic Crown Technician',  'aligners', 'Jerush Head Clinic – Thuckalay', 3],
        // Radiology
        ['Mr. Jophy Robinson', 'Radiographic Technician', 'radiology', 'Jerush Head Clinic – Thuckalay', 1],
        // IT
        ['Mr. Satheesh',    'Graphic Designer & Social Media Manager', 'it', 'Jerush Head Clinic – Thuckalay', 1],
        ['Mr. Shine Peter', 'Full-Stack Developer',                    'it', 'Jerush Head Clinic – Thuckalay', 2],
        ['Mrs. Shamna',     'Marketing Manager',                       'it', 'Jerush Head Clinic – Thuckalay', 3],
        ['Miss. Vaishnavi', 'Telecaller',                              'it', 'Jerush Head Clinic – Thuckalay', 4],
        // Dental Assistants
        ['Miss. Abisha',  'Dental Assistant', 'dental_assistants', 'Jerush Head Clinic – Thuckalay', 1],
        ['Miss. Sherin',  'Dental Assistant', 'dental_assistants', 'Jerush Head Clinic – Thuckalay', 2],
        ['Miss. Neslin',  'Dental Assistant', 'dental_assistants', 'Jerush Head Clinic – Thuckalay', 3],
        ['Miss. Saranya', 'Dental Assistant', 'dental_assistants', 'Jerush Head Clinic – Thuckalay', 4],
        ['Miss. Suganya', 'Dental Assistant', 'dental_assistants', 'Jerush Head Clinic – Thuckalay', 5],
        ['Miss. Ansuya',  'Dental Assistant', 'dental_assistants', 'Jerush Head Clinic – Thuckalay', 6],
        ['Miss. Jeni',    'Dental Assistant', 'dental_assistants', 'Jerush Head Clinic – Thuckalay', 7],
        ['Miss. Lijiya',  'Dental Assistant', 'dental_assistants', 'Jerush Trichy Branch',           8],
        ['Miss. Vijiya',  'Dental Assistant', 'dental_assistants', 'Jerush Chennai Branch',          9],
        // Cosmetic Assistants
        ['Mrs. Sangeetha', 'Cosmetic Assistant', 'cosmetic_assistants', 'Jerush Head Clinic – Thuckalay', 1],
        ['Mrs. Lija',      'Cosmetic Assistant', 'cosmetic_assistants', 'Jerush Head Clinic – Thuckalay', 2],
        ['Mrs. Sheeba',    'Cosmetic Assistant', 'cosmetic_assistants', 'Jerush Head Clinic – Thuckalay', 3],
        ['Miss. Riya',     'Cosmetic Assistant', 'cosmetic_assistants', 'Jerush Head Clinic – Thuckalay', 4],
        ['Miss. Daisy',    'Cosmetic Assistant', 'cosmetic_assistants', 'Jerush Head Clinic – Thuckalay', 5],
        // Front Desk
        ['Mrs. Reji',    'Front Desk Receptionist', 'front_desk', 'Jerush Head Clinic – Thuckalay', 1],
        ['Mrs. Jincy',   'Front Desk Receptionist', 'front_desk', 'Jerush Head Clinic – Thuckalay', 2],
        ['Miss. Rithya', 'Front Desk Receptionist', 'front_desk', 'Jerush Chennai Branch',          3],
        ['Mrs. Anju',    'Front Desk Receptionist', 'front_desk', 'Jerush Trichy Branch',           4],
        // Maintenance
        ['Mr. Dhivin', 'Maintenance Manager', 'maintenance', 'Jerush Head Clinic – Thuckalay', 1],
        // Housekeeping
        ['Mrs. Anitha',   'Housekeeping Staff', 'housekeeping', 'Jerush Head Clinic – Thuckalay', 1],
        ['Mrs. Mini',     'Housekeeping Staff', 'housekeeping', 'Jerush Head Clinic – Thuckalay', 2],
        ['Mrs. Princiya', 'Housekeeping Staff', 'housekeeping', 'Jerush Head Clinic – Thuckalay', 3],
        ['Mrs. Sasi',     'Housekeeping Staff', 'housekeeping', 'Jerush Head Clinic – Thuckalay', 4],
        // Security
        ['Mr. Sugumaran', 'Security Guard', 'security', 'Jerush Head Clinic – Thuckalay', 1],
        ['Mr. Robinson',  'Security Guard', 'security', 'Jerush Head Clinic – Thuckalay', 2],
    ];

    $insertTeam = $db->prepare("INSERT INTO `team_members` (name, role, department, branch, sort_order) VALUES (?,?,?,?,?)");
    $countTeam  = $db->query("SELECT COUNT(*) FROM `team_members`")->fetchColumn();
    if ($countTeam == 0) {
        foreach ($teamSeedData as $row) {
            $insertTeam->execute($row);
        }
        echo "Team members seeded (" . count($teamSeedData) . " records).\n";
    } else {
        echo "Team members already seeded (count: $countTeam).\n";
    }

    // Alter image columns in doctors, team_members, and careers tables to allow large base64 uploads without truncation
    $db->exec("ALTER TABLE `team_members` MODIFY COLUMN `image` MEDIUMTEXT");
    $db->exec("ALTER TABLE `doctors` MODIFY COLUMN `image` MEDIUMTEXT");
    try {
        $db->exec("ALTER TABLE `careers` ADD COLUMN `image` MEDIUMTEXT DEFAULT NULL");
    } catch (Exception $e) {
        // Column may already exist
    }
    $db->exec("ALTER TABLE `careers` MODIFY COLUMN `image` MEDIUMTEXT");
    echo "Image columns altered to MEDIUMTEXT in team_members, doctors, and careers tables.\n";

    // ─── CLINIC HIGHLIGHTS TABLE ─────────────────────────────────────────────
    $db->exec("CREATE TABLE IF NOT EXISTS `clinic_highlights` (
        `id`          INT AUTO_INCREMENT PRIMARY KEY,
        `title`       VARCHAR(255) NOT NULL,
        `description` TEXT NOT NULL,
        `date`        VARCHAR(100) NOT NULL,
        `image`       MEDIUMTEXT DEFAULT NULL,
        `category`    VARCHAR(100) DEFAULT 'General',
        `link`        VARCHAR(255) DEFAULT NULL,
        `status`      VARCHAR(50) DEFAULT 'published',
        `created_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "clinic_highlights table ready.\n";

    $highlightSeedData = [
        [
            "Advanced German CAD/CAM 3D Aligner Lab Launched",
            "Jerush Dentoface has successfully established an in-house digital printing & orthodontic scan laboratory. This enables the direct production of Jerushaligne clear aligners, dropping the turnaround time down to just a few days while maintaining international precision standards.",
            "October 12, 2024",
            "/images/jerushaligne-opening-ceremony.webp",
            "Technology"
        ],
        [
            "Transforming Over 100,000+ Smiles Regionally",
            "We celebrate the incredible milestone of rendering dental and skincare beauty services to over 100,000 satisfied patients across our branches in Trichy, Chennai, Thuckalay, and Dubai. We remain committed to combining state-of-the-art diagnostics with clinical care.",
            "September 05, 2024",
            "/images/jerush-banner2.webp",
            "Milestone"
        ],
        [
            "Launch of Premium Laser Skincare Treatments in Chennai",
            "Introducing Fractional CO₂ Laser skin resurfacing and GFC (Growth Factor Concentrate) hair restoration therapies at our Chennai branch. These FDA-approved dermatology services represent the latest non-surgical cosmetic advancements.",
            "August 18, 2024",
            "/images/jerush-banner3.webp",
            "New Service"
        ]
    ];

    $insertHL = $db->prepare("INSERT INTO `clinic_highlights` (title, description, date, image, category, status) VALUES (?,?,?,?,?,'published')");
    $countHL  = $db->query("SELECT COUNT(*) FROM `clinic_highlights`")->fetchColumn();
    if ($countHL == 0) {
        foreach ($highlightSeedData as $row) {
            $insertHL->execute($row);
        }
        echo "Clinic highlights seeded (" . count($highlightSeedData) . " records).\n";
    } else {
        echo "Clinic highlights already seeded (count: $countHL).\n";
    }

    // ─── GALLERY EVENTS & PHOTOS TABLES ──────────────────────────────────────
    $db->exec("CREATE TABLE IF NOT EXISTS `gallery_events` (
        `id`          INT AUTO_INCREMENT PRIMARY KEY,
        `title`       VARCHAR(255) NOT NULL,
        `description` TEXT DEFAULT NULL,
        `event_date`  VARCHAR(100) NOT NULL,
        `cover_image` MEDIUMTEXT DEFAULT NULL,
        `status`      VARCHAR(50) DEFAULT 'published',
        `created_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "gallery_events table ready.\n";

    $db->exec("CREATE TABLE IF NOT EXISTS `gallery_event_photos` (
        `id`          INT AUTO_INCREMENT PRIMARY KEY,
        `event_id`    INT NOT NULL,
        `image_url`   MEDIUMTEXT NOT NULL,
        `created_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (`event_id`) REFERENCES `gallery_events`(`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "gallery_event_photos table ready.\n";

    // ─── CAREER APPLICATIONS TABLE ───────────────────────────────────────────
    $db->exec("CREATE TABLE IF NOT EXISTS `career_applications` (
        `id`           INT AUTO_INCREMENT PRIMARY KEY,
        `name`         VARCHAR(255) NOT NULL,
        `email`        VARCHAR(255) NOT NULL,
        `phone`        VARCHAR(100) NOT NULL,
        `position`     VARCHAR(255) DEFAULT NULL,
        `experience`   VARCHAR(255) DEFAULT NULL,
        `resumeName`   VARCHAR(255) DEFAULT NULL,
        `resumeData`   LONGTEXT DEFAULT NULL,
        `notes`        TEXT DEFAULT NULL,
        `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "career_applications table ready.\n";


    // Seed Events if empty
    $countEvents = $db->query("SELECT COUNT(*) FROM `gallery_events`")->fetchColumn();
    if ($countEvents == 0) {
        // Event 1: Christmas Celebration 2K25
        $stmtEvent = $db->prepare("INSERT INTO `gallery_events` (title, description, event_date, cover_image) VALUES (?, ?, ?, ?)");
        $stmtEvent->execute([
            'Christmas Celebration 2k25',
            'Grand Christmas and New Year celebrations at Jerush hospitals, sharing happiness and sweets with staff, patients, and friends.',
            'December 25, 2025',
            'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=600&q=80'
        ]);
        $christmasId = $db->lastInsertId();

        // Add photos for Christmas
        $stmtPhoto = $db->prepare("INSERT INTO `gallery_event_photos` (event_id, image_url) VALUES (?, ?)");
        $stmtPhoto->execute([$christmasId, 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=600&q=80']);
        $stmtPhoto->execute([$christmasId, 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=600&q=80']);
        $stmtPhoto->execute([$christmasId, 'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=600&q=80']);

        echo "Gallery events and photos seeded.\n";
    } else {
    // Cleanup any legacy mock Onam events
    $db->exec("DELETE FROM `gallery_events` WHERE `title` LIKE '%Onam%'");

    // Fix photo paths for Dr. Bladbin's Birthday event pointing to wrong event directory
    $db->exec("UPDATE `gallery_event_photos` p 
               JOIN `gallery_events` e ON p.event_id = e.id 
               SET p.image_url = REPLACE(p.image_url, '/images/events/jerushaligne-opening-event/', '/images/events/dr-bladbin-birthday/') 
               WHERE (e.title LIKE '%Bladbin%' OR e.title LIKE '%Birthday%') 
               AND p.image_url LIKE '%/images/events/jerushaligne-opening-event/%'");

    // Fix photo paths for Jerushaligne Opening event pointing to wrong folder name jerushaligne-events
    $db->exec("UPDATE `gallery_event_photos` 
               SET `image_url` = REPLACE(`image_url`, '/images/events/jerushaligne-events/', '/images/events/jerushaligne-opening-event/') 
               WHERE `image_url` LIKE '%/images/events/jerushaligne-events/%'");

    $db->exec("UPDATE `gallery_events` 
               SET `cover_image` = REPLACE(`cover_image`, '/images/events/jerushaligne-events/', '/images/events/jerushaligne-opening-event/') 
               WHERE `cover_image` LIKE '%/images/events/jerushaligne-events/%'");

    // ─── MARQUEE NEWS & SETTINGS TABLES ──────────────────────────────────────
    $db->exec("CREATE TABLE IF NOT EXISTS `marquee_items` (
        `id`          INT AUTO_INCREMENT PRIMARY KEY,
        `title`       VARCHAR(500) NOT NULL,
        `badge`       VARCHAR(100) DEFAULT 'NEW',
        `badge_color` VARCHAR(255) DEFAULT 'bg-brandSky text-white',
        `link`        VARCHAR(255) DEFAULT NULL,
        `link_text`   VARCHAR(100) DEFAULT 'Learn More',
        `is_active`   TINYINT(1) DEFAULT 1,
        `priority`    INT DEFAULT 1,
        `created_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "marquee_items table ready.\n";

    $db->exec("CREATE TABLE IF NOT EXISTS `marquee_settings` (
        `id`              INT PRIMARY KEY DEFAULT 1,
        `enabled`         TINYINT(1) DEFAULT 1,
        `speed`           VARCHAR(50) DEFAULT 'normal',
        `pause_on_hover`  TINYINT(1) DEFAULT 1,
        `theme`           VARCHAR(100) DEFAULT 'dark-gradient',
        `show_live_badge` TINYINT(1) DEFAULT 1,
        `live_badge_text` VARCHAR(100) DEFAULT 'LIVE UPDATES',
        `updated_at`      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "marquee_settings table ready.\n";

    // Seed Marquee Settings if empty
    $countSettings = $db->query("SELECT COUNT(*) FROM `marquee_settings`")->fetchColumn();
    if ($countSettings == 0) {
        $db->exec("INSERT INTO `marquee_settings` (`id`, `enabled`, `speed`, `pause_on_hover`, `theme`, `show_live_badge`, `live_badge_text`) 
                   VALUES (1, 1, 'normal', 1, 'dark-gradient', 1, 'LIVE UPDATES')");
        echo "Marquee settings seeded.\n";
    }

    // Seed Marquee Items if empty
    $countMarquee = $db->query("SELECT COUNT(*) FROM `marquee_items`")->fetchColumn();
    if ($countMarquee == 0) {
        $marqueeSeedData = [
            ['Free International Dental & Skin Consultation Camp — Special Booking Offer!', 'OFFER', 'bg-emerald-500 text-white', '/contact', 'Book Free Slot', 1, 1],
            ['German 3D Intraoral Scanning & Digital Aligners now available across all Jerush centres.', 'NEW TECH', 'bg-brandSky text-white', '/treatments/dental/jerush-aligners', 'Explore Aligners', 1, 2],
            ['24/7 Emergency Dental & Maxillofacial Trauma Care Line: Call +91 94891 60055', 'HELPLINE', 'bg-rose-500 text-white', 'tel:+919489160055', 'Call Emergency', 1, 3],
            ['Jerush Dubai Deira Clinic Special — 20% Discount on Smile Makeovers & Dimple Creation', 'DUBAI SPECIAL', 'bg-amber-500 text-slate-950 font-black', 'tel:+971507253105', 'Call Dubai Branch', 1, 4],
            ['Free Hair Density & Trichology Diagnostics with German Certified Specialists', 'FEATURED', 'bg-purple-500 text-white', '/treatments/hair/hair-reduction-treatment', 'Learn More', 1, 5],
        ];
        $insertMI = $db->prepare("INSERT INTO `marquee_items` (title, badge, badge_color, link, link_text, is_active, priority) VALUES (?, ?, ?, ?, ?, ?, ?)");
        foreach ($marqueeSeedData as $row) {
            $insertMI->execute($row);
        }
        echo "Marquee items seeded.\n";
    }

    echo "Database migration completed successfully.\n";
} catch (Exception $e) {
    http_response_code(500);
    echo "Migration failed: " . $e->getMessage() . "\n";
}
