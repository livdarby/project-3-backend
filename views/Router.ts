import express from "express";
import { getProducts, getProductById } from "../controllers/productController";


const router = express.Router();

// getting all the product data
router.route("/api/products").get(getProducts);

// getting all the product data
router.route("/api/products/:_id").get(getProductById);

export default router