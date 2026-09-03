import { createAdapter } from './factory';
import { vendorsConfig } from '../lib/vendors.config';
import { Product } from '../lib/product';
import { logger } from '../lib/logger';

export async function getAllProducts(): Promise<Product[]> {
  const results = await Promise.allSettled(
    vendorsConfig.map(async (config) => {
      const adapter = createAdapter(config);
      try {
        const products = await adapter.fetch();
        return { vendor: config.id, products };
      } catch (err) {
        logger.error(`Vendor ${config.id} failed:`, err);
        return { vendor: config.id, products: [], error: err };
      }
    })
  );

  const allProducts: Product[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value.products) {
      allProducts.push(...result.value.products);
    }
  }
  return allProducts;
}

// Optional: get product by id
export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find(p => p.id === id);
}
