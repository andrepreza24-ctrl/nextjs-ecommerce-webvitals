'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { registerAction } from '@/lib/actions';

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const res = await registerAction(formData);
      return res || null;
    },
    null
  );

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-xl shadow-sm bg-white">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">Crear Cuenta</h1>

      {state?.error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded border border-red-200">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            name="password"
            required
            className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50"
        >
          {isPending ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="text-blue-600 hover:underline font-medium">
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
}