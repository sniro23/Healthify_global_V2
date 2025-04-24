import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">Healthify Admin Portal</h1>
      <p className="mb-8 text-center max-w-md">
        Welcome to the Healthify Admin Portal. Please login to manage users, plans, and system settings.
      </p>
      <div className="flex gap-4">
        <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </Link>
      </div>
    </main>
  );
} 