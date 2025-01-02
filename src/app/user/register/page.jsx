"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();
  const [registerErrorState, setRegisterErr] = useState("");
  const [userCreatedSuccess, setUserCreated] = useState("");

  const onSubmitFun = async (formData) => {
    console.log("formData", formData);
    const structuredObj = {
      name: formData.username + formData.usersecondName,
      email: formData.userEmail,
      number: formData.userNumber,
      password: formData.userPassword,
    };
    try {
      const axiosRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/signup`,
        structuredObj
      );

      console.log(axiosRes?.data?.message);
      setUserCreated(axiosRes?.data?.message);
      router.push("/user/login");
    } catch (err) {
      console.log(err.message || err);
      setRegisterErr(err?.response?.data?.message || err.message || err);
    }
  };

  return (
    <div className="flex justify-center items-center w-full  min-h-screen bg-white px-5 py-5">
      <div className="xl:max-w-7xl bg-white drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
        <div className="sm:w-[60%] lg:w-[50%] bg-cover bg-center items-center justify-center hidden md:flex ">
          <img
            src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-29057.jpg?t=st=1734437777~exp=1734441377~hmac=cacc76e0b88d0d587df33ac1957c5088b26f6611d2a878b7eebcd29b414689cf&w=740"
            alt="login"
            className="h-[500px]"
          />
        </div>
        <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
          <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#4A07DA]">
            Create Account
          </h1>
          <div className="w-full mt-5 sm:mt-8">
            <form onSubmit={handleSubmit(onSubmitFun)}>
              <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    {...register("username", {
                      required: true,
                      minLength: {
                        value: 3,
                        message: "Name of Minimum length must be 3",
                      },
                    })}
                    type="text"
                    placeholder="Enter Your First Name"
                    className="input input-bordered input-primary w-full max-w-xs text-black placeholder:text-black/70"
                  />

                  <input
                    {...register("usersecondName", {
                      required: true,
                      minLength: {
                        value: 3,
                        message: "Second Name of Minimum length must be 3",
                      },
                    })}
                    type="text"
                    placeholder="Enter Your Last Name"
                    className="input input-bordered input-primary w-full max-w-xs text-black placeholder:text-black/70"
                  />
                </div>
                {errors.username && <p> {errors.username.message}</p>}
                {errors.usersecondName && (
                  <p> {errors.usersecondName.message}</p>
                )}

                <input
                  {...register("userEmail", {
                    required: true,
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: "Please enter a valid email",
                    },
                  })}
                  type="text"
                  placeholder="Enter Your Email"
                  className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                />

                {errors.userEmail && <p> {errors.userEmail.message}</p>}

                <input
                  {...register("userNumber", {
                    required: true,
                    maxLength: {
                      value: 10,
                      message: "Minimum length must be 10",
                    },
                    minLength: {
                      value: 10,
                      message: "Minimum length must be 10",
                    },
                  })}
                  type="number"
                  placeholder="Enter Your Phone No"
                  className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                />
                {errors.userNumber && <p> {errors.userNumber.message}</p>}

                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                  {...register("userPassword", {
                    required: true,
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character.",
                    },
                  })}
                />
                {errors.userPassword && <p> {errors.userPassword.message}</p>}

                {/* ------------ form error message */}
                <div className="text-red-600 text-center">
                  <p>{registerErrorState}</p>
                </div>

                {/* form success  */}
                <div className="text-green-600 text-center">
                  <p>{userCreatedSuccess}</p>
                </div>

                {/* term and condition */}
                <div className="flex items-center gap-1.5  justify-start pl-2">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <input
                        type="checkbox"
                        className="checkbox-xs checkbox-primary"
                        required
                      />
                    </label>
                  </div>
                  <h3 className="flex items-center whitespace-nowrap text-xs text-black">
                    I agree to the
                    <span className="text-[#4A07DA]">&nbsp;Terms</span>
                    &nbsp;and
                    <span className="text-[#4A07DA]">&nbsp;Privacy Policy</span>
                    .
                  </h3>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                  <button
                    disabled={isSubmitting}
                    className="btn btn-active btn-primary btn-block max-w-[200px]"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="text-center">
                  <p>
                    Already a user? :{" "}
                    <span
                      className="cursor-pointer text-red-600"
                      onClick={() => {
                        router.push("/user/login");
                      }}
                    >
                      Login
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

export default dynamic(() => Promise.resolve(CreateAccount), { ssr: false });
