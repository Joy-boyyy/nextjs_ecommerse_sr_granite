import mongoose from "mongoose";

const signUpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: Number, required: true },
  password: { type: String, required: true },
});

const SignUpModel =
  mongoose.models.SignUp || mongoose.model("signUp", signUpSchema);

export default SignUpModel;
