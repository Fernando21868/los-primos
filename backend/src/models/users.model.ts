import mongoose, { Model, Schema } from "mongoose";
import { IUsers } from "../interfaces/users.interface";

const UserSchema: Schema<IUsers> = new Schema<IUsers>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    dni: {
      type: Number,
    },
    email: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
    },
    repeatPassword: {
      type: String,
    },
    permissions: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    googleId: {
      type: String,
    },
    sex: {
      type: String,
    },
    profilePhoto: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const Users: Model<IUsers> = mongoose.model<IUsers>("users", UserSchema);

export { Users };
