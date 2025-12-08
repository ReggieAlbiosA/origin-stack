import { auth } from "@repo/auth/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: "/sign-in",
};

export default async function proxy(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // If user is authenticated, redirect to home
    if (session?.user) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow unauthenticated users to access sign-in page
    return NextResponse.next();
  } catch (error) {
    // On error, allow access to sign-in page
    return NextResponse.next();
  }
}
