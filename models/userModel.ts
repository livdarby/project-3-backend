import mongoose, { Schema } from "mongoose";

interface IUser {
  userName: string,
  email: string,
  password: string,
  unit: number,
} 

const usersSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  unit: {Number},
});

export default mongoose.model<IUser>("User", usersSchema);