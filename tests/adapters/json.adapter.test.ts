import { JsonAdapter } from '@/adapters/json.adapter';
import { VendorConfig } from '@/adapters/base';

const config: VendorConfig = {
  id: 'test',
  name: 'Test Vendor',
  sourceType: 'json',
  sourceUrl: 'https://example.com/test.json',
  mapping: {
    id: 'id',
    title: 'name',
    description: 'desc',
    price: 'price',
    currency: 'currency',
    images: 'image',
    category: 'cat',
    stockStatus: 'stock',
    sku: 'sku',
  },
};

global.fetch = jest.fn();

describe('JsonAdapter', () => {
  it('maps JSON correctly', async () => {
    const mockData = [
      { id: '1', name: 'Product A', desc: 'Good', price: 99.99, currency: 'USD', image: 'a.jpg', cat: 'Electronics', stock: 'in_stock', sku: 'A1' },
    ];
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const adapter = new JsonAdapter(config);
    const products = await adapter.fetch();
    expect(products).toHaveLength(1);
    expect(products[0].title).toBe('Product A');
    expect(products[0].price).toBe(99.99);
  });
});
