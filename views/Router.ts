import express from "express";
import {
  getProducts,
  getProductById,
  addAProduct,
} from "../controllers/productController";
import { signup, login } from "../controllers/userController";
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

export default router;
