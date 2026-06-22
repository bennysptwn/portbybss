import { Injectable, inject, resource, computed } from '@angular/core';
import { SupabaseClientService } from './supabase-client.service';
import { type BiographyRow, mapBiography } from '../models';

@Injectable({ providedIn: 'root' })
export class BiographyService {
  private readonly supabase = inject(SupabaseClientService);

  private readonly _resource = resource({
    loader: async () => {
      const { data, error } = await this.supabase.client
        .from('biography')
        .select('paragraph, order_index')
        .order('order_index');
      if (error) throw error;
      return (data as BiographyRow[]).map(mapBiography);
    }
  });

  readonly data      = computed(() => this._resource.value() ?? [] as string[]);
  readonly isLoading = this._resource.isLoading;
  readonly error     = this._resource.error;
}
