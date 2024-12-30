import cartModel from "../../module/cartModel";
import dbConnect from "../../DbConnection/dbConnectRoute";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  await dbConnect();

  const id = req.nextUrl.searchParams.get("id");

  // const { id } = await req.json();

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
        selectedUserFoundOrNot.cartData.splice(gotCartCard, 1);

        await selectedUserFoundOrNot.save();

        return NextResponse.json(
          {
            message: "Product has been deleted successfully",
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
