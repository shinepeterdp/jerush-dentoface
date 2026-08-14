## Project Goal

Build a fully CMS-ready for future admin dashboard integration.

Phase 1 focuses on UI/UX development and website completion. All content structures are designed so future migration to a custom Admin Dashboard requires no major code rewrites.

---

## Tech Stack

- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion (optional)
- Axios

---

## Design System

### Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#2853A4` | Royal Blue |
| `--color-secondary` | `#1E97D4` | Sky Blue |
| `--color-muted` | `#64748B` | Muted Slate |
| `--color-neutral-dark` | `#475569` | Slate Text |
| `--color-tertiary` | `#94A3B8` | — |
| `--color-neutral` | `#F8FAFC` | — |
| `--color-white` | `#FFFFFF` | — |
| `--color-accent-hover` | `#1A3C7A` | — |
| `--color-shadow` | `rgba(40, 83, 164, 0.08)` | — |
| `--color-border` | `#E2E8F0` | — |

### Typography

| Token | Value |
|---|---|
| `--font-headline` | `'Manrope', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` |
| `--font-body` | `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` |

### Transitions

| Token | Value |
|---|---|
| `--transition-fast` | `0.2s cubic-bezier(0.4, 0, 0.2, 1)` |
| `--transition-normal` | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` |
| `--transition-slow` | `0.4s cubic-bezier(0.4, 0, 0.2, 1)` |

---

## Folder Structure

```text
src/
├── assets/
│   ├── images/
│   ├── videos/
│   └── icons/
├── components/
│   ├── common/
│   ├── home/
│   ├── doctors/
│   ├── treatments/
│   ├── blogs/
│   ├── reviews/
│   └── contact/
├── layout/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── FloatingActions.jsx
│   └── BackToTop.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── AboutPage.jsx
│   ├── DoctorsPage.jsx
│   ├── TreatmentsPage.jsx
│   ├── BlogsPage.jsx
│   ├── BlogDetailsPage.jsx
│   ├── GalleryPage.jsx
│   ├── ReviewsPage.jsx
│   └── ContactPage.jsx
├── data/
│   ├── doctors.js
│   ├── treatments.js
│   ├── blogs.js
│   └── reviews.js
├── services/
│   ├── doctorService.js
│   ├── treatmentService.js
│   ├── blogService.js
│   └── reviewService.js
├── routes/
│   └── AppRoutes.jsx
├── App.jsx
└── main.jsx
```

---

## Core Development Rule

**Never hardcode content inside components.**

Avoid:

```javascript
const doctors = [...]
const treatments = [...]
const reviews = [...]
```

Instead, import from the data layer:

```javascript
import { doctors } from "../../data/doctors";
```

Future dashboard integration only requires replacing data files with API calls — no component changes needed:

```javascript
const doctors = await doctorService.getDoctors();
```

---

## Homepage Sections

Each section is built as an independent component, receiving data through props.

```text
HeroSection
WelcomeSection
ChairmansDesk
DoctorsTeam
TreatmentsSection
Testimonials
BlogPreviewSection
ContactSection
```

---

## Routing Structure

```text
/
/about
/doctors
/treatments
/gallery
/blogs
/blog/:slug
/reviews
/contact
```

---

## CMS Preparation (Phase 2)

Build the services layer even before APIs exist.

**Now:**

```javascript
// doctorService.js
export const getDoctors = async () => {
  return doctors;
};
```

**Later (no component changes required):**

```javascript
export const getDoctors = async () => {
  return axios.get("/api/doctors");
};
```

---

## Admin Dashboard (Phase 3)

A separate admin application.

```text
admin/
├── pages/
│   ├── Dashboard.jsx
│   ├── Doctors.jsx
│   ├── Treatments.jsx
│   ├── Blogs.jsx
│   ├── Reviews.jsx
│   ├── Gallery.jsx
│   └── Settings.jsx
├── components/
├── services/
└── layouts/
```

Recommended subdomain: `admin.jerushdentoface.com`

---

## Database Design (Future)

```text
users
doctors
treatments
blogs
blog_categories
reviews
gallery
homepage_settings
seo_settings
branches
events
```

---

## Blog System Requirements

Each blog entry supports:

- Title
- Slug
- Featured Image
- Excerpt
- Content
- Category
- Author
- Meta Title
- Meta Description
- Publish Date
- Status

---

## Homepage Dynamic Content (Future Dashboard)

Editable from dashboard without touching code:

- Hero Title
- Hero Subtitle
- Hero Video
- Welcome Message
- Chairman Message
- Statistics
- Featured Treatments
- Featured Blogs
- Contact Information

---

## Development Roadmap

| Phase | Scope |
|---|---|
| Phase 1 | Complete website UI, routing, responsive design, dummy data structure |
| Phase 2 | Create service layer, prepare API architecture |
| Phase 3 | Build custom admin dashboard |
| Phase 4 | Connect MySQL + APIs |
| Phase 5 | Make all sections editable from dashboard |

This architecture keeps the website scalable, maintainable, SEO-friendly, and fully owned — with no third-party CMS dependency.