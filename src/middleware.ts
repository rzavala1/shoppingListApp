import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  const cookie = request.cookies.get('token')?.value;

  if(cookie===undefined){
    return NextResponse.rewrite(new URL('/login', request.url));
  }else if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/login') {
    if(cookie===undefined){
      return NextResponse.rewrite(new URL('/login', request.url))
    }else{
      return NextResponse.rewrite(new URL('/home', request.url))
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!auth|_next/static|favicon.ico).*)']
}