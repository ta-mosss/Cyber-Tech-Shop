import { Product } from '@/lib/product';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition dark:border-gray-700">
      <Link href={`/products/${product.id}`}>
        <img
          src={product.images[0] || '/placeholder.jpg'}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg truncate">{product.title}</h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{product.category}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-primary text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
