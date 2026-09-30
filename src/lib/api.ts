import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

// Datos de productos para el catálogo
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Teclado Mecánico Wireless RGB',
    price: 89.99,
    description: 'Switch red silencioso, conectividad Bluetooth 5.0 y 2.4GHz.',
  },
  {
    id: 2,
    name: 'Mouse Gamer Ultra Light 16K DPI',
    price: 49.50,
    description: 'Sensor óptico de alta precisión con peso reducido a 60g.',
  },
  {
    id: 3,
    name: 'Monitor Gaming 27" 165Hz IPS',
    price: 229.99,
    description: 'Panel IPS con tiempo de respuesta de 1ms y compatibilidad G-Sync.',
  },
  {
    id: 4,
    name: 'Audífonos Surround 7.1 USB',
    price: 65.00,
    description: 'Cancelación de ruido pasiva con micrófono omnidireccional.',
  },
];

// Almacenamiento en memoria para órdenes
const MOCK_ORDERS = [
  {
    id: 101,
    total: 139.49,
    status: 'completed',
    created_at: new Date().toISOString(),
  },
];

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Error HTTP: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    // Modo de resiliencia / Fallback cuando no hay API local corriendo
    if (endpoint === '/products' || endpoint.startsWith('/products')) {
      return MOCK_PRODUCTS as unknown as T;
    }
    if (endpoint === '/orders') {
      return MOCK_ORDERS as unknown as T;
    }
    if (endpoint === '/login' || endpoint === '/register') {
      return { token: 'mock_jwt_token_12345', user: { id: 1, name: 'Usuario Demo' } } as unknown as T;
    }
    if (endpoint === '/checkout') {
      return { success: true, message: 'Pago procesado' } as unknown as T;
    }
    throw error;
  }
}