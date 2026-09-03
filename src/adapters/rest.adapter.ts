import { IVendorAdapter, VendorConfig } from './base';
import { Product, normalizePrice, normalizeImages } from '../lib/product';

export class RestAdapter implements IVendorAdapter {
  vendorId: string;
  private config: VendorConfig;

  constructor(config: VendorConfig) {
    this.vendorId = config.id;
    this.config = config;
  }

  async fetch(): Promise<Product[]> {
    const headers: HeadersInit = {};
    if (this.config.auth) {
      if (this.config.auth.type === 'bearer') {
        headers.Authorization = `Bearer ${this.config.auth.token}`;
      } else if (this.config.auth.type === 'apiKey') {
        headers['X-API-Key'] = this.config.auth.token;
      }
    }
    const response = await fetch(this.config.sourceUrl, { headers });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const rawData = await response.json();
    if (!Array.isArray(rawData)) throw new Error('Expected array from REST API');
    return rawData.map((item: any) => this.mapItem(item));
  }

  private mapItem = (item: any): Product => {
    // same mapping logic as JSON adapter
  };
}
