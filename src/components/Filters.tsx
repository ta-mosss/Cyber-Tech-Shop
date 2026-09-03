import { Product } from '@/lib/product';
import { useState, useEffect } from 'react';

interface FiltersProps {
  products: Product[];
  onFilter: (filtered: Product[]) => void;
}

export default function Filters({ products, onFilter }: FiltersProps) {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  useEffect(() => {
    let filtered = products;
    if (category !== 'all') {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    onFilter(filtered);
  }, [category, search, priceRange, products, onFilter]);

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-4 py-2 dark:bg-gray-800"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded px-4 py-2 dark:bg-gray-800"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
      <div className="flex gap-2 items-center">
        <span>Price:</span>
        <input
          type="number"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          className="w-20 border rounded px-2 py-1 dark:bg-gray-800"
        />
        <span>to</span>
        <input
          type="number"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-20 border rounded px-2 py-1 dark:bg-gray-800"
        />
      </div>
    </div>
  );
}
