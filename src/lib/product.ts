export interface Product {
  id: string;               // ${vendorId}-${sourceId}
  vendor: string;
  title: string;
  description: string;
  price: number;            // normalized to USD (or base currency)
  currency: string;         // original currency code
  images: string[];
  category: string;
  stockStatus: 'in_stock' | 'out_of_stock' | 'limited';
  sku: string;
  lastUpdated: string;      // ISO timestamp
  sourceUrl?: string;
  // optional variants / extra fields
  variants?: Array<{ name: string; options: string[] }>;
  metadata?: Record<string, unknown>;
}

// Normalization helpers (e.g. parse price, clean strings)
export function normalizePrice(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const cleaned = value.replace(/[^0-9.]/g, '');
    return parseFloat(cleaned) || 0;
  }
  return 0;
}

export function normalizeImages(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter(v => typeof v === 'string');
  if (typeof value === 'string') return [value];
  return [];
}
