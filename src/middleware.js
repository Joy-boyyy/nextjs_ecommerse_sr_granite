import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // Use ES module import

export function middleware(request) {
  console.log("middleware", request.nextUrl.pathname);

  try {
    // Restrict middleware to specific routes
    if (
      request.nextUrl.pathname === "/Product/Cart" ||
      request.nextUrl.pathname === "/Product/Wishlist"
    ) {
      const jwtVar = request.cookies.get("jwt")?.value; // Access the cookie value

      if (!jwtVar) {
        // If no JWT cookie, redirect to login
        return NextResponse.redirect(new URL("/user/login", request.url));
      }

      // Verify JWT
      const decoded = jwt.verify(jwtVar, process.env.jwtSecret);
      if (!decoded) {
        return NextResponse.redirect(new URL("/user/login", request.url));
      }

      // Pass USER_ID via headers for downstream handlers
      const response = NextResponse.next();
      response.headers.set("USER_ID", decoded.userId);
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
// const jwt = require("jsonwebtoken");

// export function middleware(request) {
//   console.log("middleware", request.nextUrl.pathname);
//   try {
//     if (
//       request.nextUrl.pathname === "/Product/Cart" ||
//       request.nextUrl.pathname === "/Product/Wishlist"
//     ) {
//       const jwtVAr = request.cookies.get("jwt"); // Access cookie server-side

//       if (jwtVAr === undefined) {
//         return NextResponse.redirect(new URL("/user/login", request.url));
//       } else {
//         const decoded = jwt.verify(jwtVAr, process.env.jwtSecret);

//         if (!decoded) {
//           return NextResponse.redirect(new URL("/user/login", request.url));
//         } else {
//           request.USER_ID = decoded.userId;
//           return NextResponse.next();
//         }
//       }
//     }

//     return NextResponse.next();
//   } catch (error) {
//     return NextResponse.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// }
