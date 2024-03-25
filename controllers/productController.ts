import Products from "../models/productModel";
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
    res.status(404).json({
      message: "Product not found. Did you provide a valid product ID",
    });
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

//delete a product
export async function deleteAProduct(req: Request, res: Response) {
  try {
    //Get the footballer to delete
    const deletedProduct: any = await Products.findById(req.params._id);
    if (!deletedProduct) {
      res.send({ message: "No product found" });
    }
    console.log("CurrentUserID: ", res.locals.currentUser._id);
    console.log("Player to delete: ", deletedProduct);
    console.log("PlayerUserID: ", deletedProduct?.user);

    if (res.locals.currentUser._id.equals(deletedProduct?.user)) {
      const productID = req.params._id;
      const deletedProduct = await Products.findByIdAndDelete(productID);
      return res.send(deletedProduct);
    } else {
      return res.send({
        message: "You are not authorized to delete this product.",
      });
    }
  } catch (e) {
    res.send({ message: "There was a problem deleting your product." });
  }
}

//UPDATE A PRODUCT
export async function updateAProduct(req: Request, res: Response) {
  try {
    const productToUpdate: any = await Products.findById(req.params._id);
    if (!productToUpdate) {
      res.send({ message: "No product found" });
    }
    if (res.locals.currentUser._id.equals(productToUpdate?.user)) {
      const update = req.body;
      //update the player
      const updatedProduct = await Products.findByIdAndUpdate(
        productToUpdate,
        update,
        {
          //if new true isnt here, we would send the original product back to user, not the updated product
          new: true,
        }
      );
      res.send(updatedProduct);
    } else {
      return res.send({
        message: "You are not authorized to update this product.",
      });
    }
  } catch (e) {
    res.send({
      message: "Player not found. Did you provide a valid productID?",
    });
  }
}

export async function updateUnitsSold(req: Request, res: Response) {
  try {
    const productToUpdate: any = await Products.findById(req.params._id);
    if (!productToUpdate) {
      res.send({
        message: "Product not found. Did you provide a valid productID?",
      });
    } else {
      const update = req.body;
      console.log(update);
      const updatedProduct = await Products.findByIdAndUpdate(
        productToUpdate,
        update,
        {
          //if new true isnt here, we would send the original product back to user, not the updated product
          new: true,
        }
      );
      res.send(updatedProduct);
    }
  } catch (e) {
    res.send({
      message: "Error",
    });
  }
}
// GET ALL CATEGORIES :
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Products.distinct("category");
    res.send(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// GET 1 CATEGORIES :
// export async function getOneCategory(req: Request, res: Response) {
//   const findCategory = req.params.category;
//   console.log(req.params);
//   // console.log(selectedField);
//   const productField = await Products.findOne({ category: findCategory });
//   res.send(productField);
//   console.log(`this is the last console ${productField.category}`);
// }
