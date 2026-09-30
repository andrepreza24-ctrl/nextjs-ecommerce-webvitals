'use client';

export default function CheckoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Error al procesar el pago</h2>
      <p className="text-gray-600 mb-6">{error.message || 'Ocurrió un inconveniente con la transacción.'}</p>
      <button
        onClick={() => reset()}
        className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
      >
        Intentar nuevamente
      </button>
    </div>
  );
}