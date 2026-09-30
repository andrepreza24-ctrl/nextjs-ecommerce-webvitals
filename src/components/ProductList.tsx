import Link from 'next/link';
import { fetchApi } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url?: string;
}

export default async function ProductList() {
  const products = await fetchApi<Product[]>('/products', {
    next: { tags: ['products'], revalidate: 60 },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
          <p className="text-lg font-bold text-green-600 mt-2">${product.price.toFixed(2)}</p>
          <Link
            href={`/products/${product.id}`}
            className="mt-4 block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Ver Detalle
          </Link>
        </div>
      ))}
    </div>
  );
}