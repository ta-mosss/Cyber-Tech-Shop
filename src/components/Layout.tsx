import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

export default function Layout({ children }: { children: ReactNode }) {
  const { totalItems } = useCart();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-dark text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            TechStore
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/products">Products</Link>
            <Link href="/cart" className="relative">
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <p>&copy; 2026 TechStore – Aggregator of Excellence</p>
      </footer>
    </div>
  );
}
