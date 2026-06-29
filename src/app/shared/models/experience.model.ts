// src/app/shared/models/experience.model.ts
import { buildStorageUrl } from '../utils/storage-url.util';

export interface Experience {
  companyName: string;
  companyShort: string;
  position: string;
  employmentDate: string;
  descriptions: string[];
  imageUrl: string | null;
}

/** Supabase DB row shape (snake_case) */
export interface ExperienceRow {
  id: string;
  company_name: string;
  company_short: string;
  position: string;
  employment_date: string;
  descriptions: string[];
  order_index: number;
  image_path: string | null;
}

export function mapExperience(row: ExperienceRow): Experience {
  return {
    companyName: row.company_name,
    companyShort: row.company_short,
    position: row.position,
    employmentDate: row.employment_date,
    descriptions: row.descriptions,
    imageUrl: buildStorageUrl(row.image_path),
  };
}
