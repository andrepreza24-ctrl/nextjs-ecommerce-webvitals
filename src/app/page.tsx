import { Suspense } from 'react';
import ProductList from '@/components/ProductList';
import Loading from './loading';

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Catálogo de Productos</h1>
      <Suspense fallback={<Loading />}>
        <ProductList />
      </Suspense>
    </main>
  );
}