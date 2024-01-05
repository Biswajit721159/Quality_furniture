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

let getorderByLimit=async(req,res)=>{
  try
  {
    let lowerLimit=req.params.lowerLimit;
    let upperLimit=req.params.upperLimit;
    let limit=upperLimit-lowerLimit;
    let result=await order.find({email:req.params.email}).sort({ _id: -1 }).skip(lowerLimit).limit(limit+1).exec();
   
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
    
    let hasNextPage = actualResult.length > limit;
    let Result=hasNextPage ? actualResult.slice(0, limit) : actualResult;
    let hasPrevPage = lowerLimit > 0;
    let pagination= {
      'prev': hasPrevPage,
      'next': hasNextPage,
    }
    if(Result.length) Result.push(pagination)
    if (Result)
    {
      res.status(201).json(new ApiResponse(201, Result, "success"));
    } 
    else
    {
      res.status(404).json(new ApiResponse(404, null, "Review does not exist"));
    }
  }catch{
    res.status(500).json(new ApiResponse(500,null, "Some Error is Found"));
  }
}

let countNumberOrder=async(req,res)=>{
  try {
    const result=await order.countDocuments({});
    res.status(201).json(new ApiResponse(201, result, "success"));
  }
  catch{
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
}

let getAllOrder=async(req,res)=>{
  try {
    let LowerLimit = req.params.LowerLimit;
    let HighLimit = req.params.HighLimit;
    let Limit=HighLimit-LowerLimit;
    let result=await order.find({}).skip(LowerLimit).limit(Limit+1).exec();
    let hasNextPage = result.length > Limit;
    let orderarr=hasNextPage ? result.slice(0, Limit) : result;
    let hasPrevPage = LowerLimit > 0;
    let pagination= {
      'prev': hasPrevPage,
      'next': hasNextPage,
    }
    set=new Set();
    for(let i=0;i<orderarr.length;i++)
    {
      set.add(orderarr[i].product_id);
    }
    let arr=[...set];
    product_data=await get_product_by_ids(arr)
    let actualResult=[]

    for(let i=0;i<orderarr.length;i++)
    {
      for(let j=0;j<product_data.length;j++)
      {
        let ProductString = product_data[j]._id.toString();
        let orderString=orderarr[i].product_id.toString();
        if(ProductString==orderString)
        {
          let obj={
            product_name:product_data[j].product_name,
            product_id:product_data[j]._id,
            email:orderarr[i].email,
            address:orderarr[i].address,
            product_count:orderarr[i].product_count,
            payment_method:orderarr[i].payment_method,
            Total_rupess:orderarr[i].Total_rupess,
            Date:orderarr[i].Date,
            isfeedback:orderarr[i].isfeedback,
            createdAt:orderarr[i].createdAt,
            updatedAt:orderarr[i].updatedAt,
          }
          actualResult.push(obj)
          break;
        }
      }
    }

    if(actualResult.length) actualResult.push(pagination)
    if (actualResult)
    {
      res.status(201).json(new ApiResponse(201, actualResult, "success"));
    } 
    else
    {
      res.status(404).json(new ApiResponse(404, null, "Review does not exist"));
    }
  }
  catch{
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
}

module.exports = {
  orderInsert,
  orderGetByEmail,
  informationById,
  updateFeedback,
  getorderByLimit,
  countNumberOrder,
  getAllOrder
};
