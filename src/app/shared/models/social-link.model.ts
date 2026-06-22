// src/app/shared/models/social-link.model.ts

export interface SocialLink {
  label: string;
  url: string;
  handle: string;
  iconIdentifier: string;
}

/** Supabase DB row shape (snake_case) */
export interface SocialLinkRow {
  id: string;
  label: string;
  url: string;
  handle: string | null;
  icon_identifier: string;
  order_index: number;
}

export function mapSocialLink(row: SocialLinkRow): SocialLink {
  return {
    label: row.label,
    url: row.url,
    handle: row.handle ?? '',
    iconIdentifier: row.icon_identifier
  };
}
