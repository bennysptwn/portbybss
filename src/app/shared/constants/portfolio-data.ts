// src/app/shared/constants/portfolio-data.ts
import type {
  PersonalInfo,
  SocialLink,
  WorkingField,
  Quote,
  Experience,
  Project,
  NavLink,
  AvailabilityStatus,
  ServiceConfig,
  ProjectInterest
} from '../models';

// ── Icon helper ──────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, string> = {
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
  email: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  'arrow-up-right': `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`,
  'nav-home': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  'nav-about': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>`,
  'nav-experiences': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  'nav-work-samples': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  'nav-services': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
};

export function getIcon(identifier: string): string {
  return ICON_MAP[identifier] ?? '';
}

// ── Personal Info ─────────────────────────────────────────────────────────────

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Benny Septiawan Salim',
  alias: 'bennysptwn a.k.a',
  title: 'Full-Stack Software Engineer',
  tagline: 'Crafting clean, scalable software — one commit at a time.',
  avatarPath: 'assets/avatar.jpg',
  born: 'Jambi, 24 September 2001',
  based: 'Tangerang, Indonesia',
  education: 'Bachelor of Informatics — Universitas Multimedia Nusantara',
  focus: 'Software Development',
  resumeUrl: '#',
  email: 'hello@bennysptwn.dev'
};

// ── Social Links ──────────────────────────────────────────────────────────────

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'github', url: 'https://github.com/bennysptwn', handle: '@bennysptwn', iconIdentifier: 'github' },
  { label: 'linkedin', url: 'https://linkedin.com/in/bennysptwn', handle: 'in/bennysptwn', iconIdentifier: 'linkedin' },
  { label: 'instagram', url: 'https://instagram.com/bennysptwn', handle: '@bennysptwn', iconIdentifier: 'instagram' }
];

// ── Biography ─────────────────────────────────────────────────────────────────

export const BIOGRAPHY: string[] = [
  `I'm a full-stack software engineer with over six years of experience building web applications that scale. My work spans everything from designing RESTful APIs and microservices to crafting pixel-perfect, accessible front-end interfaces.`,
  `I thrive at the intersection of engineering rigor and product thinking. I care deeply about code quality, developer experience, and shipping software that actually solves problems for real people.`,
  `Outside of work, I contribute to open-source projects, write about software architecture on my blog, and mentor junior engineers. When I'm not at a keyboard, you'll find me hiking trails or experimenting with home automation.`
];

// ── Working Fields ────────────────────────────────────────────────────────────

export const WORKING_FIELDS: WorkingField[] = [
  {
    title: 'Software Engineer — Generalist',
    subtitle: 'Full Stack Development',
    status: 'experienced',
    technologies: [{ name: 'Angular' }, { name: 'NestJS' }, { name: 'PostgreSQL' }, { name: 'Docker' }]
  },
  {
    title: 'Frontend Engineer',
    subtitle: 'UI & Web Interfaces',
    status: 'experienced',
    technologies: [{ name: 'Angular' }, { name: 'TypeScript' }, { name: 'CSS' }, { name: 'RxJS' }]
  },
  {
    title: 'Mobile Engineer',
    subtitle: 'Cross-platform Mobile Apps',
    status: 'experienced',
    technologies: [{ name: 'Flutter' }, { name: 'Dart' }, { name: 'Firebase' }]
  },
  {
    title: 'Backend Engineer',
    subtitle: 'APIs & Server Systems',
    status: 'experienced',
    technologies: [{ name: 'NestJS' }, { name: 'Node.js' }, { name: 'PostgreSQL' }, { name: 'Redis' }]
  },
  {
    title: 'Platform & DevOps',
    subtitle: 'Infrastructure & CI/CD',
    status: 'learning',
    technologies: [{ name: 'AWS' }, { name: 'Docker' }, { name: 'Kubernetes' }, { name: 'Terraform' }]
  },
  {
    title: 'AI Engineering',
    subtitle: 'LLM Integration & ML Apps',
    status: 'learning',
    technologies: [{ name: 'Python' }, { name: 'LangChain' }, { name: 'OpenAI API' }]
  }
];

// ── Quotes ────────────────────────────────────────────────────────────────────

export const QUOTES: Quote[] = [
  { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', author: 'Martin Fowler', source: 'Refactoring' },
  { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  { text: 'The best code is no code at all.', author: 'Jeff Atwood', source: 'Coding Horror' }
];

// ── Experiences ───────────────────────────────────────────────────────────────

export const EXPERIENCES: Experience[] = [
  {
    companyName: 'Nexus Technologies',
    companyShort: 'Nexus Technologies',
    position: 'Senior Software Engineer',
    employmentDate: 'Mar 2022 – Present',
    descriptions: [
      'Led migration of monolithic Angular app to micro-frontend architecture, reducing bundle size by 42%.',
      'Built real-time notification system using WebSockets and Redis Pub/Sub for 50,000+ concurrent users.',
      'Mentored four junior engineers through code reviews, pair programming, and weekly 1:1s.',
      'Established front-end coding standards and automated CI/CD pipelines via GitHub Actions.'
    ]
  },
  {
    companyName: 'Brightwave Solutions',
    companyShort: 'Brightwave Solutions',
    position: 'Software Engineer',
    employmentDate: 'Jun 2020 – Feb 2022',
    descriptions: [
      'Built RESTful APIs using NestJS and PostgreSQL for a SaaS analytics platform with 10,000+ users.',
      'Developed reusable Angular component libraries shared across three product teams, cutting dev time by 30%.',
      'Integrated Stripe and PayPal with PCI-compliant checkout flows.',
      'Improved test coverage from 28% to 74% by introducing unit and integration testing standards.'
    ]
  },
  {
    companyName: 'CodeCraft Agency',
    companyShort: 'CodeCraft Agency',
    position: 'Junior Front-End Developer',
    employmentDate: 'Jan 2019 – May 2020',
    descriptions: [
      'Delivered responsive web interfaces for 12+ client projects using Angular and vanilla CSS.',
      'Translated Figma mockups into pixel-perfect, accessible HTML/CSS.',
      'Optimized page load performance via lazy loading, image compression, and CDN caching.'
    ]
  },
  {
    companyName: 'DevStart Internship Program',
    companyShort: 'DevStart',
    position: 'Software Engineering Intern',
    employmentDate: 'Jun 2018 – Dec 2018',
    descriptions: [
      'Contributed to an open-source task management tool built with React and Node.js.',
      'Fixed 20+ bugs and implemented 5 new features under senior engineer guidance.'
    ]
  }
];

// ── Projects ──────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    title: 'portbybss',
    role: 'Designer & Developer',
    technologies: ['Angular', 'TypeScript', 'CSS'],
    description: 'This portfolio. Minimalist black & white, fully data-driven, sidebar + bottom-nav SPA.',
    link: '#',
    category: 'personal'
  },
  {
    title: 'FlowBoard',
    role: 'Lead Engineer',
    technologies: ['Angular', 'NestJS', 'WebSockets', 'Docker'],
    description: 'Real-time collaborative project management board with drag-and-drop and live presence.',
    link: 'https://github.com/alexrivera/flowboard',
    category: 'personal'
  },
  {
    title: 'Mono UI Kit',
    role: 'Designer & Developer',
    technologies: ['TypeScript', 'Web Components', 'Storybook'],
    description: 'Zero-dependency UI component library with 30+ accessible components.',
    link: 'https://github.com/alexrivera/mono-ui-kit',
    category: 'personal'
  },
  {
    title: 'Spectral API Gateway',
    role: 'Back-End Engineer',
    technologies: ['Node.js', 'Redis', 'JWT', 'AWS Lambda'],
    description: 'Lightweight API gateway with rate limiting, JWT auth, and dynamic routing.',
    link: 'https://github.com/alexrivera/spectral-gateway',
    category: 'open-client'
  },
  {
    title: 'DevMetrics Dashboard',
    role: 'Full-Stack Engineer',
    technologies: ['Angular', 'D3.js', 'FastAPI', 'PostgreSQL'],
    description: 'Engineering metrics dashboard aggregating GitHub, Jira, and CI/CD data.',
    link: '',
    category: 'open-client'
  },
  {
    title: 'Pulse — Health Tracker',
    role: 'Mobile Web Developer',
    technologies: ['Angular PWA', 'IndexedDB', 'Service Workers'],
    description: 'PWA for tracking daily health metrics with offline support and push notifications.',
    link: 'https://github.com/alexrivera/pulse-tracker',
    category: 'official'
  }
];

// ── Service Config ────────────────────────────────────────────────────────────

export const SERVICE_CONFIG: ServiceConfig = {
  manifesto: `Most portfolios end with a contact form.\nThen they ghost you for two weeks.\nThis one doesn't.`,
  manifestoSub: `You'll get a reply within the same week — even if the answer is "not the right fit." Transparency is cheaper than ghosting.`,
  currentlyDoing: [
    'Building 2 client web apps in parallel',
    'Studying LLM application patterns',
    'Open-sourcing a NestJS starter'
  ],
  workingHours: [
    { day: 'MON — FRI', hours: '20:00 — 22:00 WIB' },
    { day: 'SATURDAY', hours: '09:00 — 22:00 WIB' },
    { day: 'SUNDAY', hours: 'Unavailable' }
  ],
  stats: { total: 14, active: 2, pending: 1, finished: 11 },
  timezone: 'WIB (GMT+7)',
  contactNote: `Not a fan of scheduling calls just to say hello? Fair enough.\nDrop me an email — I reply within 4 working days, no ghosting guaranteed. If it's a fit, we'll figure out the next step together.`,
  projectInterests: [
    {
      emoji: '🚀',
      title: 'Products That Actually Ship',
      description: `I build end-to-end digital products — from the database schema to the pixel on screen. Not just "a website," but a system that handles real users, real data, and real growth. If you have a business problem that needs a software solution, that's my lane. (Fair warning: I'll politely decline if the brief is "just a company profile page" — there are cheaper tools for that.)`
    },
    {
      emoji: '🎓',
      title: 'EduTech That Changes How People Learn',
      description: `Education is broken in a lot of places, and software can fix some of it. I'm genuinely excited about platforms that make learning more accessible, adaptive, or engaging — whether that's an LMS, a skill-assessment tool, or something entirely new. If you're building in this space, I want to hear about it.`
    },
    {
      emoji: '🏙️',
      title: 'Smart City & TOD Infrastructure',
      description: `Transit-Oriented Development, urban mobility, city dashboards, civic tech — this is the kind of work that outlasts any single product cycle. I'm interested in joining teams building the digital layer of cities: from real-time transit data to integrated urban planning tools. Big scope, long game, meaningful impact.`
    },
    {
      emoji: '🤝',
      title: 'Startup Teams (Co-founder or Early Engineer)',
      description: `If you're pre-seed or early-stage and need someone who can wear multiple hats — architect, build, and ship — let's talk. I'm open to equity conversations for the right idea. I care more about the problem you're solving than the funding round you're in.`
    }
  ]
};

// ── Availability & Scheduling ─────────────────────────────────────────────────

export const AVAILABILITY_STATUS: AvailabilityStatus = 'available';
export const SCHEDULING_LINK = 'https://calendly.com/bennysptwn/30min';

// ── Navigation Links ──────────────────────────────────────────────────────────

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/home', svgIcon: getIcon('nav-home') },
  { label: 'About', path: '/about', svgIcon: getIcon('nav-about') },
  { label: 'Experiences', path: '/experiences', svgIcon: getIcon('nav-experiences') },
  { label: 'Work Samples', path: '/work-samples', svgIcon: getIcon('nav-work-samples') },
  { label: 'Services', path: '/services', svgIcon: getIcon('nav-services') }
];
