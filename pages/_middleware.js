import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    // check if locked in
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    // allow request if token exists or tries to authentificate
    const { pathname } = req.nextUrl
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next()
    }

    // redirect to login screen
    if (!token && pathname !== '/login') {
        return NextResponse.redirect('/login')
    }
}
