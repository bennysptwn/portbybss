// src/app/shared/models/index.ts

export interface SocialLink {
  label: string;
  url: string;
  handle: string;           // e.g. "@alexrivera"
  iconIdentifier: string;
}

export interface Technology {
  name: string;
}

export interface WorkingField {
  title: string;
  subtitle: string;
  technologies: Technology[];
  status: 'learning' | 'experienced';
}

export interface Experience {
  companyName: string;
  companyShort: string;     // short label shown inline e.g. "@ Nexus Technologies"
  position: string;
  employmentDate: string;
  descriptions: string[];
}

export interface Project {
  title: string;
  role: string;
  technologies: string[];
  description: string;
  link: string;
  category: 'personal' | 'open-client' | 'official';
}

export interface ServiceItem {
  title: string;
  description: string;
  iconIdentifier: string;
}

export interface PersonalInfo {
  name: string;
  alias: string;            // e.g. "alexrivera a.k.a"
  title: string;
  tagline: string;
  avatarPath: string;
  born: string;             // e.g. "Jakarta, 1 Jan 1995"
  based: string;            // e.g. "Jakarta, Indonesia"
  education: string;        // e.g. "Bachelor of CS — Universitas X"
  focus: string;            // e.g. "Software Development"
  resumeUrl: string;
  email: string;
}

export interface Quote {
  text: string;
  author: string;
  source?: string;
}

export interface NavLink {
  label: string;
  path: string;
  svgIcon: string;
}

export interface WorkingHour {
  day: string;
  hours: string;
}

export interface ServiceStats {
  total: number;
  active: number;
  pending: number;
  finished: number;
}

export interface ServiceConfig {
  manifesto: string;
  manifestoSub: string;
  currentlyDoing: string[];
  workingHours: WorkingHour[];
  stats: ServiceStats;
  timezone: string;
  projectInterests: ProjectInterest[];
  contactNote: string;
}

export interface ProjectInterest {
  title: string;
  description: string;
  emoji: string;
}

export type AvailabilityStatus = 'available' | 'limited' | 'unavailable';
