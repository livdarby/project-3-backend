import Products from "../models/productModel";
import { Request, Response } from "express";
import Users from "../models/userModel";

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
    const idNumber = req.params._id;
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
    const deletedProduct: any = await Products.findById(req.params._id);
    if (!deletedProduct) {
      res.send({ message: "No product found" });
    }

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
      const updatedProduct = await Products.findByIdAndUpdate(
        productToUpdate,
        update,
        {
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
      message: "product not found. Did you provide a valid productID?",
    });
  }
}

//GET PRODUCT BY CATEGORY
export async function getProductsByCategory(req: Request, res: Response) {
  try {
    const productCategory = req.params.category;
    const foundProduct = await Products.find({ category: productCategory });
    res.send(foundProduct);
  } catch (error) {
    res.status(404).json({
      message: "Product not found. Did you provide a valid product ID",
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
      const updatedProduct = await Products.findByIdAndUpdate(
        productToUpdate,
        update,
        {
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
export async function getAllCategories(req: Request, res: Response) {
  try {
    const categories = await Products.distinct("category");
    res.send(categories);
  } catch (error) {
    res.status(500).send("Server error");
  }
}

// Get ALL products/Seller :
export async function getProductsbySeller(req: Request, res: Response) {
  try {
    const sellerId = req.params.userId;
    if (!sellerId) {
      return res.status(400).send({ message: "Please provide a Seller ID" });
    }

    // Get the products if they exist on seller
    const products = await Products.find({ user: sellerId });

    if (products.length === 0) {
      return res.status(404).send({ message: "This seller has no products !" });
    }
    res.send(products);
    console.log(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "error while getting products" });
  }
}

export async function findSellerName(req: Request, res: Response) {
  try {
    const productId = req.params._id;
    const product: any = await Products.findById(productId);
    const sellerToFind = product.user;
    const foundSeller = await Users.findById(sellerToFind);
    res.send(foundSeller);
  } catch (e) {
    res.status(500).send({ message: "Error" });
  }
}

export async function postAReview(req: Request, res: Response) {
  try {
    const productId = req.params._id;
    const productToUpdate: any = await Products.findById(productId);
    const existingReviews = productToUpdate.reviews;
    const today = new Date();
    req.body.reviews.map((review: any) => {
      return (review.date = today.toLocaleDateString());
    });
    req.body.reviews.map((review: any) => {
      return (review.time = today.toLocaleTimeString());
    });
    const newListOfReviews = [...req.body.reviews, ...existingReviews];
    req.body.reviews = newListOfReviews;
    const updatedProduct = await Products.findByIdAndUpdate(
      productToUpdate,
      req.body,
      {
        new: true,
      }
    );
    res.send(updatedProduct);
  } catch (e) {
    res.status(500).send({ message: "Error" });
  }
}
