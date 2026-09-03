import { GetStaticProps } from 'next';
import { getAllProducts } from '../../adapters';
import { Product } from '../../lib/product';
import { useState } from 'react';
import ProductGrid from '../../components/ProductGrid';
import Filters from '../../components/Filters';

interface ProductsPageProps {
  products: Product[];
}

export default function ProductsPage({ products }: ProductsPageProps) {
  const [filtered, setFiltered] = useState(products);
  // filter logic here (category, price, search)

  return (
    <div className="container mx-auto px-4 py-8">
      <Filters products={products} onFilter={setFiltered} />
      <ProductGrid products={filtered} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getAllProducts();
  return {
    props: { products },
    revalidate: 3600, // revalidate every hour
  };
};
