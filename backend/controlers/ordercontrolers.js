let order = require("../models/order_models");
const mongoose = require("mongoose");
let { ApiResponse } = require("../utils/ApiResponse.js");

let orderInsert=async(req,res)=>{
    try{
        let data = await order.create(req.body);
        res
        .status(201)
        .json(new ApiResponse(200, data, "Product Added Successfully"));
    }catch{
        res.status(500).json(new ApiResponse(500, "Some Error is Found"));
    }
}

let orderGetByEmail=async(req,res)=>{
    try {
        let result = await order.find({
          email:req.params.email
        });
        if (result) {
          res.status(201).json(new ApiResponse(201, result, "success"));
        } else {
          res.status(404).json(new ApiResponse(404, "product does not exist"));
        }
    } catch {
        res.status(500).json(new ApiResponse(500, "Some Error is Found"));
    }
}

let informationById=async(req,res)=>{
    try {
        let result = await order.findOne({
          _id: new mongoose.mongo.BSON.ObjectId(req.params._id),
        });
        if (result) {
          res.status(201).json(new ApiResponse(201, result, "success"));
        } else {
          res.status(404).json(new ApiResponse(404, "product does not exist"));
        }
    } catch {
        res.status(500).json(new ApiResponse(500, "Some Error is Found"));
    }
}

module.exports={
    orderInsert,
    orderGetByEmail,
    informationById
}