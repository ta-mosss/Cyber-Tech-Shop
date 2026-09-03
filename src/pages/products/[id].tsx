import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllProducts, getProductById } from '../../adapters';
import { Product } from '../../lib/product';
import Image from 'next/image';

interface ProductDetailProps {
  product: Product | null;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  if (!product) return <div>Product not found</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={product.images[0]} alt={product.title} className="w-full rounded-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-2xl font-semibold mt-4">${product.price}</p>
          <p className="mt-2">Vendor: {product.vendor}</p>
          <p className="mt-2">Status: {product.stockStatus}</p>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getAllProducts();
  const paths = products.map(p => ({ params: { id: p.id } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const product = await getProductById(id);
  return {
    props: { product: product || null },
    revalidate: 3600,
  };
};
