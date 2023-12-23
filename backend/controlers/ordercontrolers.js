let order = require("../models/order_models");
const mongoose = require("mongoose");
let { ApiResponse } = require("../utils/ApiResponse.js");
let { get_product_by_ids } = require("../controlers/productcontrolers.js");
const product = require("../models/product_models.js");

let orderInsert = async (req, res) => {
  try {
    let data = await order.create(req.body);
    res
      .status(201)
      .json(new ApiResponse(200, data, "Product Added Successfully"));
  } catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
};

let orderGetByEmail = async (req, res) => {
  try {
    let result = await order.find({
      email: req.params.email,
    });
    let product_id_arr = [];
    for (let i = 0; i < result.length; i++) {
      product_id_arr.push(result[i].product_id);
    }
    let nums = await get_product_by_ids(product_id_arr);
    let actualResult = [];
    for (let i = 0; i < result.length; i++) {
      let obj = {
        id: result[i]._id,
        address: result[i].address,
        product_id: result[i].product_id,
        product_count: result[i].product_count,
        payment_method: result[i].payment_method,
        Total_rupess: result[i].Total_rupess,
        Date: result[i].Date,
        product_name: "",
        newImage: [],
        isfeedback: result[i].isfeedback,
      };
      for (let j = 0; j < nums.length; j++) {
        let product_id = nums[j]._id.toString();
        let obj_id = obj.product_id.toString();
        if (product_id === obj_id) {
          obj.product_name = nums[j].product_name;
          obj.newImage = nums[j].newImage;
        }
      }
      actualResult.push(obj);
    }

    if (result) {
      res.status(201).json(new ApiResponse(201, actualResult, "success"));
    } else {
      res
        .status(404)
        .json(new ApiResponse(404, null, "product does not exist"));
    }
  } catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
};

let informationById = async (req, res) => {
  try {
    let result = await order.findOne({
      _id: new mongoose.mongo.BSON.ObjectId(req.params._id),
    });
    if (result) {
      res.status(201).json(new ApiResponse(201, result, "success"));
    } else {
      res
        .status(404)
        .json(new ApiResponse(404, null, "product does not exist"));
    }
  } catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
};

let updateFeedback=async(req,res)=>{
  try {
    let result = await order.updateOne(
      { _id: new mongoose.mongo.BSON.ObjectId(req.params._id) },
      {
        $set: {
          isfeedback:req.body.isfeedback
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
}

module.exports = {
  orderInsert,
  orderGetByEmail,
  informationById,
  updateFeedback,
};
