"use client";

import CompanyLogo from "./CompanyLogo";
import SearchBarComp from "./SearchBar";
import WishCart from "./WishCart";
import Profile from "./Profile";
import Categories from "./Categories";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { searchStringSlice } from "@/Redux/slices/searchResult";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { searchString, searchResultArr } = useSelector(
    (state) => state.searchSliceVar
  );

  const searchResultFunction = () => {
    return (
      <div className="w-[100%]">
        {searchResultArr.map((searchProp) => (
          <div
            onClick={() => {
              router.push(`/category/${searchProp.category}/${searchProp.id}`);
              dispatch(searchStringSlice(""));
            }}
            key={searchProp.id}
            className="flex gap-3 items-center border-2 mb-2 cursor-pointer"
          >
            <div className="w-[100px] h-[100px]">
              <Image
                src={searchProp.thumbnail}
                alt={searchProp.title}
                width={100}
                height={100}
                loading="lazy"
                layout="responsive"
              />
            </div>

            <h2>{searchProp.title}</h2>
            <p>${searchProp.price}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <header className="w-[100%] border-b-2 pb-3">
      <nav className="flex gap-3 justify-center items-center">
        <CompanyLogo />
        <Categories />
        <SearchBarComp />
        <WishCart />
        <Profile />
      </nav>
      {/* ----------- search result */}

      {searchString.length === 0 ? (
        <></>
      ) : (
        <div className="w-[100%]">
          {searchResultArr.length === 0 ? (
            <div className="text-center">
              <h1 className="text-[2rem] font-bold">No Search Result !!!</h1>
            </div>
          ) : (
            searchResultFunction()
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
