import { Injectable, inject, resource, computed } from '@angular/core';
import { SupabaseClientService } from './supabase-client.service';
import { type Experience, type ExperienceRow, mapExperience } from '../models';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private readonly supabase = inject(SupabaseClientService);

  private readonly _resource = resource({
    loader: async () => {
      const { data, error } = await this.supabase.client
        .from('experiences')
        .select('*')
        .order('order_index');
      if (error) throw error;
      return (data as ExperienceRow[]).map(mapExperience);
    }
  });

  readonly data      = computed(() => this._resource.value() ?? [] as Experience[]);
  readonly isLoading = this._resource.isLoading;
  readonly error     = this._resource.error;
}
