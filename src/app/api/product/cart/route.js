import cartModel from "../../module/cartModel";
import dbConnect from "../../DbConnection/dbConnectRoute";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  const userId = req.headers.get("USER_ID");

  if (!userId) {
    console.log("User not authenticated ==>", userId);
    return NextResponse.json(
      { message: "Unauthorized access. Please log in.", success: false },
      { status: 401 }
    );
  }

  try {
    const selectedUserFoundOrNot = await cartModel.findOne({ refTo: userId });

    if (!selectedUserFoundOrNot) {
      return NextResponse.json(
        { message: "Cart is empty", success: true, cart: [] },
        { status: 200 }
      );

      //   const newCartData = await cartModel.create({
      //     cartData: [],
      //     refTo: userId,
      //   });

      //   if (newCartData) {
      //     return NextResponse.json(
      //       { message: "Product Cart IS Empty", success: true },
      //       { status: 200 }
      //     );
      //   } else {
      //     return NextResponse.json(
      //       { message: "EMpty Cart did not created", success: false },
      //       { status: 500 }
      //     );
      //   }
    } else {
      return NextResponse.json(
        {
          cart: selectedUserFoundOrNot.cartData,
          message: "Cart fetched successfully",
        },
        { status: 200 }
      );
    }
  } catch (Error) {
    console.log(Error.message || Error);
    return NextResponse.json(
      {
        message: "Internal Server Error while fetching wishlist",
        success: false,
      },
      { status: 500 }
    );
  }
}

// post cart data

export async function POST(req) {
  await dbConnect();

  const {
    amount,
    id,
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    warrantyInformation,
    shippingInformation,
    thumbnail,
  } = await req.json();

  const userId = req.headers.get("USER_ID");

  if (!userId) {
    console.log("User not authenticated ==>", userId);
    return NextResponse.json(
      { message: "Unauthorized access. Please log in.", success: false },
      { status: 401 }
    );
  }

  try {
    const selectedUserFoundOrNot = await cartModel.findOne({ refTo: userId });

    if (!selectedUserFoundOrNot) {
      const newCartData = await cartModel.create({
        cartData: [
          {
            amount,
            id,
            title,
            description,
            category,
            price,
            discountPercentage,
            rating,
            warrantyInformation,
            shippingInformation,
            thumbnail,
          },
        ],
        refTo: userId,
      });

      if (newCartData) {
        return NextResponse.json(
          { message: "Product Added to Cart", success: true },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Product Not Added to Cart", success: false },
          { status: 500 }
        );
      }
    } else {
      const gotCartCard = selectedUserFoundOrNot.cartData.findIndex(
        (findingPreCard) => findingPreCard.id === id
      );

      if (gotCartCard === -1) {
        selectedUserFoundOrNot.cartData.push({
          amount,
          id,
          title,
          description,
          category,
          price,
          discountPercentage,
          rating,
          warrantyInformation,
          shippingInformation,
          thumbnail,
        });
        await selectedUserFoundOrNot.save();

        return NextResponse.json(
          { message: "Product Added to Cart", success: true },
          { status: 200 }
        );
      } else {
        selectedUserFoundOrNot.cartData[gotCartCard].amount += 1;
        await selectedUserFoundOrNot.save();
        return NextResponse.json(
          { message: "Added more amount of Product in Cart", success: true },
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
