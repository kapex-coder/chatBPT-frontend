import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // You can perform additional checks here if needed
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login", // Redirect to login if not authenticated
    },
  }
);

// Protect these routes:
export const config = {
  matcher: ["/chat/:path*"], // Protect dashboard and its subroutes
};
