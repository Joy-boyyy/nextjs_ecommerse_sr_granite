"use client";

import dynamic from "next/dynamic";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { addProductCloud } from "@/Redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { addWishFromCloud } from "@/Redux/slices/wishlistSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cookieGOt = Cookies.get("jwt");

  if (cookieGOt !== undefined) {
    return (
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="btn m-1">
          Profile
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] min-w-[1rem] p-2 shadow"
        >
          <li>
            <button
              type="button"
              onClick={() => {
                Cookies.remove("jwt");
                router.push("/user/login");
                dispatch(addProductCloud([]));
                dispatch(addWishFromCloud([]));
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-hover">
      <div tabIndex={0} role="button" className="btn m-1">
        Profile
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] min-w-[1rem] p-2 shadow"
      >
        <li>
          <button
            type="button"
            onClick={() => {
              router.push("/user/login");
            }}
          >
            Login
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              router.push("/user/register");
            }}
          >
            Register
          </button>
        </li>
      </ul>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
