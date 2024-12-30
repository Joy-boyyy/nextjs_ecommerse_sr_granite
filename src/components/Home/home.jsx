"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";

const HomeComp = () => {
  const [fakeApiState, setFakeApiState] = useState([]);
  const [newfakeApiState, setNewFakeApiState] = useState([]);

  const [newWatchApi, setNewWatchApiState] = useState([]);

  const [glassApiState, setGlassApiState] = useState([]);

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

      // ------------ watch

      const newWatchData = await axios.get(
        "https://dummyjson.com/products/category/mens-watches"
      );
      newWatchData.data.products.length === 0
        ? setNewWatchApiState([])
        : setNewWatchApiState(newWatchData.data.products);

      // ---sun glassess

      const newGlassData = await axios.get(
        "https://dummyjson.com/products/category/sunglasses"
      );
      newGlassData.data.products.length === 0
        ? setGlassApiState([])
        : setGlassApiState(newGlassData.data.products);
    };

    // watch next api callin

    newApiFun();
  }, []);

  return (
    <div className="w-[100%]">
      <div className="h-[200px] w-[100%] overflow-hidden">
        <Carousel
          className="h-[200px] w-[100%]"
          showThumbs={false}
          autoPlay={true}
          infiniteLoop={true}
          stopOnHover={true}
        >
          <div>
            <Image
              src="/1.jpg"
              alt="image1"
              width={200}
              height={200}
              loading="lazy"
            />
          </div>
          <div>
            <Image
              src="/2.jpg"
              alt="image1"
              width={200}
              height={200}
              loading="lazy"
            />
          </div>
          <div>
            <Image
              src="/3.jpg"
              alt="image1"
              width={200}
              height={200}
              loading="lazy"
            />
          </div>
          <div>
            <Image
              src="/4.jpg"
              alt="image1"
              width={200}
              height={200}
              loading="lazy"
            />
          </div>
        </Carousel>
      </div>
      {/* -- best of electronics */}
      <div className="w-[100%] mt-4">
        {fakeApiState.length === 0 ? (
          ""
        ) : (
          <div className="pl-2">
            <h2 className="text-[2rem] font-semibold">Trending bags</h2>
            <DummyComponent dataGOt={fakeApiState} />
          </div>
        )}
      </div>

      {/* ---- trending dress */}

      <div className="w-[100%] mt-4">
        {newfakeApiState.length === 0 ? (
          ""
        ) : (
          <div className="pl-2">
            <h2 className="text-[2rem] font-semibold">Trending Clothes</h2>
            <DummyComponent dataGOt={newfakeApiState} />
          </div>
        )}
      </div>

      {/* fashion for men */}

      <h1 className="mt-2 text-[2rem] font-semibold">Men Fashion</h1>
      <div className="w-[100%] flex gap-4 border-2 px-7">
        <div className="basis-[50%] border-r">
          <div className="w-[100%] mt-4">
            {newWatchApi.length === 0 ? (
              ""
            ) : (
              <div className="pl-2">
                {/* <h2 className="text-[2rem] font-semibold">For Men</h2> */}
                <DummyComponent dataGOt={newWatchApi} />
              </div>
            )}
          </div>
        </div>
        <div className="basis-[50%]">
          <div className="w-[100%] mt-4">
            {glassApiState.length === 0 ? (
              ""
            ) : (
              <div className="pl-2">
                {/* <h2 className="text-[2rem] font-semibold">For Men</h2> */}
                <DummyComponent dataGOt={glassApiState} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(HomeComp), { ssr: false });

const DummyComponent = ({ dataGOt }) => {
  const router = useRouter();

  return (
    <div className="flex justify-between flex-wrap">
      {dataGOt.map((mapProp) => (
        <div
          key={mapProp.id}
          className="text-center cursor-pointer"
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
      ))}
    </div>
  );
};
