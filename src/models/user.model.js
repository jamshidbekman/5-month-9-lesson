import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phone_number: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
