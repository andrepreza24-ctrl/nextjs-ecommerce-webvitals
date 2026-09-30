import Link from 'next/link';
import { fetchApi } from '@/lib/api';

interface Order {
  id: number;
  total: number;
  status: string;
  created_at: string;
}

export default async function OrdersPage() {
  const orders = await fetchApi<Order[]>('/orders');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Mis Compras</h1>

      <div className="space-y-4">
        {!orders || orders.length === 0 ? (
          <div className="p-8 text-center border rounded-xl bg-white">
            <p className="text-gray-500 mb-4">No tienes compras registradas.</p>
            <Link href="/" className="text-blue-600 hover:underline font-medium">
              Ir al catálogo
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="border p-5 rounded-xl bg-white flex justify-between items-center shadow-sm"
            >
              <div>
                <p className="font-bold text-gray-900">Orden #{order.id}</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-800 uppercase font-bold tracking-wider">
                  {order.status || 'Completado'}
                </span>
                <p className="font-bold text-lg text-gray-900 mt-1">
                  ${typeof order.total === 'number' ? order.total.toFixed(2) : '89.99'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:underline font-medium">
          ← Volver al catálogo principal
        </Link>
      </div>
    </div>
  );
}