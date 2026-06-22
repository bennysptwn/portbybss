import { Injectable, inject, resource, computed } from '@angular/core';
import { SupabaseClientService } from './supabase-client.service';
import { type Quote, type QuoteRow, mapQuote } from '../models';

@Injectable({ providedIn: 'root' })
export class QuoteService {
  private readonly supabase = inject(SupabaseClientService);

  private readonly _resource = resource({
    loader: async () => {
      const { data, error } = await this.supabase.client
        .from('quotes')
        .select('*')
        .order('order_index');
      if (error) throw error;
      return (data as QuoteRow[]).map(mapQuote);
    }
  });

  readonly data      = computed(() => this._resource.value() ?? [] as Quote[]);
  readonly isLoading = this._resource.isLoading;
  readonly error     = this._resource.error;
}
