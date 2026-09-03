import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { loadStripe } from '@stripe/stripe-js';

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState({ name: '', address: '', city: '', zip: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          shippingInfo: shipping,
        }),
      });
      const { sessionId } = await response.json();
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      await stripe?.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={shipping.name}
          onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
          required
          className="w-full border rounded px-4 py-2 dark:bg-gray-800"
        />
        <input
          type="text"
          placeholder="Street Address"
          value={shipping.address}
          onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
          required
          className="w-full border rounded px-4 py-2 dark:bg-gray-800"
        />
        <input
          type="text"
          placeholder="City"
          value={shipping.city}
          onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
          required
          className="w-full border rounded px-4 py-2 dark:bg-gray-800"
        />
        <input
          type="text"
          placeholder="ZIP Code"
          value={shipping.zip}
          onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
          required
          className="w-full border rounded px-4 py-2 dark:bg-gray-800"
        />
        <div className="border-t pt-4">
          <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Pay with Stripe'}
        </button>
      </form>
    </div>
  );
}
