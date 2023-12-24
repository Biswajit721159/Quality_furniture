let product = require("../models/product_models");
const mongoose = require("mongoose");
let { ApiResponse } = require("../utils/ApiResponse.js");
let {uploadOnCloudinary} = require("../utils/cloudenary")


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
  let firstimg= req.files?.firstimg[0]?.path
  let secondimg= req.files?.secondimg[0]?.path
  let thirdimg= req.files?.thirdimg[0]?.path
  firstimg=await uploadOnCloudinary(firstimg)
  secondimg=await uploadOnCloudinary(secondimg)
  thirdimg=await uploadOnCloudinary(thirdimg)
  firstimg=firstimg.url;
  secondimg=secondimg.url;
  thirdimg=thirdimg.url;
  let arr=[];
  arr.push(firstimg)
  arr.push(secondimg)
  arr.push(thirdimg)
  let jsondata={
    newImage:arr,
    product_name:req.body.product_name,
    price:req.body.price,
    offer:req.body.offer,
    product_type:req.body.product_type,
    total_number_of_product:req.body.total_number_of_product,
    rating:req.body.rating,
    number_of_people_give_rating:req.body.number_of_people_give_rating,
    Description:req.body.Description,
    isdeleted:req.body.isdeleted
  }
  try {
    let data = await product.create(jsondata);
    res
      .status(200)
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

let getproductUponPrice=async(req,res)=>{
  try{
    let low=req.params.low;
    let high=req.params.high;
    let catagory=req.params.catagory
    let result=null;
    if(catagory=="ALL") result=await product.find({price: { $gte: low, $lte: high }})
    else result=await product.find({price: { $gte: low, $lte: high },product_type: catagory})
    if(result)
        res.status(201).json(new ApiResponse(201, result, "success"));
    else
        res.status(404).json(new ApiResponse(404,null, "product does not exist"));   
  }
  catch{
    res.status(500).json(new ApiResponse(500,null, "Some Error is Found"));
  }
}

let getallProductType=async(req,res)=>{
  try{
    let result=await product.distinct('product_type')
    if(result)
        res.status(201).json(new ApiResponse(201, result, "success"));
    else
        res.status(404).json(new ApiResponse(404,null, "product does not exist"));   
  }
  catch{
    res.status(500).json(new ApiResponse(500,null, "Some Error is Found"));
  }
}

module.exports = {
  get_product_by_ids,
  getFullProduct,
  productInsert,
  informationById,
  searchProduct,
  Update_total_number_of_product,
  Update_RaingUpdateIntoProduct,
  find_get_product_by_ids,
  getproductUponPrice,
  getallProductType,
};
