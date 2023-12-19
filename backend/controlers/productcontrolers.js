let product = require("../models/product_models");
const mongoose = require("mongoose");
let { ApiResponse } = require("../utils/ApiResponse.js");

let get_product_by_ids = async (product_id_arr) => {
  try {
    let res = await product.find({ _id: { $in: product_id_arr } });
    return res;
  } catch {
    return [];
  }
};

let find_get_product_by_ids=async(req,res)=>{
  try{
    let result=await get_product_by_ids(req.body.product);
    if (result.length) {
      res.status(201).json(new ApiResponse(201, result, "success"));
    } else {
      res.status(404).json(new ApiResponse(404,null, "product does not exist"));
    }
  }catch{
    res.status(500).json(new ApiResponse(500,null, "Some Error is Found"));
  }
}

let getFullProduct = async (req, res) => {
  try {
    let result = await product.find();
    if (result.length) {
      res.status(201).json(new ApiResponse(201, result, "success"));
    } else {
      res.status(404).json(new ApiResponse(404,null, "product does not exist"));
    }
  } catch (error) {
    res.status(500).json(new ApiResponse(500,null, "Some Error is Found"));
  }
};

let productInsert = async (req, res) => {
  try {
    let data = await product.create(req.body);
    res
      .status(201)
      .json(new ApiResponse(200, data, "Product Added Successfully"));
  } catch {
    res.status(500).json(new ApiResponse(500,null, "Some Error is Found"));
  }
};

let informationById = async (req, res) => {
  try {
    let result = await product.findOne({
      _id: new mongoose.mongo.BSON.ObjectId(req.params._id),
    });
    if (result) {
      res.status(201).json(new ApiResponse(201, result, "success"));
    } else {
      res.status(404).json(new ApiResponse(404,null, "product does not exist"));
    }
  } catch {
    res.status(500).json(new ApiResponse(500,null, "Some Error is Found"));
  }
};

let searchProduct = async (req, res) => {
  try {
    let result = await product.find({
      $or: [
        { product_type: { $regex: req.params.key } },
        { product_name: { $regex: req.params.key } },
      ],
    });
    res.status(201).json(new ApiResponse(201, result, "success"));
  } catch {
    res.status(500).json(new ApiResponse(500,null, "Some Error is Found"));
  }
};

let Update_total_number_of_product = async (req, res) => {
  try {
    let result = await product.updateOne(
      { _id: new mongoose.mongo.BSON.ObjectId(req.params._id) },
      { $set: { total_number_of_product: req.body.product_count } }
    );
    if (result.acknowledged) {
      res.status(201).json(new ApiResponse(201, result, "success"));
    } else {
      res.status(500).json(new ApiResponse(500,null, "Some Error is Found"));
    }
  } catch {
    res.status(500).json(new ApiResponse(500,null, "Some Error is Found"));
  }
};

let Update_RaingUpdateIntoProduct = async (req, res) => {
  try {
    let result = await product.updateOne(
      { _id: new mongoose.mongo.BSON.ObjectId(req.params._id) },
      {
        $set: {
          rating: req.body.rating,
          number_of_people_give_rating: req.body.number_of_people_give_rating,
        },
      }
    );
    if (result.acknowledged) {
      res.status(201).json(new ApiResponse(201, result, "success"));
    } else {
      res.status(500).json(new ApiResponse(500,null, "Some Error is Found"));
    }
  } catch {
    res.status(500).json(new ApiResponse(500,null, "Some Error is Found"));
  }
};

module.exports = {
  get_product_by_ids,
  getFullProduct,
  productInsert,
  informationById,
  searchProduct,
  Update_total_number_of_product,
  Update_RaingUpdateIntoProduct,
  find_get_product_by_ids,
};
