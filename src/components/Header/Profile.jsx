"use client";

import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
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
        <button
          type="button"
          onClick={() => {
            router.push("/user/register");
          }}
        >
          <a>Register</a>
        </button>
      </ul>
    </div>
  );
};

export default Profile;
