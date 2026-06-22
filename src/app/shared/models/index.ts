

export type { SocialLink, SocialLinkRow } from './social-link.model';
export { mapSocialLink } from './social-link.model';

export type { BiographyRow } from './biography.model';
export { mapBiography } from './biography.model';

export type { Technology, WorkingField, WorkingFieldRow } from './working-field.model';
export { mapWorkingField } from './working-field.model';

export type { Quote, QuoteRow } from './quote.model';
export { mapQuote } from './quote.model';

export type { Experience, ExperienceRow } from './experience.model';
export { mapExperience } from './experience.model';

export type { Project, ProjectRow } from './project.model';
export { mapProject } from './project.model';

export type {
  WorkingHour,
  ServiceStats,
  ProjectInterest,
  ServiceConfig,
  ServiceConfigRow
} from './service-config.model';
export { mapServiceConfig } from './service-config.model';

export interface PersonalInfo {
  name: string;
  alias: string;
  title: string;
  tagline: string;
  avatarPath: string;
  born: string;
  based: string;
  education: string;
  focus: string;
  resumeUrl: string;
  email: string;
}

export interface NavLink {
  label: string;
  path: string;
  svgIcon: string;
}

export type AvailabilityStatus = 'available' | 'limited' | 'unavailable';

export interface ServiceItem {
  title: string;
  description: string;
  iconIdentifier: string;
}
