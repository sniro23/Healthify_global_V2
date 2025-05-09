import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/register', '/auth/callback'];

export async function authMiddleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  const { data: { session }, error } = await supabase.auth.getSession();

  // Handle errors
  if (error) {
    console.error('Auth middleware error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow public routes
  if (PUBLIC_ROUTES.some(route => request.nextUrl.pathname.startsWith(route))) {
    return res;
  }

  // Redirect to login if no session
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Get user role from session
  const userRole = session.user?.user_metadata?.role;

  // Role-based access control
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isDoctorRoute = request.nextUrl.pathname.startsWith('/doctor');
  const isPatientRoute = request.nextUrl.pathname.startsWith('/patient');

  if (isAdminRoute && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (isDoctorRoute && userRole !== 'doctor') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (isPatientRoute && userRole !== 'patient') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return res;
} 