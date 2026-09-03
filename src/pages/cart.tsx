import { useCart } from '@/hooks/useCart';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Link href="/products" className="text-primary underline mt-4 inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {cart.map((item) => (
          <li key={item.id} className="py-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ${item.price} × {item.quantity}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                className="w-16 border rounded px-2 py-1 dark:bg-gray-800"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-between items-center border-t pt-4">
        <span className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</span>
        <Link href="/checkout" className="bg-primary text-white px-6 py-3 rounded hover:bg-blue-700">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
