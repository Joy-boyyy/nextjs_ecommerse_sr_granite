import wishModel from "../../module/wishlistModule";
import dbConnect from "../../DbConnection/dbConnectRoute";
import { NextResponse } from "next/server";

// wishlist get request to get wishlist

export async function GET(req) {
  await dbConnect();
  const userId = req.headers.get("USER_ID");

  console.log("userId", userId);

  if (!userId) {
    console.log("User not authenticated ==>", userId);
    return NextResponse.json(
      { message: "Unauthorized access. Please log in.", success: false },
      { status: 401 }
    );
  }

  try {
    const selectedUserFoundOrNot = await wishModel.findOne({ refTo: userId });
    if (!selectedUserFoundOrNot) {
      return NextResponse.json(
        { message: "No wishlist added yet by user", wish: [] },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          wish: selectedUserFoundOrNot.wishData,
          message: "Wishlist fetched successfully",
        },
        { status: 200 }
      );
    }
  } catch (Error) {
    console.log(Error.message || Error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

// ------ wishlist post request to server
// export async function POST(req) {
//   await dbConnect();
//   const {
//     amount,
//     id,
//     title,
//     description,
//     category,
//     price,
//     discountPercentage,
//     rating,
//     warrantyInformation,
//     shippingInformation,
//     thumbnail,
//   } = await req.json();

//   const userId = req.headers.get("USER_ID");

//   if (!userId) {
//     console.log("User not authenticated ==>", userId);
//     return NextResponse.json(
//       { message: "Unauthorized access. Please log in.", success: false },
//       { status: 401 }
//     );
//   }

//   try {
//     const selectedUserFoundOrNot = await wishModel.findOne({ refTo: userId });

//     if (!selectedUserFoundOrNot) {
//       const newWishData = await wishModel.create({
//         wishData: [
//           {
//             amount,
//             id,
//             title,
//             description,
//             category,
//             price,
//             discountPercentage,
//             rating,
//             warrantyInformation,
//             shippingInformation,
//             thumbnail,
//           },
//         ],
//         refTo: userId,
//       });

//       if (newWishData) {
//         return NextResponse.json(
//           { message: "Wish Added to list", success: true },
//           { status: 200 }
//         );
//       } else {
//         return NextResponse.json(
//           { message: "Wish Not Added to list", success: false },
//           { status: 500 }
//         );
//       }
//     } else {
//       const gotCardWish = selectedUserFoundOrNot.wishData.findIndex(
//         (findingPreCard) => findingPreCard.id === id
//       );

//       if (gotCardWish === -1) {
//         selectedUserFoundOrNot.wishData.push({
//           amount,
//           id,
//           title,
//           description,
//           category,
//           price,
//           discountPercentage,
//           rating,
//           warrantyInformation,
//           shippingInformation,
//           thumbnail,
//         });
//         await selectedUserFoundOrNot.save();

//         return NextResponse.json(
//           { message: "Wish Added to List", success: true },
//           { status: 200 }
//         );
//       } else {
//         selectedUserFoundOrNot.wishData.splice(gotCardWish, 1);
//         await selectedUserFoundOrNot.save();
//         return NextResponse.json(
//           { message: "Wish removed from cart", success: true },
//           { status: 200 }
//         );
//       }
//     }
//   } catch (err) {
//     console.log(err.message || err);
//     return NextResponse.json(
//       { message: "Internal Server Error", success: false },
//       { status: 500 }
//     );
//   }
// }

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
    return NextResponse.json(
      { message: "Unauthorized access. Please log in.", success: false },
      { status: 401 }
    );
  }

  try {
    const wishlistUpdate = await wishModel.findOneAndUpdate(
      { refTo: userId },
      {
        $addToSet: {
          wishData: {
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
        },
      },
      { new: true, upsert: true } // `upsert` creates a new document if none exists
    );

    if (wishlistUpdate.wishData.some((item) => item.id === id)) {
      // If already added, remove it
      await wishModel.updateOne(
        { refTo: userId },
        { $pull: { wishData: { id } } }
      );

      return NextResponse.json(
        { message: "Wish removed from list", success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Wish added to list", success: true },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error("Error adding/removing wishlist item:", err);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
