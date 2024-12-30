import SignUpModel from "../../module/signUpModel";
var jwt = require("jsonwebtoken");
import dbConnect from "../../DbConnection/dbConnectRoute";

import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Please fill all the fields", success: false },
      { status: 400 }
    );
  }

  try {
    const findindExistingUserVar = await SignUpModel.findOne({ email });

    if (!findindExistingUserVar) {
      return NextResponse.json(
        { message: "User did not find", success: false },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(
      password,
      findindExistingUserVar.password
    );

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Password did not match", success: false },
        { status: 400 }
      );
    } else {
      const jwtVar = jwt.sign(
        {
          userId: findindExistingUserVar._id,
        },
        process.env.jwtSecret,
        { expiresIn: "1d" }
      );

      return NextResponse.json(
        { message: "User Logged in Successfully", success: true, jwtVar },
        { status: 200 }
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
