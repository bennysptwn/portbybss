import { Injectable, inject, resource, computed } from '@angular/core';
import { SupabaseClientService } from './supabase-client.service';
import { type Project, type ProjectRow, mapProject } from '../models';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly supabase = inject(SupabaseClientService);

  private readonly _resource = resource({
    loader: async () => {
      const { data, error } = await this.supabase.client
        .from('projects')
        .select('*')
        .order('order_index');
      if (error) throw error;
      return (data as ProjectRow[]).map(mapProject);
    }
  });

  // All projects — components filter client-side via computed()
  readonly data      = computed(() => this._resource.value() ?? [] as Project[]);
  readonly isLoading = this._resource.isLoading;
  readonly error     = this._resource.error;
}
