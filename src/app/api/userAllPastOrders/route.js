import userOrderModel from "../module/userOrdersModel";
import dbConnect from "../DbConnection/dbConnectRoute";
import { NextResponse } from "next/server";

export async function GET(req) {
  const userId = req.headers.get("USER_ID");

  if (!userId) {
    console.log("User not authenticated ==>", userId);
    return NextResponse.json(
      { message: "Unauthorized access. Please log in.", success: false },
      { status: 401 }
    );
  }

  await dbConnect();

  try {
    const selectedUserFoundOrNot = await userOrderModel.findOne({
      refTo: userId,
    });

    if (!selectedUserFoundOrNot) {
      return NextResponse.json(
        {
          message: "Order history is empty",
          success: true,
          pastOrder: [],
          userDetail: {},
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          pastOrder: selectedUserFoundOrNot.allOrders,
          userDetail: selectedUserFoundOrNot.userDeliveryAddress,
          message: "Order history fetched successfully",
        },
        { status: 200 }
      );
    }
  } catch (Error) {
    console.log(Error.message || Error);
    return NextResponse.json(
      {
        message: "Internal Server Error while fetching Order history",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const userId = req.headers.get("USER_ID");

  if (!userId) {
    console.log("User not authenticated ==>", userId);
    return NextResponse.json(
      { message: "Unauthorized access. Please log in.", success: false },
      { status: 401 }
    );
  }

  await dbConnect();

  const { pastOrder, userDetail } = await req.json();

  try {
    const selectedUserFoundOrNot = await userOrderModel.findOne({
      refTo: userId,
    });

    if (!selectedUserFoundOrNot) {
      const newOrderData = await userOrderModel.create({
        allOrders: [...pastOrder],
        userDeliveryAddress: {
          fullname: userDetail.fullname,
          phoneNumber: userDetail.phoneNumber,
          email: userDetail.email,
          pinCode: userDetail.pinCode,
          city: userDetail.city,
          state: userDetail.state,
          landMark: userDetail.landMark,
          alternatePhoneNumber: userDetail.alternatePhoneNumber,
        },
        refTo: userId,
      });

      if (newOrderData) {
        return NextResponse.json(
          { message: "Product Added Order History", success: true },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Product Not Added to Order History", success: false },
          { status: 500 }
        );
      }
    } else {
      selectedUserFoundOrNot.allOrders.push(...pastOrder);
      selectedUserFoundOrNot.userDeliveryAddress.fullname = userDetail.fullname;
      selectedUserFoundOrNot.userDeliveryAddress.phoneNumber =
        userDetail.phoneNumber;
      selectedUserFoundOrNot.userDeliveryAddress.email = userDetail.email;
      selectedUserFoundOrNot.userDeliveryAddress.pinCode = userDetail.pinCode;
      selectedUserFoundOrNot.userDeliveryAddress.city = userDetail.city;
      selectedUserFoundOrNot.userDeliveryAddress.state = userDetail.state;
      selectedUserFoundOrNot.userDeliveryAddress.landMark = userDetail.landMark;
      selectedUserFoundOrNot.userDeliveryAddress.alternatePhoneNumber =
        userDetail.alternatePhoneNumber;

      const updatedOrderData = await selectedUserFoundOrNot.save();
      if (updatedOrderData) {
        return NextResponse.json(
          { message: "Product Added Order History", success: true },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Product Not Added to Order History", success: false },
          { status: 500 }
        );
      }
    }
  } catch (err) {
    console.log(err.message || err);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
