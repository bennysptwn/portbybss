// src/app/shared/models/biography.model.ts

export interface BiographyRow {
  id: string;
  paragraph: string;
  order_index: number;
}

export function mapBiography(row: BiographyRow): string {
  return row.paragraph;
}
