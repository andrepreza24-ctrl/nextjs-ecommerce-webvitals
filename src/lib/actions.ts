'use server';

import { cookies } from 'next/headers';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { fetchApi } from './api';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const res = await fetchApi<{ token: string; user: any }>('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const cookieStore = await cookies();
    cookieStore.set('auth_token', res.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });
  } catch (err: any) {
    return { error: err.message || 'Credenciales inválidas' };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function registerAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const res = await fetchApi<{ token: string }>('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    const cookieStore = await cookies();
    cookieStore.set('auth_token', res.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  } catch (err: any) {
    return { error: err.message || 'Error en el registro' };
  }

  redirect('/');
}

export async function createOrderAction(items: { product_id: number; quantity: number }[]) {
  let order;
  try {
    order = await fetchApi<{ id: number }>('/orders', {
      method: 'POST',
      body: JSON.stringify({ items }),
    });
  } catch (err: any) {
    throw new Error(err.message || 'Error al crear la orden');
  }

  revalidatePath('/orders');
  return order;
}

export async function processPaymentAction(orderId: number, paymentMethodId: string) {
  try {
    await fetchApi('/checkout', {
      method: 'POST',
      body: JSON.stringify({
        order_id: orderId,
        payment_method_id: paymentMethodId,
      }),
    });
  } catch (err: any) {
    throw new Error(err.message || 'Error al procesar el pago');
  }

  revalidateTag('user-orders');
  revalidatePath('/orders');
  redirect('/orders?success=1');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
  revalidatePath('/', 'layout');
  redirect('/login');
}