import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Edge-compatible JWT library

export async function middleware(request) {
  console.log("middleware request==> ", request.nextUrl.pathname);

  try {
    // Restrict middleware to specific routes

    const restrictedRoutes = [
      "/api/product/wishlist",
      "/api/product/cart",
      "/api/product/amountDecBtn",
      "/api/product/amountIncBtn",
      "/api/product/cardDeleteBtn",
      "/api/product/wishlist",
      "/api/userAllPastOrders",
    ];

    if (restrictedRoutes.includes(request.nextUrl.pathname)) {
      const jwtVar = request.cookies.get("jwt")?.value; // Access the cookie value

      if (!jwtVar) {
        // If no JWT cookie, redirect to login
        console.log("JWT cookie not found ==>", jwtVar);
        return NextResponse.redirect(new URL("/user/login", request.url));
      }

      // Verify JWT using jose
      const secret = new TextEncoder().encode(process.env.jwtSecret); // Use TextEncoder for the secret
      const { payload } = await jwtVerify(jwtVar, secret); // Decode and verify the token

      if (!payload) {
        console.log("User not authenticated ==>", payload);
        return NextResponse.redirect(new URL("/user/login", request.url));
      }

      // Pass USER_ID via headers for downstream handlers
      const response = NextResponse.next();
      console.log("payload.userId", payload.userId);
      response.headers.set("USER_ID", payload.userId);
      return response;
    }

    // Allow other requests to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return NextResponse.redirect(new URL("/user/login", request.url));
  }
}

// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose"; // Edge-compatible JWT library

// export async function middleware(request) {
//   console.log("middleware", request.nextUrl.pathname);

//   try {
//     // Restrict middleware to specific routes
//     if (
//       request.nextUrl.pathname === "/Product/Cart" ||
//       request.nextUrl.pathname === "/Product/Wishlist"
//     ) {
//       const jwtVar = request.cookies.get("jwt")?.value; // Access the cookie value

//       if (!jwtVar) {
//         // If no JWT cookie, redirect to login
//         console.log("JWT cookie not found ==>", jwtVar);
//         return NextResponse.redirect(new URL("/user/login", request.url));
//       }

//       // Verify JWT using jose
//       const secret = new TextEncoder().encode(process.env.jwtSecret); // Use TextEncoder for the secret
//       const { payload } = await jwtVerify(jwtVar, secret); // Decode and verify the token

//       if (!payload) {
//         console.log("User not authenticated ==>", payload);
//         return NextResponse.redirect(new URL("/user/login", request.url));
//       }

//       // Pass USER_ID via headers for downstream handlers
//       const response = NextResponse.next();
//       console.log("payload.userId", payload.userId);
//       response.headers.set("USER_ID", payload.userId);
//       return response;
//     }

//     // Allow other requests to proceed
//     return NextResponse.next();
//   } catch (error) {
//     console.error("JWT Verification Error:", error.message);
//     return NextResponse.redirect(new URL("/user/login", request.url));
//   }
// }
