// src/app/shared/models/working-field.model.ts

export interface Technology {
  name: string;
}

export interface WorkingField {
  title: string;
  subtitle: string;
  technologies: Technology[];
  status: 'learning' | 'experienced';
}

/** Supabase DB row shape (snake_case) */
export interface WorkingFieldRow {
  id: string;
  title: string;
  subtitle: string;
  status: 'experienced' | 'learning';
  technologies: Technology[];
  order_index: number;
}

export function mapWorkingField(row: WorkingFieldRow): WorkingField {
  return {
    title: row.title,
    subtitle: row.subtitle,
    status: row.status,
    technologies: row.technologies
  };
}
