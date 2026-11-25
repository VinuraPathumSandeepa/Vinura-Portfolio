export type Project = {
  id: string
  title: string
  subtitle?: string
  type?: 'Group Project' | 'Individual Project'
  summary: string
  details: string[]
  contribution?: string
  technologies: string[]
  repositoryUrl: string | null
  demoUrl: string | null
  apkUrl?: string | null
  caseStudyUrl?: string | null
  visual: 'gemora' | 'food' | 'gym' | 'airline'
  featured?: boolean
  wide?: boolean
}

export type SocialLink = {
  id: 'github' | 'linkedin' | 'portfolio'
  label: string
  url: string | null
}

// Replace null with a verified URL to enable a project or social link.
export const projects: Project[] = [
  {
    id: 'gemora-ai',
    title: 'GemoraAI',
    subtitle: 'AI-Assisted Gemstone Marketplace',
    type: 'Group Project',
    summary: 'A cross-platform gemstone marketplace with seller listings, image and certificate uploads, authenticated dashboards, and REST API integration.',
    details: [
      'AI-assisted gem analysis flags potential issues for human gemologist review.',
      'The broader platform includes shipping and export compliance workflows.',
    ],
    contribution: 'Seller-facing React/Flutter features, listing-related flows, and software testing.',
    technologies: ['React', 'Flutter', 'ASP.NET Core (C#)', 'PostgreSQL', 'Gemini API'],
    repositoryUrl: null,
    demoUrl: 'https://gemora-marketplace-web.onrender.com',
    apkUrl: 'https://github.com/VinuraPathumSandeepa/Vinura-Portfolio/releases/download/gemora-android-1/GemoraAI.apk',
    caseStudyUrl: '/?case-study=gemora-ai',
    visual: 'gemora',
    featured: true,
  },
  {
    id: 'quickbite',
    title: 'QuickBite Food Delivery System',
    type: 'Individual Project',
    summary: 'A complete food delivery system developed independently.',
    details: [
      'Developed backend services and database operations for menu and order management.',
      'Used Git for version control throughout the project.',
    ],
    technologies: ['React', 'Java', 'Spring Boot', 'REST APIs', 'JPA/Hibernate'],
    repositoryUrl: null,
    demoUrl: 'https://quickbite-food-delivery-system.vercel.app/',
    visual: 'food',
    wide: true,
  },
  {
    id: 'gym-management',
    title: 'Gym Management System',
    subtitle: 'Feedback and Rating Management',
    type: 'Group Project',
    summary: 'Member feedback and ratings within a group-built gym management system.',
    details: [
      'Enabled members to submit, update, and view ratings and reviews through REST APIs.',
      'Implemented secure feedback handling and average rating calculations.',
      'Integrated API-based text summarization of feedback for trainer and admin review.',
    ],
    contribution: 'Developed the Feedback and Rating Management module.',
    technologies: ['Full Stack', 'REST APIs', 'Secure Authentication', 'API Integration'],
    repositoryUrl: null,
    demoUrl: null,
    visual: 'gym',
  },
  {
    id: 'airline-reservation',
    title: 'Skylink',
    subtitle: 'Airline Ticket Reservation System',
    type: 'Group Project',
    summary: 'A collaborative airline reservation application for flight discovery, passenger booking, and payment submission.',
    details: [
      'The wider team built the traveler experience and reservation management.',
      'In the documented demo, payment and booking remain pending finance review.',
    ],
    contribution: 'Developed the Booking and Payment modules, including the multi-step booking flow, checkout, and post-submission status.',
    technologies: ['Java 17', 'Spring Boot', 'Spring Security', 'Hibernate/JPA', 'Thymeleaf', 'JavaScript', 'CSS', 'Bootstrap', 'MySQL 8'],
    repositoryUrl: 'https://github.com/MalinduPeiris/Skylink-Airline-Reservation-System',
    demoUrl: null,
    caseStudyUrl: '/?case-study=skylink',
    visual: 'airline',
  },
]

export type SkylinkScreenshotGroup = 'discovery' | 'booking' | 'payment'

export type SkylinkScreenshot = {
  id: string
  src: string
  original: string
  title: string
  caption: string
  alt: string
  group: SkylinkScreenshotGroup
  position?: string
}

export const skylinkScreenshotGroups: { id: SkylinkScreenshotGroup; title: string; description: string }[] = [
  { id: 'discovery', title: 'Flight discovery', description: 'The team-built traveler entry and flight search journey.' },
  { id: 'booking', title: 'Booking module', description: 'Passenger details, selected extras, and itinerary review from my Booking work.' },
  { id: 'payment', title: 'Payment module', description: 'My checkout and post-submission experience, with finance review still pending.' },
]

// Captured from the real application with isolated fictional demo data.
// Optimized previews retain the original PNGs for full-size inspection.
export const skylinkScreenshots = [
  { id: 'home', src: '/images/projects/skylink/01-skylink-home.webp', original: '/images/projects/skylink/01-skylink-home.png', title: 'Skylink homepage', caption: 'The traveler entry point and flight discovery.', alt: 'Skylink homepage with aircraft hero and flight search form', group: 'discovery' },
  { id: 'flight-search', src: '/images/projects/skylink/02-skylink-flight-search.webp', original: '/images/projects/skylink/02-skylink-flight-search.png', title: 'Flight search', caption: 'A fictional Colombo to Singapore search with date, party size, and cabin class.', alt: 'Skylink flight search form populated for a Colombo to Singapore journey', group: 'discovery' },
  { id: 'available-flights', src: '/images/projects/skylink/03-skylink-available-flights.webp', original: '/images/projects/skylink/03-skylink-available-flights.png', title: 'Available flights', caption: 'The fictional SL101 flight result shows route, cabin, seats, and fare.', alt: 'Skylink available flights result for fictional flight SL101', group: 'discovery' },
  { id: 'passenger-booking', src: '/images/projects/skylink/04-skylink-passenger-booking.webp', original: '/images/projects/skylink/04-skylink-passenger-booking.png', title: 'Passenger booking', caption: 'My Booking module combines a structured passenger form with a live fare summary.', alt: 'Skylink passenger booking form with progress steps and booking summary', group: 'booking', position: 'center top' },
  { id: 'booking-review', src: '/images/projects/skylink/05-skylink-booking-review.webp', original: '/images/projects/skylink/05-skylink-booking-review.png', title: 'Booking review', caption: 'The traveler reviews itinerary, passenger details, extras, and subtotal before payment.', alt: 'Skylink booking review screen with passenger details and selected extras', group: 'booking', position: 'center top' },
  { id: 'payment-checkout', src: '/images/projects/skylink/06-skylink-payment-checkout.webp', original: '/images/projects/skylink/06-skylink-payment-checkout.png', title: 'Payment checkout', caption: 'My Payment module separates the booking subtotal from the processing fee; the card fields shown are empty.', alt: 'Skylink payment checkout with empty card fields and fare breakdown', group: 'payment', position: 'center top' },
  { id: 'booking-status', src: '/images/projects/skylink/07-skylink-booking-status.webp', original: '/images/projects/skylink/07-skylink-booking-status.png', title: 'Pending booking status', caption: 'A fictional eZ Cash submission is acknowledged; payment and booking remain pending finance review.', alt: 'Skylink post-submission page showing pending payment and booking status', group: 'payment', position: 'center top' },
] satisfies SkylinkScreenshot[]

export const skylinkWorkflow = [
  { title: 'Flight discovery', screenshotId: 'available-flights', description: 'The traveler filters the fictional Colombo to Singapore route and selects flight SL101.', contribution: null },
  { title: 'Passenger booking', screenshotId: 'passenger-booking', description: 'The multi-step Booking flow collects passenger details and presents the selected fare.', contribution: 'My Booking module: passenger forms, reservation operations, and fare presentation.' },
  { title: 'Booking review', screenshotId: 'booking-review', description: 'A review step brings itinerary, selected extras, and the LKR 48,500 subtotal together before checkout.', contribution: 'My Booking module: review and selected-extras presentation.' },
  { title: 'Payment checkout', screenshotId: 'payment-checkout', description: 'The checkout shows card and eZ Cash options, an LKR 45 processing fee, and LKR 48,545 to submit. The captured card form is empty.', contribution: 'My Payment module: checkout interface, payment options, and fee breakdown.' },
  { title: 'Submission and pending status', screenshotId: 'booking-status', description: 'The fictional eZ Cash submission created pending payment and booking records for finance review; no ticket was issued.', contribution: 'My Payment module: post-submission confirmation and pending status.' },
]

export type GemoraScreenshotGroup = 'buyer' | 'seller' | 'verification' | 'mobile'

export type GemoraScreenshot = {
  id: string
  src: string
  title: string
  caption: string
  alt: string
  device: 'desktop' | 'mobile'
  group: GemoraScreenshotGroup
}

export const gemoraScreenshotGroups: { id: GemoraScreenshotGroup; title: string; description: string }[] = [
  { id: 'buyer', title: 'Buyer Web Experience', description: 'The buyer-facing journey from the GemoraAI homepage into gemstone discovery.' },
  { id: 'seller', title: 'Seller Web Experience', description: 'Seller dashboards and listing management within the wider team-built platform.' },
  { id: 'verification', title: 'Gemologist Verification & AI Analysis', description: 'Verification Details brings submitted evidence and the Gemora Verification Agent together. Its advisory findings, visual observations and risk flags support a human gemologist’s final decision.' },
  { id: 'mobile', title: 'Flutter Mobile Application', description: 'Android views for guest entry and gemstone discovery.' },
]

// Genuine screenshots. Missing files are omitted at runtime.
export const gemoraScreenshots = [
  { id: 'homepage', src: '/images/projects/gemora/homepage.png', title: 'GemoraAI homepage', caption: 'The landing page introduces the marketplace and its AI-assisted, human-reviewed approach.', alt: 'GemoraAI web homepage with gemstone imagery and marketplace introduction', device: 'desktop', group: 'buyer' },
  { id: 'web-buyer-dashboard', src: '/images/projects/gemora/web-buyer-dashboard.png', title: 'Buyer dashboard', caption: 'An account overview within the buyer web experience.', alt: 'GemoraAI buyer dashboard on the web', device: 'desktop', group: 'buyer' },
  { id: 'web-buyer-featured-gems', src: '/images/projects/gemora/web-buyer-featured-gems.png', title: 'Featured gemstones', caption: 'A curated gemstone selection presented to buyers.', alt: 'GemoraAI featured gemstones in the buyer web experience', device: 'desktop', group: 'buyer' },
  { id: 'web-buyer-marketplace', src: '/images/projects/gemora/web-buyer-marketplace.png', title: 'Buyer marketplace', caption: 'The web marketplace browsing view for available gemstones.', alt: 'GemoraAI buyer marketplace showing gemstone listings', device: 'desktop', group: 'buyer' },
  { id: 'seller-dashboard', src: '/images/projects/gemora/seller-dashboard.png', title: 'Seller dashboard', caption: 'The seller portal brings listing and verification activity into one view.', alt: 'GemoraAI seller dashboard with listing overview', device: 'desktop', group: 'seller' },
  { id: 'seller-my-listings', src: '/images/projects/gemora/seller-my-listings.png', title: 'My listings', caption: 'A dedicated view for managing a seller’s gemstone listings.', alt: 'GemoraAI seller My Listings page', device: 'desktop', group: 'seller' },
  { id: 'gemologist-verification', src: '/images/projects/gemora/gemologist-verification.png', title: 'Verification Details', caption: 'The gemologist reviews gemstone details and submitted visual evidence.', alt: 'GemoraAI gemologist Verification Details page with gemstone evidence', device: 'desktop', group: 'verification' },
  { id: 'ai-analysis', src: '/images/projects/gemora/ai-analysis.png', title: 'Gemora Verification Agent', caption: 'Advisory findings, visual observations and risk flags appear within Verification Details; the human gemologist makes the final decision.', alt: 'Gemora Verification Agent analysis with advisory findings, visual observations and risk flags', device: 'desktop', group: 'verification' },
  { id: 'mobile-marketplace', src: '/images/projects/gemora/mobile-marketplace.png', title: 'Mobile marketplace', caption: 'Gemstone discovery and category browsing in the Flutter Android app.', alt: 'GemoraAI Flutter marketplace shown inside its captured Android device frame', device: 'mobile', group: 'mobile' },
  { id: 'mobile-guest-home', src: '/images/projects/gemora/mobile-guest-home.png', title: 'Guest home', caption: 'The guest entry view introduces browsing before sign-in.', alt: 'GemoraAI Flutter guest home shown inside its captured Android device frame', device: 'mobile', group: 'mobile' },
  { id: 'mobile-splash', src: '/images/projects/gemora/mobile-splash.png', title: 'Splash screen', caption: 'The Flutter app’s opening screen.', alt: 'GemoraAI Flutter splash screen shown inside its captured Android device frame', device: 'mobile', group: 'mobile' },
] satisfies GemoraScreenshot[]

export type TechnologyIconId =
  | 'react' | 'typescript' | 'javascript' | 'html5' | 'css3'
  | 'java' | 'springboot' | 'dotnet' | 'rest' | 'csharp' | 'hibernate' | 'gemini' | 'integration'
  | 'flutter' | 'postgresql' | 'mysql' | 'git' | 'github'

export type Technology = {
  name: string
  icon: TechnologyIconId
  color: string
}

export type SkillGroup = {
  id: 'frontend' | 'backend' | 'mobile' | 'databases' | 'tools'
  title: string
  technologies: Technology[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend', title: 'Frontend', technologies: [
      { name: 'React', icon: 'react', color: '#61dafb' },
      { name: 'TypeScript', icon: 'typescript', color: '#5a9bea' },
      { name: 'JavaScript', icon: 'javascript', color: '#f7df1e' },
      { name: 'HTML5', icon: 'html5', color: '#e86b40' },
      { name: 'CSS3', icon: 'css3', color: '#4d9ae8' },
    ],
  },
  {
    id: 'backend', title: 'Backend', technologies: [
      { name: 'Java', icon: 'java', color: '#e77b4b' },
      { name: 'Spring Boot', icon: 'springboot', color: '#8bca56' },
      { name: 'ASP.NET Core', icon: 'dotnet', color: '#a18cf3' },
      { name: 'REST APIs', icon: 'rest', color: '#85ddc6' },
      { name: 'C#', icon: 'csharp', color: '#b68be8' },
      { name: 'JPA/Hibernate', icon: 'hibernate', color: '#c9b982' },
      { name: 'Gemini API', icon: 'gemini', color: '#a5b9f9' },
      { name: 'API Integration', icon: 'integration', color: '#85ddc6' },
    ],
  },
  {
    id: 'mobile', title: 'Mobile', technologies: [
      { name: 'Flutter', icon: 'flutter', color: '#67c8f6' },
    ],
  },
  {
    id: 'databases', title: 'Databases', technologies: [
      { name: 'PostgreSQL', icon: 'postgresql', color: '#81a9e8' },
      { name: 'MySQL', icon: 'mysql', color: '#76adce' },
    ],
  },
  {
    id: 'tools', title: 'Developer Tools', technologies: [
      { name: 'Git', icon: 'git', color: '#f27655' },
      { name: 'GitHub', icon: 'github', color: '#eef4ef' },
    ],
  },
]

export const socialLinks: SocialLink[] = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/VinuraPathumSandeepa' },
  { id: 'linkedin', label: 'LinkedIn', url: null },
  { id: 'portfolio', label: 'Portfolio', url: null },
]

export const resumeUrl = '/resume.pdf'
