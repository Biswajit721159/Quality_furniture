const cart = require("../models/cart_models");
const Product = require('../models/product_models.js')
let { ApiResponse } = require("../utils/ApiResponse.js");

const Add_To_Cart = async (req, res) => {
  try {
    let { email, product_id, product_count } = req.body;
    if (!email || !product_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "SomeThing is missing"));
    }
    let cartdata = await cart.findOne({ email: email }).select(["-updatedAt", "-__v", "-createdAt"]);

    if (cartdata) {
      const result = await cart.updateOne(
        { email: email },
        { $set: { product_id: product_id, product_count: product_count } }
      );
      if (result.modifiedCount === 1) {
        cartdata.product_id = product_id
        let product = await Product.find({ _id: product_id }).select(["-updatedAt", "-__v", "-createdAt"]);
        if (product?.length > 0) {
          let finalResult = { ...cartdata?._doc, ...product[0]?._doc };
          finalResult.product_count = product_count
          return res.status(200).json(new ApiResponse(200, finalResult, "Success"));
        } else {
          return res.status(404).json(new ApiResponse(404, {}, "Product Not found"));
        }
      } else {
        return res
          .status(500)
          .json(new ApiResponse(500, {}, "Some Error is Found"));
      }
    } else {
      let result = await cart.create({ email, product_id, product_count });
      if (result._id) {
        let product = await Product.find({ _id: product_id }).select(["-updatedAt", "-__v", "-createdAt"]);
        if (product?.length > 0) {
          let finalResult = { ...result?._doc, ...product[0]?._doc };
          finalResult.product_count = product_count
          return res.status(200).json(new ApiResponse(200, finalResult, "Success"));
        } else {
          return res.status(404).json(new ApiResponse(404, {}, "Product Not found"));
        }
      } else {
        return res
          .status(500)
          .json(new ApiResponse(500, {}, "Some Error is Found"));
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Some Error is Found"));
  }
};

const Remove_To_Cart = async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "SomeThing is missing"));
    }
    let result = await cart.findOne({ email: email });
    if (result) {
      result = await cart.deleteOne({ email: email });
      if (result) {
        return res
          .status(200)
          .json(new ApiResponse(200, {}, "successfully Deleted"));
      } else {
        return res
          .status(500)
          .json(new ApiResponse(500, {}, "Some Error is Found"));
      }
    } else {
      return res.status(404).json(new ApiResponse(404, {}, "Product Not Found"));
    }
  } catch {
    return res.status(500).json(new ApiResponse(500, {}, "Some Error is Found"));
  }
};

const GetCart = async (req, res) => {
  try {
    let email = req.params.email;
    if (!email) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Email is Missing"));
    }
    let result = await cart.findOne({ email: email }).select(["-updatedAt", "-__v", "-createdAt"]);
    if (result) {
      let product = await Product.find({ _id: result?.product_id }).select(["-updatedAt", "-__v", "-createdAt"]);
      if (product?.length > 0) {
        let finalResult = { ...result?._doc, ...product[0]?._doc };
        return res.status(200).json(new ApiResponse(200, finalResult, "Success"));
      } else {
        return res.status(404).json(new ApiResponse(404, {}, "Product Not found"));
      }
    } else {
      return res.status(404).json(new ApiResponse(404, {}, "Product Not found"));
    }
  } catch {
    return res.status(500).json(new ApiResponse(500, {}, "Some Error is Found"));
  }
};

module.exports = { Add_To_Cart, Remove_To_Cart, GetCart };
