// src/app/shared/models/project.model.ts

export interface Project {
  title: string;
  role: string;
  technologies: string[];
  description: string;
  link: string;
  category: 'personal' | 'open-client' | 'official';
}

/** Supabase DB row shape (snake_case) */
export interface ProjectRow {
  id: string;
  title: string;
  role: string;
  technologies: string[];
  description: string;
  link: string | null;
  category: 'personal' | 'open-client' | 'official';
  order_index: number;
}

export function mapProject(row: ProjectRow): Project {
  return {
    title: row.title,
    role: row.role,
    technologies: row.technologies,
    description: row.description,
    link: row.link ?? '',
    category: row.category
  };
}
