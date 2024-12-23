import SignUpModel from "../../module/signUpModel";
import { NextResponse } from "next/server";
import dbConnect from "../../DbConnection/dbConnectRoute";
import bcrypt from "bcrypt";

export async function POST(request) {
  await dbConnect();

  const { name, email, password, number } = await request.json();

  if (!name || !email || !password || !number) {
    return NextResponse.json(
      { message: "Please fill all the fields", success: false },
      { status: 400 }
    );
  }

  try {
    const existingUser = await SignUpModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use", success: false },
        { status: 400 }
      );
    }
    // bcrypt hashing
    const hashedData = await bcrypt.hash(password, 10);

    const signupVAr = await SignUpModel.create({
      name,
      email,
      password: hashedData,
      number,
    });

    if (signupVAr) {
      return NextResponse.json(
        { message: "User Registered Successfully", success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "User Registration Failed", success: false },
        { status: 500 }
      );
    }
  } catch (err) {
    console.log(err.message || err);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
