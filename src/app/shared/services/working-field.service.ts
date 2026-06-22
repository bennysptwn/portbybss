import { Injectable, inject, resource, computed } from '@angular/core';
import { SupabaseClientService } from './supabase-client.service';
import { type WorkingField, type WorkingFieldRow, mapWorkingField } from '../models';

@Injectable({ providedIn: 'root' })
export class WorkingFieldService {
  private readonly supabase = inject(SupabaseClientService);

  private readonly _resource = resource({
    loader: async () => {
      const { data, error } = await this.supabase.client
        .from('working_fields')
        .select('*')
        .order('order_index');
      if (error) throw error;
      return (data as WorkingFieldRow[]).map(mapWorkingField);
    }
  });

  readonly data      = computed(() => this._resource.value() ?? [] as WorkingField[]);
  readonly isLoading = this._resource.isLoading;
  readonly error     = this._resource.error;
}
