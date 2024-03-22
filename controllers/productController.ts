
import Products from "../models/productModel"
import { Request, Response } from "express";

//GET ALL PRODUCTS
export async function getProducts(req: Request, res: Response) {
  try {
    const allProducts = await Products.find();
    res.send(allProducts);
  } catch (e) {
    res.send({
      message:
        "Unable to return all the products. Please use the correct path: /api/products",
    });
  }
}

//GET AN SINGLE PRODUCT
export async function getProductById(req: Request, res: Response) {
  try {
    // in req params ._id needs to match the id above to work
    const idNumber = req.params._id;
    console.log(idNumber);
    const foundProduct = await Products.findById(idNumber);
    res.send(foundProduct);
  } catch (error) {
    console.log(error);
    res.status(404).json({message: "Product not found. Did you provide a valid product ID"});
  }
}

// ADD A PRODUCT
export async function addAProduct(req: Request, res: Response) {
  console.log("POSTING!", req.body);
  // HERE WE ADD THE CURRENT USER TO THE PRODUCT BEFORE ADDING THE PRODUCT
  req.body.user = res.locals.currentUser;
  try {
    const addProduct = await Products.create(req.body);
    res.send(addProduct);
  } catch (e) {
    res.send({
      messge: "unable to add product. Did you follow the correct format?",
    });
  }
}