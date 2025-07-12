import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    
    // Admin routes - only admin role
    if (isAdminRoute && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    
    // User routes - logged in users
    const userProtectedRoutes = ['/booking', '/profile'];
    if (userProtectedRoutes.some(route => req.nextUrl.pathname.startsWith(route)) && !token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/booking/:path*', '/profile/:path*'],
};