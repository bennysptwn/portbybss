// src/app/shared/models/service-config.model.ts

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

export interface ProjectInterest {
  emoji: string;
  title: string;
  description: string;
}

export interface ServiceConfig {
  manifesto: string;
  manifestoSub: string;
  services: string[];
  workingHours: WorkingHour[];
  stats: ServiceStats;
  timezone: string;
  contactNote: string;
  projectInterests: ProjectInterest[];
}

/** Supabase DB row shape (snake_case) */
export interface ServiceConfigRow {
  id: string;
  manifesto: string;
  manifesto_sub: string;
  services: string[];
  working_hours: WorkingHour[];
  stats_total: number;
  stats_active: number;
  stats_pending: number;
  stats_finished: number;
  timezone: string;
  contact_note: string;
  project_interests: ProjectInterest[];
}

export function mapServiceConfig(row: ServiceConfigRow): ServiceConfig {
  return {
    manifesto: row.manifesto,
    manifestoSub: row.manifesto_sub,
    services: row.services,
    workingHours: row.working_hours,
    stats: {
      total: row.stats_total,
      active: row.stats_active,
      pending: row.stats_pending,
      finished: row.stats_finished
    },
    timezone: row.timezone,
    contactNote: row.contact_note,
    projectInterests: row.project_interests
  };
}
