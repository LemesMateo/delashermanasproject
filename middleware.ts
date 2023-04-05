import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import * as jose from "jose";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

    
  if (req.nextUrl.pathname.startsWith('/checkout')) {

    
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    // console.log(session);
    if(!session) {
        const requestedPage = req.nextUrl.pathname;
        const url = req.nextUrl.clone();
        url.pathname = `/auth/login`;
        url.search = `p=${requestedPage}`
        return NextResponse.redirect(url);


        //codigo que no anduvo:
        // const {protocol, host, pathname} = request.nextUrl;
        // return NextResponse.redirect(`${protocol}//${host}/auth/login?p=${pathname}`);
        
    }
    return NextResponse.next();
    
    // Codigo viejo:
    /*     const token = request.cookies.get('token');
        
        try {
            await jose.jwtVerify(
                token || "",
                new TextEncoder().encode(process.env.JWT_SECRET_SEED || "")
            );
            //If no error is thrown, the JWT is valid, you can even the payload if necessary
            return NextResponse.next();
        } catch (error) {
            console.error(`JWT Invalid or not signed in`, {error})
            const {protocol, host, pathname} = request.nextUrl;
            return NextResponse.redirect(
                `${protocol}//${host}/auth/login?p=${pathname}`
            );   
        }     */
  }

}

export const config = {
    matcher: ['/checkout/:path*'],
};