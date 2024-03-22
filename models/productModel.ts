import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IProduct {
  image: string;
  title: string;
  description: string;
  price: number;
  unitsSold: number;
  user: mongoose.Schema.Types.ObjectId;
}

const productSchema: Schema<IProduct> = new mongoose.Schema<IProduct>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  unitsSold: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

productSchema.plugin(uniqueValidator);

export default mongoose.model("Product", productSchema);
