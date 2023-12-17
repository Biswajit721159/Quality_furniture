let Review = require("../models/Reviews_models");
const mongoose = require("mongoose");
let { ApiResponse } = require("../utils/ApiResponse.js");

let informationById = async (req, res) => {
  try {
    let result = await Review.find({
      product_id: req.params.product_id,
    }).toArray();
    if (result) {
      res.status(201).json(new ApiResponse(201, result, "success"));
    } else {
      res.status(404).json(new ApiResponse(404, "product does not exist"));
    }
  } catch (error) {
    res.status(500).json(new ApiResponse(500, "Some Error is Found"));
  }
};

let ReviewInsert = async (req, res) => {
  try {
    let result = await Review.create(req.body);
    res.status(201).json(new ApiResponse(200, result, "Product Added Successfully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, "Some Error is Found"));
  }
};

module.exports = {
  informationById,
  ReviewInsert,
};
