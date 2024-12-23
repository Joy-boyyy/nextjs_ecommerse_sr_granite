import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function GET(req) {
  return NextResponse.json(
    { success: true, message: "GET method is working!" },
    { status: 200 }
  );
}

export async function POST(req) {
  try {
    const { totalPrice } = await req.json();

    if (!totalPrice || totalPrice <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid total price" },
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount: totalPrice * 100, // Convert to paise
      currency: "INR",
    });

    return NextResponse.json(
      { success: true, message: "Order created successfully", order },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating Razorpay order:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// // Initialize Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export async function GET(req) {
//   return NextResponse.json(
//     { success: true, message: "GET method is working!" },
//     { status: 200 }
//   );
// }

// export async function POST(req) {
//   try {
//     const { totalPrice } = await req.json();

//     if (!totalPrice || totalPrice <= 0) {
//       return NextResponse.json(
//         { success: false, message: "Invalid total price" },
//         { status: 400 }
//       );
//     }

//     const options = {
//       amount: totalPrice * 100, // Convert to paise
//       currency: "INR",
//     };

//     razorpay.orders.create(options, (err, order) => {
//       if (err) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: "somethig went wrong while order creating",
//             order,
//           },
//           { status: 500 }
//         );
//       } else {
//         return NextResponse.json(
//           {
//             success: success,
//             message: "Order created Successfully",
//             order,
//           },
//           { status: 200 }
//         );
//       }
//     });
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to create order",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }
