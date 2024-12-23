"use client";

import React, { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const WishCart = () => {
  const { totalQuantity } = useSelector((state) => state.cartSliceVar);
  const [cartAMount, setCartAmount] = useState(0);

  useEffect(() => {
    setCartAmount(totalQuantity);
    console.log("totalQuantity", totalQuantity);
  }, [totalQuantity]);

  const Router = useRouter();
  return (
    <div className="flex gap-3">
      <span
        onClick={() => {
          Router.push(`/Product/Wishlist`);
        }}
        className="cursor-pointer w-[3rem] hover:bg-orange-400 hover:text-white hover:rounded-full flex justify-center items-center p-2"
      >
        <FaRegHeart size={30} />
      </span>

      <span
        onClick={() => {
          Router.push(`/Product/Cart`);
        }}
        className="cursor-pointer w-[3rem] hover:bg-orange-400 hover:text-white hover:rounded-full flex justify-center items-center p-2"
      >
        <MdOutlineShoppingCart size={40} />
        <sup className="text-[1rem]">{cartAMount}</sup>
      </span>
    </div>
  );
};

export default WishCart;
