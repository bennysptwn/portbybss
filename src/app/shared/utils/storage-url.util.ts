import { environment } from '../../../environments/environment';

const BUCKET = 'portfolio-images';

/**
 * Builds a public Supabase Storage URL from a relative image path.
 * Returns null if imagePath is null or empty.
 */
export function buildStorageUrl(imagePath: string | null | undefined): string | null {
  if (!imagePath) return null;
  return `${environment.supabase.url}/storage/v1/object/public/${BUCKET}/${imagePath}`;
}
