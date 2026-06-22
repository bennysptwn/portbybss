import { Injectable, inject, resource, computed } from '@angular/core';
import { SupabaseClientService } from './supabase-client.service';
import { type SocialLink, type SocialLinkRow, mapSocialLink } from '../models';

@Injectable({ providedIn: 'root' })
export class SocialLinkService {
  private readonly supabase = inject(SupabaseClientService);

  private readonly _resource = resource({
    loader: async () => {
      const { data, error } = await this.supabase.client
        .from('social_links')
        .select('*')
        .order('order_index');
      if (error) throw error;
      return (data as SocialLinkRow[]).map(mapSocialLink);
    }
  });

  readonly data      = computed(() => this._resource.value() ?? [] as SocialLink[]);
  readonly isLoading = this._resource.isLoading;
  readonly error     = this._resource.error;
}
