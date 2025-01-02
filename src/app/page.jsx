"use client";

import { useEffect } from "react";
import HomeComp from "../components/Home/home";
import { useDispatch } from "react-redux";
import { addProductCloud } from "@/Redux/slices/cartSlice";
import { addWishFromCloud } from "@/Redux/slices/wishlistSlice";
import axios from "axios";
import { setOrderDetailsData } from "@/Redux/slices/orderDetailsSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchingDataFromServer() {
      try {
        const cartFetching = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/product/cart`,
          {
            withCredentials: true,
          }
        );

        console.log("cartFetching", cartFetching);
        dispatch(addProductCloud(cartFetching?.data?.cart));

        //  ------------- wishlist data fetching
        const wishFetching = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/product/wishlist`,
          {
            withCredentials: true,
          }
        );

        console.log("wishFetching", wishFetching);
        dispatch(addWishFromCloud(wishFetching?.data?.wish));

        // ------------- order history fetching
        const orderHistory = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/userAllPastOrders`,
          { withCredentials: true }
        );
        console.log("fetched orderHistory===>", orderHistory);
        dispatch(
          setOrderDetailsData({
            pastOrder: orderHistory?.data?.pastOrder,
            userDetail: orderHistory?.data?.userDetail,
          })
        );
      } catch (error) {
        console.log(error?.response?.data?.message || error?.message);
      }
    }
    fetchingDataFromServer();
  }, []);

  return (
    <div>
      <HomeComp />
    </div>
  );
}
