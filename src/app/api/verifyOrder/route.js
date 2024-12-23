import { NextResponse } from "next/server";
import crypto from "crypto";

const generatedSignature = (razorpayOrderId, razorpayPaymentId) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  const sign = razorpayOrderId + "|" + razorpayPaymentId;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(sign.toString())
    .digest("hex");
  return sig;
};

export async function POST(request) {
  const { orderId, razorpayPaymentId, razorpaySignature } =
    await request.json();
  const signature = generatedSignature(orderId, razorpayPaymentId);

  if (signature !== razorpaySignature) {
    return NextResponse.json(
      { message: "payment verification failed", isOk: false },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "payment Verification successful", isOk: true },
    { status: 200 }
  );
}
