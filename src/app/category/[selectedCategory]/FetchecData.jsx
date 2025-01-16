"use client";

import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addWish } from "@/Redux/slices/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import axios from "axios";

const FetchecData = ({ catData, selectedCategory }) => {
  // const { allWish } = useSelector((state) => state.wishlistSLice);

  const dispatch = useDispatch();
  const { wishlistIds } = useSelector((state) => state.wishlistSLice);

  const router = useRouter();
  //  discount calulates

  function calculateDiscountedPrice(originalPrice, discountPercentage) {
    const discountAmount = (discountPercentage / 100) * originalPrice;
    const discountedPrice = originalPrice - discountAmount;
    return discountedPrice.toFixed(2);
  }

  const addWishFun = async (mapProp) => {
    console.log("selecterd wish== mapProp", mapProp);

    const gotCookie = Cookies.get("jwt");
    if (gotCookie === undefined) {
      return router.push("/user/login");
    }

    try {
      const wishAxiosRes = await axios.post("/api/product/wishlist", mapProp, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("wishAxiosResponse", wishAxiosRes);
      dispatch(addWish(mapProp));
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-[100%]">
      <div className="flex flex-wrap gap-3 justify-center">
        {catData.map((mapProp) => (
          <div
            key={mapProp.id}
            className="border rounded-md p-2 cursor-pointer"
          >
            {/* Having CLicked landing on card page */}
            <div
              onClick={() => {
                router.push(`/category/${selectedCategory}/${mapProp.id}`);
              }}
            >
              <div className="text-center">
                <Image
                  src={mapProp?.thumbnail}
                  alt={mapProp?.title}
                  width={200}
                  height={200}
                />
              </div>
              <div className="text-center">
                <p className="text-[1.3rem] font-bold">{mapProp.title}</p>
                <p className="flex gap-2 items-center justify-center">
                  <span className="text-green-400 line-through">
                    ${mapProp.price}
                  </span>
                  <span className="text-orange-900 text-[1.3rem] font-bold">
                    $
                    {calculateDiscountedPrice(
                      mapProp.price,
                      mapProp.discountPercentage
                    )}
                  </span>

                  <span className="text-red-500">
                    ({mapProp.discountPercentage}%Off)
                  </span>
                </p>
              </div>
              {/* -------- basic information */}
              <div>
                <p className="text-gray-400">{mapProp.warrantyInformation}</p>
                <p className="text-gray-400">{mapProp.shippingInformation}</p>
                <p className="text-gray-400">{mapProp.availabilityStatus}</p>
                <p className="flex gap-2 items-center">
                  <FaStar />
                  {mapProp.rating}
                </p>
              </div>
            </div>
            {/* ---------- button Cart */}
            <div>
              <button
                className=""
                type="button"
                onClick={() => {
                  // dispatch(addWish(mapProp));

                  addWishFun(mapProp);
                }}
              >
                {/* checkWish */}
                {wishlistIds.includes(mapProp.id) ? (
                  <FaHeart size={30} color="red" />
                ) : (
                  <CiHeart size={30} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(FetchecData), { ssr: false });
