'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { processPaymentAction } from '@/lib/actions';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simula la llamada de pago con Stripe mediante Server Action
      await processPaymentAction(101, 'pm_card_visa');
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-sm bg-white">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Finalizar Compra</h1>

      <div className="border-b pb-4 mb-6">
        <h2 className="font-semibold text-gray-700 mb-2">Resumen de Orden</h2>
        <div className="flex justify-between text-sm py-1">
          <span>Teclado Mecánico Wireless RGB</span>
          <span className="font-medium">$89.99</span>
        </div>
        <div className="flex justify-between text-sm py-1 border-t mt-2 pt-2 font-bold text-gray-900">
          <span>Total a pagar:</span>
          <span className="text-green-600">$89.99</span>
        </div>
      </div>

      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tarjeta de Crédito / Débito (Stripe)
          </label>
          <input
            type="text"
            readOnly
            value="4242 •••• •••• 4242"
            className="w-full border rounded-lg p-2.5 text-sm bg-gray-50 text-gray-600 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? 'Procesando Pago...' : 'Pagar con Stripe $89.99'}
        </button>
      </form>
    </div>
  );
}