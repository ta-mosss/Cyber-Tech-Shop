import { VendorConfig } from '../adapters/base';

export const vendorsConfig: VendorConfig[] = [
  {
    id: 'vendor-json',
    name: 'TechGadgets Inc.',
    sourceType: 'json',
    sourceUrl: 'https://example.com/products.json', // or local file via /data/vendor1.json
    mapping: {
      id: 'product_id',
      title: 'name',
      description: 'description',
      price: 'price_usd',
      currency: 'currency',
      images: 'image_urls',
      category: 'category',
      stockStatus: 'availability',
      sku: 'sku',
      lastUpdated: 'updated_at',
    },
  },
  {
    id: 'vendor-csv',
    name: 'ElectroWorld',
    sourceType: 'csv',
    sourceUrl: 'https://example.com/inventory.csv',
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
  },
  {
    id: 'vendor-rest',
    name: 'SmartHome Hub',
    sourceType: 'rest',
    sourceUrl: 'https://api.smarthomehub.com/v1/products',
    auth: { type: 'apiKey', token: process.env.SMARTHOME_API_KEY! },
    mapping: {
      id: 'id',
      title: 'display_name',
      description: 'long_description',
      price: 'price_in_cents', // we'll normalize by dividing by 100
      images: 'media.images',
      category: 'tags[0]',
      stockStatus: 'stock.qty',
      sku: 'sku',
    },
  },
];
