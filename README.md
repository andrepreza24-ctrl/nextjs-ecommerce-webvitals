# Optimización Avanzada de Rendimiento: E-Commerce Next.js (App Router)

Aplicación web e-commerce desarrollada con **Next.js 16+**, **TypeScript** y **Tailwind CSS**, diseñada para consumir una API REST de forma segura mediante Server Components para lecturas, Server Actions para mutaciones asíncronas y manejo de cookies `httpOnly` para la persistencia de autenticación.

---

## Stack Tecnológico

- **Framework:** Next.js 16+ (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Iconos:** Lucide React
- **Pasarela de Pago:** Stripe Integration / Elements API
- **Optimización:** Server Components, React Suspense, `revalidatePath`, `revalidateTag`
- **Gestión de Sesión:** Cookies HTTP-Only en Server Actions

---

## Configuración del Entorno (`.env.example`)

Crea un archivo `.env.local` en la raíz del proyecto tomando como base `.env.example`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51MzX82Lk9X0y1Z2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z

### Variables de Entorno (.env.local)

El archivo `.env.local` almacena la configuración del cliente y las credenciales de la pasarela de pagos en modo de pruebas (Sandbox):

- `NEXT_PUBLIC_API_URL`: Punto de enlace base para el consumo de la API REST.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Clave pública de integración con Stripe Elements para el procesamiento de pagos en entorno de desarrollo.

Pasos para Ejecutar el Proyecto
Clonar el repositorio e instalar dependencias:

git clone https://github.com/andrepreza24-ctrl/nextjs-ecommerce-webvitals.git
cd e-commerce-frontend
npm install

Iniciar el servidor de desarrollo:
npm run dev

Compilar para producción:
npm run build
npm run start