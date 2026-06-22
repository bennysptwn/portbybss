import { Injectable, inject, resource, computed } from '@angular/core';
import { SupabaseClientService } from './supabase-client.service';
import { type ServiceConfig, type ServiceConfigRow, mapServiceConfig } from '../models';

export const EMPTY_SERVICE_CONFIG: ServiceConfig = {
  manifesto: '',
  manifestoSub: '',
  services: [],
  workingHours: [],
  stats: { total: 0, active: 0, pending: 0, finished: 0 },
  timezone: '',
  contactNote: '',
  projectInterests: []
};

@Injectable({ providedIn: 'root' })
export class ServiceConfigService {
  private readonly supabase = inject(SupabaseClientService);

  private readonly _resource = resource({
    loader: async () => {
      const { data, error } = await this.supabase.client
        .from('service_config')
        .select('*')
        .limit(1)
        .single();
      if (error) throw error;
      return mapServiceConfig(data as ServiceConfigRow);
    }
  });

  readonly data      = computed(() => this._resource.value() ?? EMPTY_SERVICE_CONFIG);
  readonly isLoading = this._resource.isLoading;
  readonly error     = this._resource.error;
}
