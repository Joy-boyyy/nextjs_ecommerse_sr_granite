import mongoose from "mongoose";

const cartProductSTructure = {
  amount: { type: Number, default: 1 },
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  rating: { type: Number, required: true },
  warrantyInformation: { type: String, required: true },
  shippingInformation: { type: String, required: true },
  thumbnail: { type: String, required: true },
};

const cartSchema = new mongoose.Schema(
  {
    cartData: [cartProductSTructure],
    refTo: { type: mongoose.Schema.Types.ObjectId, ref: "signUp" },
  },
  { timestamps: true }
);

const cartModel =
  mongoose.models.productCart || mongoose.model("productCart", cartSchema);

export default cartModel;
