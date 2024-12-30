import mongoose from "mongoose";

const orderVar = new mongoose.Schema(
  {
    allOrders: [],
    userDeliveryAddress: {
      fullname: { type: String },
      phoneNumber: { type: String },
      email: { type: String },
      pinCode: { type: String },
      city: { type: String },
      state: { type: String },
      landMark: { type: String },
      alternatePhoneNumber: { type: String },
    },
    refTo: { type: mongoose.Schema.Types.ObjectId, ref: "signUp" },
  },
  { timestamps: true }
);

const userOrderModel =
  mongoose.models.SignUp || mongoose.model("userOrders", orderVar);

export default userOrderModel;
