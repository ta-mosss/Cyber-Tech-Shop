import { CsvAdapter } from '@/adapters/csv.adapter';
import { VendorConfig } from '@/adapters/base';

const config: VendorConfig = {
  id: 'csv-test',
  name: 'CSV Vendor',
  sourceType: 'csv',
  sourceUrl: 'https://example.com/test.csv',
  mapping: {
    id: 'SKU',
    title: 'ProductName',
    description: 'Description',
    price: 'Price',
    currency: 'Currency',
    images: 'ImageURL',
    category: 'Category',
    stockStatus: 'Stock',
    sku: 'SKU',
  },
};

global.fetch = jest.fn();

describe('CsvAdapter', () => {
  it('parses CSV correctly', async () => {
    const csv = 'SKU,ProductName,Description,Price,Currency,ImageURL,Category,Stock\n' +
                'A1,Product A,Good,100,USD,img.jpg,Electronics,5';
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: async () => csv,
    });

    const adapter = new CsvAdapter(config);
    const products = await adapter.fetch();
    expect(products).toHaveLength(1);
    expect(products[0].title).toBe('Product A');
    expect(products[0].price).toBe(100);
  });
});
