import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const locales = ['en', 'fr', 'nl', 'es'];

    const pathnameHasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`));
    if (pathnameHasLocale) return;

    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en';
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}