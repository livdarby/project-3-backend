import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IReview {
  review: string;
  name: string;
  date: () => Date;
  time: () => Date;
}

interface IProduct {
  image: string;
  title: string;
  description: string;
  price: number;
  unitsSold: number;
  user: mongoose.Schema.Types.ObjectId;
  category: string;
  reviews?: Array<IReview>;
}

const productSchema: Schema<IProduct> = new mongoose.Schema<IProduct>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  unitsSold: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  reviews: {type: Array<IReview>, required: false}
});

productSchema.plugin(uniqueValidator);

export default mongoose.model("Product", productSchema);
