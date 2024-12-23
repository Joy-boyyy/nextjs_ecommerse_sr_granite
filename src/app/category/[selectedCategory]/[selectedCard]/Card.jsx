"use client";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { addWish } from "@/Redux/slices/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addProductToCart } from "@/Redux/slices/cartSlice";
import dynamic from "next/dynamic";

const Card = ({ cardDataDetails }) => {
  const dispatch = useDispatch();
  const { allWish } = useSelector((state) => state.wishlistSLice);

  const [checkWish, setWishFUn] = useState(false);

  useEffect(() => {
    // Check if the item exists in the wishlist
    const checkAndFOundINdex = allWish.findIndex(
      (findingIndex) => findingIndex.id === cardDataDetails.id
    );

    setWishFUn(checkAndFOundINdex > -1);
  }, [allWish, cardDataDetails]);

  function calculateDiscountedPrice(originalPrice, discountPercentage) {
    const discountAmount = (discountPercentage / 100) * originalPrice;
    const discountedPrice = originalPrice - discountAmount;
    return discountedPrice.toFixed(2);
  }

  const mapProp = cardDataDetails;

  const putWishFun = (oldMapProp) => {
    setWishFUn((oldDa) => !oldDa);
    dispatch(addWish(oldMapProp));
  };

  return (
    <div className="w-[100%]">
      {
        <div key={mapProp.id} className="flex">
          <div className="basis-[40%]">
            <Carousel
              showThumbs={false}
              infiniteLoop={true}
              //   className="w-[40vw] h-[500px]"
            >
              {mapProp?.images?.length > 0 &&
                mapProp?.images?.map((imgMap, ind) => (
                  <Image
                    key={ind}
                    src={imgMap}
                    className="rounded-box"
                    width={300}
                    height={200}
                    alt={mapProp.title}
                    loading="lazy"
                    unoptimized
                  />
                ))}
            </Carousel>
          </div>

          <div className="basis-[60%] px-2">
            <div className="border-b">
              <p className="text-[2rem] font-bold text-orange-600">
                {mapProp.title}
              </p>
              <p className="text-[#8F8F8F]">{mapProp.description}</p>
              <p className="text-[2rem] font-bold text-orange-600 uppercase">
                {mapProp.category}
              </p>
            </div>
            {/* -------- basic information */}
            <div className="border-b py-1">
              <p className="text-gray-400">{mapProp.warrantyInformation}</p>
              <p className="text-gray-400">{mapProp.shippingInformation}</p>
              <p className="text-gray-400">{mapProp.availabilityStatus}</p>
              <p className="text-gray-400">{mapProp.returnPolicy}</p>
              <p className="flex gap-2 items-center">
                <FaStar />
                {mapProp.rating}
              </p>
            </div>

            {/* price setails */}
            <div className="py-2">
              <p className="flex gap-2 items-center ">
                <sub className="text-green-400 line-through text-[1rem]">
                  M.R.P ${mapProp.price}
                </sub>
                <span className="text-orange-900 text-[2rem] font-bold">
                  $
                  {calculateDiscountedPrice(
                    mapProp.price,
                    mapProp.discountPercentage
                  )}
                </span>

                <sup className="text-red-500 text-[1.4em]">
                  ({mapProp.discountPercentage}%Off)
                </sup>
              </p>
            </div>

            {/* ----button to buy */}
            <div className="w-[100%] flex gap-4">
              <button
                onClick={() => {
                  putWishFun(mapProp);
                }}
                type="button"
                className="border rounded-xl px-2 flex gap-2 items-center hover:border-blue-500"
              >
                {checkWish ? (
                  <FaHeart size={40} color="red" />
                ) : (
                  <CiHeart size={40} />
                )}
                Add to Wishlist
              </button>

              <button
                onClick={() => {
                  dispatch(addProductToCart(mapProp));
                }}
                className="hover:bg-blue-600 bg-blue-500 flex gap-2 items-center px-3 text-white rounded-lg"
              >
                <MdOutlineAddShoppingCart size={30} color="white" />
                Add to Cart
              </button>
            </div>

            {/* ----review section */}
            <div className="w-[100%] mt-4 border-t-2">
              <h2 className="text-[2rem] font-bold  mb-3 text-orange-800">
                Top reviews
              </h2>
              {mapProp.reviews.map((reviewMap, reviewId) => (
                <div key={reviewId} className="mb-6">
                  <div className="flex gap-2 items-center border-b py-1">
                    <div className="">
                      <div className=" rounded-full border-2 border-orange-700 w-[2rem] text-center h-[2rem]">
                        <span>{reviewMap?.reviewerName?.slice(0, 1)}</span>
                      </div>
                    </div>
                    <span className="font-bold">{reviewMap?.reviewerName}</span>
                  </div>

                  {/* -------rating section */}
                  <div className="flex gap-2">
                    <p className="flex items-center">
                      <FaStar /> {reviewMap.rating}
                    </p>
                    <p className="font-bold">{mapProp.title}</p>
                  </div>
                  {/* date of review */}
                  <div>
                    <p className="text-[#9CA3AF]">
                      {reviewMap.date
                        ? new Date(reviewMap.date).toLocaleTimeString()
                        : "Invalid date"}
                    </p>
                  </div>
                  {/* ---comment */}
                  <p className="text-[#9CA3AF] font-bold">
                    {reviewMap.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default dynamic(() => Promise.resolve(Card), { ssr: false });
