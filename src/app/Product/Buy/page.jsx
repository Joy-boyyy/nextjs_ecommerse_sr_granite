"use client";

import axios from "axios";
import Script from "next/script";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOrderDetailsData } from "@/Redux/slices/orderDetailsSlice";

const BuyComponent = () => {
  const dispatch = useDispatch();

  const { totalPrice, totalQuantity, cartData } = useSelector(
    (state) => state.cartSliceVar
  );

  const [fullnameState, setFullnameState] = useState("");
  const [phoneNumberState, setPhoneNumberState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [pinState, setPinState] = useState("");
  const [cityState, setCityState] = useState("");
  const [stateState, setStateState] = useState("");
  const [landMarkState, setLandMarkState] = useState("");
  const [alterPhoneState, setAlterPhoneState] = useState("");

  const [fullAddressState, setFullAddressState] = useState("");

  const formSubmitFun = async (e) => {
    e.preventDefault();

    console.log(
      fullnameState,
      phoneNumberState,
      emailState,
      pinState,
      cityState,
      stateState,
      landMarkState,
      alterPhoneState
    );

    try {
      const axiosResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/productBuy`,
        {
          totalPrice,
        }
      );

      console.log("axiosResponse: ==>", axiosResponse);

      const paymentData = {
        key: process.env.RAZORPAY_KEY_SECRET,
        order_id: axiosResponse.data.order.id,
        handler: async function (response) {
          // verify payment
          try {
            const data = await axios.post("/api/verifyOrder", {
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            console.log(data);
            if (data.data.isOk) {
              alert("Payment successful");

              const userDetail = {
                fullname: fullnameState,
                phoneNumber: phoneNumberState,
                email: emailState,
                pinCode: pinState,
                city: cityState,
                state: stateState,
                landMark: landMarkState,
                alternatePhoneNumber: alterPhoneState,
              };

              try {
                const formDataSentVar = await axios.post(
                  `${process.env.NEXT_PUBLIC_API_URL}/api/userAllPastOrders`,
                  {
                    pastOrder: cartData,
                    userDetail,
                  },
                  {
                    withCredentials: true,
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                console.log("form Data Sent successfully==>", formDataSentVar);

                dispatch(
                  setOrderDetailsData({
                    pastOrder: cartData,
                    userDetail,
                  })
                );
              } catch (error) {
                console.log(
                  error?.response?.data?.message || error?.message || error
                );
              }
            } else {
              alert("Payment failed");
            }
          } catch (err) {
            console.log(
              err.message || "error occured in frontend while verifying"
            );
          }
        },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load.");
        return;
      }

      const payment = new window.Razorpay(paymentData);
      payment.open();
    } catch (err) {
      console.log(err.message || err || "Something went wrong");
    }
  };

  return (
    <div className="w-[100%]">
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="w-[100%] flex ">
        {/* ---------  form */}

        <form onSubmit={formSubmitFun} className="px-8 py-5 basis-[50%]  ">
          <h1 className="text-[2rem] font-semibold">Your Delivery Address</h1>
          {/* -------- first name and phone number */}
          <div className="flex gap-2 mb-2 ">
            {/* -----------------------first name */}
            <div>
              <label>
                <input
                  onChange={(e) => {
                    setFullnameState(e.target.value);
                  }}
                  placeholder="Full Name:"
                  type="text"
                  value={fullnameState}
                  className="border-2 rounded-md outline-none pl-2"
                  name="fullName"
                />
              </label>
            </div>
            {/* -----------------------Phone Number */}

            <div>
              <label>
                <input
                  onChange={(e) => {
                    setPhoneNumberState(e.target.value);
                  }}
                  value={phoneNumberState}
                  placeholder="Phone Number:"
                  type="number"
                  className="border-2 rounded-md outline-none pl-2"
                  name="phoneNumber"
                />
              </label>
            </div>
          </div>

          {/* ---------- email  and address pin code */}

          <div className="flex gap-2 mb-2">
            {/* -------------- email address */}
            <div>
              <label>
                <input
                  onChange={(e) => {
                    setEmailState(e.target.value);
                  }}
                  value={emailState}
                  placeholder="youremail@email.com"
                  type="email"
                  className="border-2 rounded-md outline-none pl-2"
                  name="emailId"
                />
              </label>
            </div>
            {/* -------------- address pin code */}

            <div>
              <label>
                <input
                  onChange={(e) => {
                    setPinState(e.target.value);
                  }}
                  value={pinState}
                  placeholder="Pin Code"
                  type="number"
                  className="border-2 rounded-md outline-none pl-2"
                  name="pinCode"
                />
              </label>
            </div>
          </div>

          {/* ---- city/ District/town and state */}

          <div className="flex gap-2 mb-2">
            {/* city/ District/town */}
            <div>
              <label>
                <input
                  onChange={(e) => {
                    setCityState(e.target.value);
                  }}
                  value={cityState}
                  placeholder="City/District/Town:"
                  type="text"
                  className="border-2 rounded-md outline-none pl-2"
                  name="cityName"
                />
              </label>
            </div>

            {/* ------state */}

            <div>
              <label>
                <input
                  onChange={(e) => {
                    setStateState(e.target.value);
                  }}
                  value={stateState}
                  placeholder="State"
                  type="text"
                  className="border-2 rounded-md outline-none pl-2"
                  name="stateNAme"
                />
              </label>
            </div>
          </div>

          {/* -------------landmark and Alternate phone Number */}

          <div className="flex gap-2 mb-2">
            {/* landmark */}
            <div>
              <label>
                <input
                  onChange={(e) => {
                    setLandMarkState(e.target.value);
                  }}
                  value={landMarkState}
                  placeholder="Landmark:"
                  type="text"
                  className="border-2 rounded-md outline-none pl-2"
                  name="landmarkname"
                />
              </label>
            </div>

            {/* ------Alternate phone Number */}

            <div>
              <label>
                <input
                  onChange={(e) => {
                    setAlterPhoneState(e.target.value);
                  }}
                  value={alterPhoneState}
                  placeholder="Alternate phone Number:"
                  type="number"
                  className="border-2 rounded-md outline-none pl-2"
                  name="alternatephonenumber"
                />
              </label>
            </div>
          </div>

          {/* ----------- address area and street */}

          <div className="mb-2">
            <textarea
              onChange={(e) => {
                setFullAddressState(e.target.value);
              }}
              value={fullAddressState}
              placeholder="Address area and street"
              className="textarea textarea-bordered textarea-lg w-full max-w-xs"
              name="Fulladdress"
            ></textarea>
          </div>

          {/* save and deliver here button*/}
          <div>
            <button
              type="submit"
              className="uppercase bg-orange-400 hover:bg-orange-500 text-white p-3 rounded-md font-bold "
            >
              save and deliver here
            </button>
          </div>
        </form>

        <div className="basis-[50%] px-8 py-5 flex flex-col items-end ">
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
        </div>
      </div>
    </div>
  );
};

export default BuyComponent;
