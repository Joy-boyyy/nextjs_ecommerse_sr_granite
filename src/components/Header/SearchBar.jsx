"use client";

import axios from "axios";
import { useEffect } from "react";
import { CiSearch } from "react-icons/ci";

import { searchFunSlice, searchStringSlice } from "@/Redux/slices/searchResult";
import { useDispatch, useSelector } from "react-redux";

const SearchBarComp = () => {
  const { searchString } = useSelector((state) => state.searchSliceVar);
  const dispatch = useDispatch();

  useEffect(() => {
    const apiCallingRelatedSearch = async () => {
      try {
        if (searchString.length === 0) {
          dispatch(searchStringSlice(""));
          dispatch(searchFunSlice([]));
        } else {
          const searchResult = await axios.get(
            `https://dummyjson.com/products/search?q=${searchString}`
          );
          console.log("searchResult", searchResult);
          dispatch(searchFunSlice(searchResult.data.products));
        }
      } catch (error) {
        console.log(error.message || error || "Error while fetching products");
      }
    };
    apiCallingRelatedSearch();
  }, [searchString]);

  return (
    <div className="w-[50%]  ">
      <div className="w-[100%] ">
        <label className="flex items-center border-2 border-black rounded-[20px] w-[100%] hover:border-orange-500">
          <input
            onChange={(e) => {
              dispatch(searchStringSlice(e.target.value));
            }}
            value={searchString}
            type="search"
            className="grow pl-3 border border-none outline-none rounded-[20px]"
            placeholder="Search"
          />
          <div className="bg-orange-400 p-1 text-white rounded-tr-2xl rounded-br-2xl cursor-pointer">
            <CiSearch size={30} />
          </div>
        </label>
      </div>
    </div>
  );
};

export default SearchBarComp;
