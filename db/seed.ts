import mongoose from "mongoose";
import Users from "../models/userModel";
import Product from "../models/productModel";

const adminUser = {
  userName: "JamieSellman",
  email: "jamie@jamie.com",
  password: "Jamie200!",
};

const today = new Date();

const exampleReview = {
  name: "A previous purchaser",
  review: "This was a really great product!",
  date: today.toLocaleDateString(),
  time: today.toLocaleTimeString(),
};

const productData = [
  {
    title: "Jamie",
    image:
      "https://i2-prod.liverpool.com/incoming/article26197068.ece/ALTERNATES/s1200c/0_Konat-and-van-Dijk.jpg",
    description: "A wonderful product",
    price: 10,
    unitsSold: 0,
    category: "pastries",
    reviews: [exampleReview],
  },
  {
    image:
      "https://www.telegraph.co.uk/content/dam/football/2018/05/01/TELEMMGLPICT000161397118_trans_NvBQzQNjv4Bq4aR7DNfHvshBvmGp6VUpaCWNdc-fnFR37rRPeJz9EG8.jpeg?imwidth=680",
    title: "jurgen",
    description: "a new product!",
    price: 5,
    unitsSold: 0,
    category: "TBD",
  },
  {
    title: "French croissant",
    image:
      "https://static01.nyt.com/images/2021/04/07/dining/06croissantsrex1/06croissantsrex1-square640.jpg",
    description: "Better than the english one",
    price: 10000,
    unitsSold: 0,
    category: "Viennoiserie",
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
