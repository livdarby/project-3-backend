import mongoose from "mongoose";
import Users from "../models/userModel";
import Product from "../models/productModel";

const adminUser = {
  userName: "JamieSellman",
  email: "jamie@jamie.com",
  password: "Jamie200!",
};

const productData = [
  {
    title: "Jamie",
    image:
      "https://i2-prod.liverpool.com/incoming/article26197068.ece/ALTERNATES/s1200c/0_Konat-and-van-Dijk.jpg",
    description: "A wonderful product",
    price: 10,
    unitsSold: 0,
  },
];

async function seed() {
  await mongoose.connect("mongodb://127.0.0.1:27017/shopdb");
  console.log("SEEDING HAS BEGUN! 🔥");

  // ! If you want to remove all the existing data in the db
  await mongoose.connection.db.dropDatabase();
  console.log("Remove existing data.");

  // ! Before we seed movies, we want to seed a user.
  const user = await Users.create(adminUser);
  console.log("Admin user is seed:", user);
  productData.forEach((product: any) => (product.user = user._id));

  const products = await Product.create(productData);
  console.log(products);

  console.log("Disconnecting..");
  await mongoose.disconnect();
}

seed();
