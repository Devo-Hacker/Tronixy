import productModel from "../models/productModel.js";

//get all products
export const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel
    res.status(200).send({
      success: true,
      message: "all products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get All Products API",
      error,
    });
  }
};

//get single product
export const getSingleProductController = async (req, res) => {
  try {
    //get product id
    const product = await productModel.findById(req.params.id);
    //valdiation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "product not found",
      });
    }
     res.status(200).send({
      success: true,
      message: "Product Found",
      product,
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Get single Product API",
      error,
    });
  }
};