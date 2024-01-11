const cart = require("../models/cart_models");
let { ApiResponse } = require("../utils/ApiResponse.js");

const Add_To_Cart = async (req, res) => {
  try {
    let { email, product_id, product_count } = req.body;
    if (!email || !product_id || !product_count) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "SomeThing is missing"));
    }
    let product = await cart.findOne({ email: email });

    if (product) {
      const result = await cart.updateOne(
        { email: email },
        { $set: { product_count: product_count } }
      );
      if (result.modifiedCount == 1) {
        return res.status(200).json(new ApiResponse(200, req.body, "success"));
      } else {
        return res
          .status(500)
          .json(new ApiResponse(500, null, "Some Error is Found"));
      }
    } else {
      let result = (await cart.create({ email, product_id, product_count }));
      if (result._id) {
        return res.status(200).json(new ApiResponse(200, req.body, "Success"));
      } else {
        return res
          .status(500)
          .json(new ApiResponse(500, null, "Some Error is Found"));
      }
    }
  } catch {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Some Error is Found"));
  }
};

const Remove_To_Cart = async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "SomeThing is missing"));
    }
    let result = await cart.findOne({ email: email });
    if (result) {
      result = await cart.deleteOne({ email: email });
      if (result) {
        return res
          .status(200)
          .json(new ApiResponse(200, result, "successfully Deleted"));
      } else {
        return res
          .status(500)
          .json(new ApiResponse(500, null, "Some Error is Found"));
      }
    } else {
      res.status(404).json(new ApiResponse(404, null, "Product Not Found"));
    }
  } catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
};

module.exports = { Add_To_Cart, Remove_To_Cart };
