"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

import { FaHeart } from "react-icons/fa";
import { addWish } from "@/Redux/slices/wishlistSlice";

const WishListRouteFun = () => {
  const dispatch = useDispatch();
  const { allWish } = useSelector((state) => state.wishlistSLice);

  const [wishArr, setWishArr] = useState([]);

  useEffect(() => {
    setWishArr(allWish);
  }, [allWish]);

  return (
    <div className="w-[100%]">
      {wishArr.length === 0 ? (
        <div className="mt-5 text-center text-[2rem] font-bold">
          <h1>No Wish list Available</h1>
        </div>
      ) : (
        <div className="w-[100%]">
          {wishArr.map((wishMap) => (
            <div key={wishMap.id} className="flex gap-3 mb-3">
              <div className="basis-[30%]">
                <Image
                  src={wishMap.thumbnail}
                  alt={wishMap.title}
                  width={200}
                  height={200}
                  loading="lazy"
                />
              </div>
              <div className="basis-[60%]">
                <p className="text-[2rem]">{wishMap.title}</p>
                <p>{wishMap.description}</p>
                <div className="flex gap-3">
                  <p className="text-[1.3rem] font-bold">${wishMap.price}</p>
                  <p className=" text-red-600">
                    {wishMap.discountPercentage} %Off
                  </p>
                </div>
                <p>{wishMap.shippingInformation}</p>
              </div>
              {/* ---------- wish button */}
              <div className="basis-[10%]  flex justify-center items-center">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(addWish(wishMap));
                  }}
                >
                  <FaHeart size={40} color="red" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishListRouteFun;
