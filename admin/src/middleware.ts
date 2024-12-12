import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyToken } from "./services/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const loginUrl = new URL("/auth/login", req.url);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }
  try {
    const valid = await verifyToken(token);
    if (!valid) {
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};
