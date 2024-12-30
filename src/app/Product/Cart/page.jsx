"use client";
import {
  deleteCartItem,
  decCartAmount,
  incCartAmount,
} from "@/Redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import axios from "axios";

const CartRoutePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cartData, totalPrice, totalQuantity } = useSelector(
    (state) => state.cartSliceVar
  );
  const [allCartData, setAllCartData] = useState([]);

  useEffect(() => {
    cartData.length > 0 ? setAllCartData(cartData) : setAllCartData([]);
  }, [cartData, totalPrice, totalQuantity]);

  const descCartBtn = async (mapProp) => {
    try {
      const descAxRes = await axios.put(
        `http://localhost:3000/api/product/amountDecBtn?id=${mapProp.id}`
      );

      console.log(descAxRes?.data?.message || descAxRes);

      dispatch(decCartAmount(mapProp));
    } catch (error) {
      console.log(error.response.data.message || error.message);
    }
  };

  const incCartBtn = async (mapProp) => {
    try {
      const incAxRes = await axios.put(
        `http://localhost:3000/api/product/amountIncBtn?id=${mapProp.id}`
      );

      console.log(incAxRes?.data?.message || incAxRes);

      dispatch(incCartAmount(mapProp));
    } catch (error) {
      console.log(error?.message || error?.response?.data?.message);
    }
  };

  const deleteCartFun = async (mapProp) => {
    try {
      const deleteAxRes = await axios.delete(
        `http://localhost:3000/api/product/cardDeleteBtn?id=${mapProp.id}`
      );
      console.log(deleteAxRes?.data?.message || deleteAxRes);

      dispatch(deleteCartItem(mapProp));
    } catch (error) {
      console.log(error.response.data.message || error.message);
    }
  };

  const cardCreation = () => {
    return (
      <div className="w-[100%] flex gap-5">
        <div className="basis-[80%]">
          {allCartData.map((mapProp) => (
            <div className="w-[100%] flex gap-5" key={mapProp.id}>
              <div className="flex gap-4 items-center  border-b mb-2">
                <div className="">
                  <Image
                    src={mapProp?.thumbnail}
                    alt={mapProp?.title}
                    width={200}
                    height={200}
                    loading="lazy"
                  />
                </div>

                {/* ----------- card details */}
                <div>
                  <h2 className="text-[1.5rem] font-bold mb-1">
                    {mapProp?.title}
                  </h2>
                  <p className="mb-1 text-[#b3b6b9] font-semibold text-[0.9rem]">
                    {mapProp?.description}
                  </p>
                  <p className="text-[#505153] font-semibold text-[0.7rem]">
                    {mapProp?.shippingInformation}
                  </p>
                  <p className="text-[#505153] font-semibold text-[0.7rem]">
                    {mapProp?.warrantyInformation}
                  </p>
                  <p className="text-[0.7rem] font-semibold">
                    Original Price: ${mapProp?.price}/~
                  </p>
                  <p className="text-[1.1rem] font-semibold">
                    Total Price: ${mapProp?.price * mapProp?.amount}/~
                  </p>
                </div>
                {/* total amount */}

                <div className="flex gap-2 items-center ">
                  <button
                    type="button"
                    className="bg-blue-500 px-2 text-white rounded-full"
                    onClick={() => {
                      descCartBtn(mapProp);
                    }}
                  >
                    -
                  </button>
                  {mapProp?.amount}
                  <button
                    type="button"
                    className="bg-blue-500 px-2 text-white rounded-full"
                    onClick={() => {
                      incCartBtn(mapProp);
                    }}
                  >
                    +
                  </button>
                </div>

                {/* delete button */}

                <div>
                  <button
                    type="button"
                    onClick={() => {
                      deleteCartFun(mapProp);
                    }}
                  >
                    <MdDelete size={30} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ----- buy section */}

        <div className="basis-[20%] ">
          <h2 className="uppercase text-[2rem] font-bold border-b">
            Price details
          </h2>
          <div className="flex gap-2 text-[#6c6e71]">
            <span className="text-[0.8rem] font-semibold">
              Product Quantity:
            </span>
            <span className="text-[0.8rem]">{totalQuantity}</span>
          </div>
          <p className="text-[0.8rem] text-[#6c6e71] font-semibold">
            Delivery Charges: Free
          </p>
          <p className="font-semibold">Total Amount : ${totalPrice}</p>

          {/* --- buy now Product */}
          <div className="w-[100%] pl-2">
            <button
              onClick={() => {
                router.push("/Product/Buy");
              }}
              type="button"
              className="bg-[#FB923C] text-white p-2 rounded-xl"
            >
              Pay Now !
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="width-[100%]">
      <div className="w-[100%]">
        {allCartData.length === 0 ? (
          <div className="text-center">
            <h1 className="text-[2rem] font-semibold">Cart is Empty</h1>{" "}
          </div>
        ) : (
          cardCreation()
        )}
      </div>
    </div>
  );
};
export default CartRoutePage;
