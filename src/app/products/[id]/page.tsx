import Link from 'next/link';
import { fetchApi } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  // Obtenemos los productos y buscamos el que coincide con la ID de la URL
  const products = await fetchApi<Product[]>('/products');
  const product = Array.isArray(products)
    ? products.find((p) => p.id === productId)
    : null;

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Producto no encontrado</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  const formattedPrice = typeof product.price === 'number' 
    ? product.price.toFixed(2) 
    : '0.00';

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link
        href="/"
        className="inline-block mb-6 text-sm text-blue-600 hover:underline font-medium"
      >
        ← Volver al catálogo
      </Link>

      <div className="border rounded-xl p-8 bg-white shadow-sm">
        <h1 className="text-3xl font-bold mb-3 text-gray-900">{product.name}</h1>
        <p className="text-2xl font-bold text-green-600 mb-6">${formattedPrice}</p>

        <div className="border-t border-b py-4 my-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Descripción del producto
          </h2>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link
            href="/checkout"
            className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
          >
            Comprar ahora
          </Link>
        </div>
      </div>
    </div>
  );
}