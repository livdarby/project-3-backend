import express from "express";
import {
  getProducts,
  getProductById,
  addAProduct,
  deleteAProduct,
  updateAProduct,
  updateUnitsSold
} from "../controllers/productController";
import { signup, login, getCurrentUser } from "../controllers/userController";
import secureRoute from "../middleware/secureRoute";

const router = express.Router();

// getting all the product data
router.route("/api/products").get(getProducts);

// getting all the product data
router.route("/api/products/:_id").get(getProductById);

// posting a product
router.route("/api/products").post(secureRoute, addAProduct);

router.route("/api/signup").post(signup);

router.route("/api/login").post(login);

router.route("/api/products/:_id").delete(secureRoute, deleteAProduct);

router.route("/api/products/:_id").put(secureRoute, updateAProduct);

router.route("/api/signup").get(secureRoute, getCurrentUser);

router.route("/api/unitsSold/:_id").post(updateUnitsSold);

export default router;
