import cartModel from "../../module/cartModel";
import dbConnect from "../../DbConnection/dbConnectRoute";
import { NextResponse } from "next/server";

export async function PUT(req) {
  await dbConnect();

  // const { id } = await req.json();
  const id = req.nextUrl.searchParams.get("id");

  const userId = req.headers.get("USER_ID");

  try {
    const selectedUserFoundOrNot = await cartModel.findOne({
      refTo: userId,
    });

    if (!selectedUserFoundOrNot) {
      return NextResponse.json(
        { message: "User Not found", success: false },
        { status: 500 }
      );
    } else {
      const gotCartCard = selectedUserFoundOrNot.cartData.findIndex(
        (findingPreCard) => findingPreCard.id === id
      );

      if (gotCartCard === -1) {
        return NextResponse.json(
          { message: "Product is not available in Cart", success: false },
          { status: 500 }
        );
      } else {
        if (selectedUserFoundOrNot.cartData[gotCartCard].amount > 1) {
          selectedUserFoundOrNot.cartData[gotCartCard].amount -= 1;
          await selectedUserFoundOrNot.save();
          return NextResponse.json(
            {
              message: "Amount of Product has been reduced in Cart",
              success: true,
            },
            { status: 200 }
          );
        }
        return NextResponse.json(
          {
            message: "Amount of Product can't go less than 1",
            success: true,
          },
          { status: 200 }
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
