"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./home.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import Cookies from "js-cookie";
import { addWish } from "@/Redux/slices/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";

import dynamic from "next/dynamic";

const HomeComp = () => {
  const [fakeApiState, setFakeApiState] = useState([]);
  const [newfakeApiState, setNewFakeApiState] = useState([]);

  useEffect(() => {
    const newApiFun = async () => {
      const gotData = await axios.get(
        "https://dummyjson.com/products/category/womens-bags"
      );

      // console.log("gotData", gotData.data.products);
      gotData.data.products.length === 0
        ? setFakeApiState([])
        : setFakeApiState(gotData.data.products);

      // next api callig

      const newData = await axios.get(
        "https://dummyjson.com/products/category/womens-dresses"
      );
      newData.data.products.length === 0
        ? setNewFakeApiState([])
        : setNewFakeApiState(newData.data.products);
    };

    // watch next api callin

    newApiFun();
  }, []);

  return (
    <div className="w-[100%] bg-slate-800 text-white pb-4">
      <MakeDaySpecial />

      {/* image slide component */}
      <HomeImgSlide />

      {/* -----bg-white purpose */}

      {/* -- best of electronics */}
      <div className="w-[100%] mt-4 pb-5 ">
        {fakeApiState.length === 0 ? (
          ""
        ) : (
          <div className="px-2">
            <h2 className="text-[2rem] font-semibold font-serif mb-5">
              Trending bags
            </h2>
            <DummyComponent dataGOt={fakeApiState} />
          </div>
        )}
      </div>

      {/* ---- trending dress */}
      <div className="w-[100%] px-2">
        {newfakeApiState.length === 0 ? (
          ""
        ) : (
          <div className="pl-2">
            <h2 className="text-[2rem] font-semibold  font-serif mb-5">
              Trending Clothes
            </h2>
            <DummyComponent dataGOt={newfakeApiState} />
          </div>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(HomeComp), { ssr: false });

// Animation home div

const MakeDaySpecial = () => {
  const parentCOntainerRef = useRef(null);
  const { scrollYProgress: selectedDiv1 } = useScroll({
    target: parentCOntainerRef,
    offset: ["0 0.6", "1 0"],
  });

  const yAxies = useTransform(selectedDiv1, [0.5, 1], [0, 420]);
  const opacity = useTransform(selectedDiv1, [0.5, 1], [1, 0]);

  const giftTxt = "Make Someon's Day Special, with Your Gift !";

  const txtParentVarient = {
    start: {},
    end: {
      transition: {
        staggerChildren: 0.5, // Stagger effect with 0.5s delay between children
      },
    },
  };

  const txtVarient = {
    start: {
      y: 20, // Start position (move down by 20px)
      opacity: 0, // Start with opacity 0
    },
    end: {
      y: 0, // Final position
      opacity: 1, // Fully visible
      transition: {
        duration: 2, // Duration of animation for each word
      },
    },
  };

  return (
    <motion.div
      ref={parentCOntainerRef}
      className="w-[100%] h-screen homeBgImg flex flex-col justify-center"
    >
      <motion.div
        variants={txtParentVarient}
        initial="start"
        animate="end"
        style={{ y: yAxies, opacity }}
        className="flex gap-3 flex-wrap justify-center"
      >
        {giftTxt.split(" ").map((txtProp, ind) => (
          <motion.h1
            variants={txtVarient}
            key={ind}
            className="text-white text-[7rem] font-bold leading-[110px] text-center"
          >
            {txtProp}
          </motion.h1>
        ))}
      </motion.div>
    </motion.div>
  );
};

// ---image slide Component
const HomeImgSlide = () => {
  const imgArrayFromPublic = [
    {
      id: 1,
      title: "Image 1",
      img1: "/1.jpg",
    },
    {
      id: 2,
      title: "Image 2",
      img1: "/2.jpg",
    },
    {
      id: 3,
      title: "Image 3",
      img1: "/3.jpg",
    },
    {
      id: 4,
      title: "Image 4",
      img1: "/4.jpg",
    },
  ];

  return (
    <div className="h-[200px] w-[100%] overflow-hidden mt-7 px-2">
      <Carousel
        className="h-[200px] w-[100%]"
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        stopOnHover={true}
      >
        {imgArrayFromPublic.map((imgMapProp) => (
          <div key={imgMapProp.id}>
            <Image
              src={imgMapProp.img1}
              alt={imgMapProp.title}
              width={200}
              height={200}
              loading="lazy"
              unoptimized
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const DummyComponent = ({ dataGOt }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { wishlistIds } = useSelector((state) => state.wishlistSLice);

  const txtParentVarient = {
    start: {},
    end: {
      transition: {
        staggerChildren: 0.5, // Stagger effect with 0.5s delay between children
      },
    },
  };

  const txtVarient = {
    start: {
      y: 20, // Start position (move down by 20px)
      opacity: 0, // Start with opacity 0
    },
    end: {
      y: 0, // Final position
      opacity: 1, // Fully visible
      transition: {
        duration: 0.5, // Duration of animation for each word
      },
    },
  };

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
    <motion.div
      className="flex justify-between flex-wrap"
      variants={txtParentVarient}
      initial="start"
      whileInView="end"
      viewport={{ once: true, amount: 0.2 }}
    >
      {dataGOt.map((mapProp) => (
        <motion.div
          variants={txtVarient}
          key={mapProp.id}
          className="text-center cursor-pointer border-2 p-2 rounded-md"
        >
          <div
            onClick={() => {
              router.push(`/category/${mapProp.category}/${mapProp.id}`);
            }}
          >
            <Image
              src={mapProp.thumbnail}
              alt={mapProp.title || "no image"}
              width={200}
              height={200}
              loading="lazy"
            />
            <p>{mapProp.title}</p>
            <p>${mapProp.price}</p>
          </div>

          {/* ----wishlist  */}
          <div className="flex justify-center">
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
        </motion.div>
      ))}
    </motion.div>
  );
};
