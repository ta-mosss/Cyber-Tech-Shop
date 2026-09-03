import { NextApiRequest, NextApiResponse } from 'next';
import { getProductById } from '@/adapters';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const product = await getProductById(id as string);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  // You could call a vendor API here for live stock
  res.status(200).json({ stockStatus: product.stockStatus });
}
