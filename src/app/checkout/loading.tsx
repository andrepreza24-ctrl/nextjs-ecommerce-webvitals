export default function CheckoutLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 font-medium">Preparando pasarela de pago...</p>
    </div>
  );
}