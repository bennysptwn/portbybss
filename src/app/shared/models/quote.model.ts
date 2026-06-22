// src/app/shared/models/quote.model.ts

export interface Quote {
  text: string;
  author: string;
  source?: string;
}

/** Supabase DB row shape (snake_case) */
export interface QuoteRow {
  id: string;
  text: string;
  author: string;
  source: string | null;
  order_index: number;
}

export function mapQuote(row: QuoteRow): Quote {
  return {
    text: row.text,
    author: row.author,
    ...(row.source ? { source: row.source } : {})
  };
}
