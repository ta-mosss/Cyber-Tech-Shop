import { IVendorAdapter, VendorConfig } from './base';
import { Product, normalizePrice, normalizeImages } from '../lib/product';

export class JsonAdapter implements IVendorAdapter {
  vendorId: string;
  private config: VendorConfig;

  constructor(config: VendorConfig) {
    this.vendorId = config.id;
    this.config = config;
  }

  async fetch(): Promise<Product[]> {
    const response = await fetch(this.config.sourceUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const rawData = await response.json();
    // assume rawData is an array of objects
    if (!Array.isArray(rawData)) throw new Error('JSON root must be an array');
    return rawData.map((item: any) => this.mapItem(item));
  }

  private mapItem(item: any): Product {
    const { mapping } = this.config;
    const product: Product = {
      id: `${this.vendorId}-${String(item[mapping.id])}`,
      vendor: this.config.name,
      title: String(item[mapping.title] || ''),
      description: String(item[mapping.description] || ''),
      price: normalizePrice(item[mapping.price]),
      currency: item[mapping.currency] || 'USD',
      images: normalizeImages(item[mapping.images]),
      category: String(item[mapping.category] || 'Uncategorized'),
      stockStatus: this.normalizeStock(item[mapping.stockStatus]),
      sku: String(item[mapping.sku] || ''),
      lastUpdated: new Date().toISOString(),
      sourceUrl: this.config.sourceUrl,
    };
    return product;
  }

  private normalizeStock(value: unknown): 'in_stock' | 'out_of_stock' | 'limited' {
    if (typeof value === 'string') {
      const v = value.toLowerCase();
      if (v.includes('out') || v.includes('unavailable')) return 'out_of_stock';
      if (v.includes('limited') || v.includes('few')) return 'limited';
    }
    if (typeof value === 'number') {
      if (value <= 0) return 'out_of_stock';
      if (value < 5) return 'limited';
    }
    return 'in_stock';
  }
}
