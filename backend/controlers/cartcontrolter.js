const cart = require("../models/cart_models");
let { ApiResponse } = require("../utils/ApiResponse.js");

const Add_To_Cart = async (req, res) => {
  res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
};
const Remove_To_Cart = async (req, res) => {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
};

module.exports= { Add_To_Cart, Remove_To_Cart };
