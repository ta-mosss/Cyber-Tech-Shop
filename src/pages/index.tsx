import { GetStaticProps } from 'next';
import { getAllProducts } from '@/adapters';
import { Product } from '@/lib/product';
import ProductGrid from '@/components/ProductGrid';

interface HomeProps {
  featured: Product[];
}

export default function Home({ featured }: HomeProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to TechStore</h1>
      <p className="text-xl mb-8">Discover the best electronics from multiple vendors</p>
      <ProductGrid products={featured} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const all = await getAllProducts();
  const featured = all.slice(0, 6); // show first 6 as featured
  return {
    props: { featured },
    revalidate: 3600,
  };
};
