import { createSlice } from "@reduxjs/toolkit";

const userOrder = {
  allOrders: [],
  userDeliveryAddress: {
    fullname: "",
    phoneNumber: "",
    email: "",
    pinCode: "",
    city: "",
    state: "",
    landMark: "",
    alternatePhoneNumber: "",
  },
};

const orderDetailsContainerSlice = createSlice({
  name: "orderDetailsContainer",
  initialState: userOrder,
  reducers: {
    setOrderDetailsData(state, action) {
      const { pastOrder, userDetail } = action.payload;
      console.log("userDetail", userDetail);
      console.log("pastOrder", pastOrder);

      if (state.allOrders.length === 0) {
        state.allOrders = pastOrder;
        state.userDeliveryAddress.fullname = userDetail.fullname;
        state.userDeliveryAddress.phoneNumber = userDetail.phoneNumber;
        state.userDeliveryAddress.email = userDetail.email;
        state.userDeliveryAddress.pinCode = userDetail.pinCode;
        state.userDeliveryAddress.city = userDetail.city;
        state.userDeliveryAddress.state = userDetail.state;
        state.userDeliveryAddress.landMark = userDetail.landMark;
        state.userDeliveryAddress.alternatePhoneNumber =
          userDetail.alternatePhoneNumber;

        console.log("", state.allOrders);
        console.log(state.userDeliveryAddress);
      } else {
        state.userDeliveryAddress.fullname = userDetail.fullname;
        state.userDeliveryAddress.phoneNumber = userDetail.phoneNumber;
        state.userDeliveryAddress.email = userDetail.email;
        state.userDeliveryAddress.pinCode = userDetail.pinCode;
        state.userDeliveryAddress.city = userDetail.city;
        state.userDeliveryAddress.state = userDetail.state;
        state.userDeliveryAddress.landMark = userDetail.landMark;
        state.userDeliveryAddress.alternatePhoneNumber =
          userDetail.alternatePhoneNumber;

        state.allOrders.push(...pastOrder);
        console.log(state.allOrders);
        console.log(state.userDeliveryAddress);
      }
    },
  },
});

export const { setOrderDetailsData } = orderDetailsContainerSlice.actions;
export default orderDetailsContainerSlice.reducer;
