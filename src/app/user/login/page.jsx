"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Cookies from "js-cookie";

const LoginAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();

  const doLoginFun = async (loginProp) => {
    const loginVar = {
      email: loginProp.usernameInput,
      password: loginProp.userPasswordInput,
    };

    try {
      const loginAxiosRes = await axios.post(
        "http://localhost:3000/api/user/signin",
        loginVar
      );

      if (loginAxiosRes.status === 200) {
        console.log(loginAxiosRes.data.message);
        console.log(loginAxiosRes.data);

        Cookies.set("jwt", loginAxiosRes.data.jwtVar, { expires: 1 });

        router.push("/");
      } else {
        console.log("Error in axios");
      }
    } catch (err) {
      console.log(err.message || err);
    }
  };

  return (
    <div className="flex justify-center items-center w-full  min-h-screen bg-white px-5 py-5">
      <div className="xl:max-w-7xl bg-white drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
        <div className="sm:w-[60%] lg:w-[50%] bg-cover bg-center items-center justify-center hidden md:flex ">
          <img
            src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7892.jpg?t=st=1734438640~exp=1734442240~hmac=e34ebfb2dcef8a18861c6946d569f5c3a6163b3b984cd4875342e3c3b8082565&w=740"
            alt="login"
            className="h-[500px]"
          />
        </div>
        <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0 flex flex-col justify-center">
          <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#4A07DA]">
            Login Account
          </h1>
          <div className="w-full mt-5 sm:mt-8">
            <form onSubmit={handleSubmit(doLoginFun)}>
              <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                <input
                  {...register("usernameInput", {
                    required: true,
                    minLength: {
                      value: 3,
                      message: "Name of Minimum length must be 3",
                    },
                  })}
                  type="text"
                  placeholder="Enter Your Email"
                  className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                />
                {errors.usernameInput && <p> {errors.usernameInput.message}</p>}

                <input
                  {...register("userPasswordInput", {
                    required: true,
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character.",
                    },
                  })}
                  type="Password"
                  placeholder="Enter Your Password"
                  className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                />
                {errors.userPasswordInput && (
                  <p> {errors.userPasswordInput.message}</p>
                )}

                <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                  <button
                    className="btn btn-active btn-primary btn-block max-w-[200px]"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Sign In
                  </button>
                </div>
                <div className="text-center">
                  <p>
                    New user? :{" "}
                    <span
                      className="cursor-pointer text-red-600"
                      onClick={() => {
                        router.push("/user/register");
                      }}
                    >
                      Register
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(LoginAccount), { ssr: false });
