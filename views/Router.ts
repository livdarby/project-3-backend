import express, { Router } from "express";
import {
  getProducts,
  getProductById,
  addAProduct,
  deleteAProduct,
  updateAProduct,
  getProductsbySeller,
  getProductsByCategory,
  getAllCategories,
  // getOneCategory,
  updateUnitsSold,
  findSellerName,
  postAReview,
} from "../controllers/productController";
import { signup, login, getCurrentUser } from "../controllers/userController";
import secureRoute from "../middleware/secureRoute";

const router = express.Router();

// PRODUCTS ---------------------
// getting all the product data
router.route("/api/products").get(getProducts);

// getting all the product data
router.route("/api/products/:_id").get(getProductById);

// posting a product
router.route("/api/products").post(secureRoute, addAProduct);

// Edit 1 Product
router.route("/api/products/:_id").put(secureRoute, updateAProduct);

// Delete Product
router.route("/api/products/:_id").delete(secureRoute, deleteAProduct);

// Get All Product Categories
router.route("/api/categories").get(getAllCategories);

// SELLER ------------------------
// Seller SignUp
// Edit 1 Product
router.route("/api/products/:_id").put(secureRoute, updateAProduct);

// Delete Product
router.route("/api/products/:_id").delete(secureRoute, deleteAProduct);

// Get All Product Categories
router.route("/api/categories").get(getAllCategories);

// // Get 1 product Category
router.route("/api/products/search/:category").get(getProductsByCategory);

// SELLER ------------------------
// Seller SignUp
router.route("/api/signup").post(signup);
// Seller LogIn
router.route("/api/login").post(login);

// Get ALL Products for EACH USER
router.route("/api/getProducts/:userId").get(getProductsbySeller);

// Get Current User
router.route("/api/signup").get(secureRoute, getCurrentUser);

router.route("/api/unitsSold/:_id").post(updateUnitsSold);

router.route("/api/findSellerName/:_id").get(findSellerName);

router.route("/api/reviews/:_id").put(postAReview);

export default router;
