import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items, shippingInfo } = req.body;
    // build line_items from cart items
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.title },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cart`,
      shipping_address_collection: { allowed_countries: ['US', 'CA'] },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
