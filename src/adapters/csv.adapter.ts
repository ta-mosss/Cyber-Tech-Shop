import Papa from 'papaparse';
import { IVendorAdapter, VendorConfig } from './base';
import { Product, normalizePrice, normalizeImages } from '../lib/product';

export class CsvAdapter implements IVendorAdapter {
  vendorId: string;
  private config: VendorConfig;

  constructor(config: VendorConfig) {
    this.vendorId = config.id;
    this.config = config;
  }

  async fetch(): Promise<Product[]> {
    const response = await fetch(this.config.sourceUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const csvText = await response.text();
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
    });
    if (result.errors.length) {
      // log errors but continue
      console.warn(`CSV parsing errors for ${this.vendorId}:`, result.errors);
    }
    const rows = result.data as any[];
    return rows.map(row => this.mapRow(row));
  }

  private mapRow(row: any): Product {
    const { mapping } = this.config;
    return {
      id: `${this.vendorId}-${String(row[mapping.id] || '').trim()}`,
      vendor: this.config.name,
      title: String(row[mapping.title] || '').trim(),
      description: String(row[mapping.description] || '').trim(),
      price: normalizePrice(row[mapping.price]),
      currency: row[mapping.currency] || 'USD',
      images: normalizeImages(row[mapping.images]),
      category: String(row[mapping.category] || 'Uncategorized').trim(),
      stockStatus: this.normalizeStock(row[mapping.stockStatus]),
      sku: String(row[mapping.sku] || '').trim(),
      lastUpdated: new Date().toISOString(),
      sourceUrl: this.config.sourceUrl,
    };
  }

  private normalizeStock = (value: unknown) => /* same as in JsonAdapter */;
}
