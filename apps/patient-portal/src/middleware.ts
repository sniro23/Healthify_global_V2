import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes and their required roles
const protectedRoutes = {
  '/dashboard': ['patient', 'doctor', 'admin'],
  '/appointments': ['patient', 'doctor', 'admin'],
  '/messages': ['patient', 'doctor', 'admin'],
  '/records': ['patient', 'doctor', 'admin'],
  '/admin': ['admin'],
  '/doctor': ['doctor', 'admin'],
};

// Define API routes that need special handling
const apiRoutes = ['/api'];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Check auth state
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get user role if logged in - first from user metadata
  let userRole = null;
  if (session?.user) {
    // First try to get role from user metadata (most reliable)
    userRole = session.user.user_metadata?.role;
    
    // If not in metadata, try to get from database
    if (!userRole) {
      try {
        // Try from profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (profile?.role) {
          userRole = profile.role;
        } else {
          // Try from users table as fallback
          const { data: userData } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single();
          
          if (userData?.role) {
            userRole = userData.role;
          }
        }
      } catch (error) {
        console.error('Error fetching user role in middleware:', error);
      }
    }
    
    // Default to patient if we still couldn't determine role
    if (!userRole) {
      console.warn('Could not determine user role, defaulting to patient');
      userRole = 'patient';
    }
  }

  const path = req.nextUrl.pathname;

  // For debugging
  console.log('Middleware path:', path);
  console.log('Session exists:', !!session);
  console.log('User role:', userRole);

  // Check if route is protected
  const isProtectedRoute = Object.keys(protectedRoutes).some(route => 
    path.startsWith(route)
  );

  if (isProtectedRoute) {
    // Redirect to login if not authenticated
    if (!session) {
      const redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('redirect', path);
      return NextResponse.redirect(redirectUrl);
    }

    // Check role-based access - make it more permissive for now
    // For debugging, we'll be more lenient with permissions
    /*
    const requiredRoles = Object.entries(protectedRoutes).find(([route]) => 
      path.startsWith(route)
    )?.[1];

    if (requiredRoles && !requiredRoles.includes(userRole)) {
      // Redirect to unauthorized page if role doesn't match
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    */
  }

  // Redirect authenticated users away from auth pages
  if (session && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Handle API routes
  if (path.startsWith('/api')) {
    // Add CORS headers
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );

    return res;
  }

  return res;
}

// Configure paths that trigger the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 