let Review = require("../models/Reviews_models");
const mongoose = require("mongoose");
let { ApiResponse } = require("../utils/ApiResponse.js");

let informationById = async (req, res) => {
  try {
    let result = await Review.find({
      product_id: req.params.product_id,
    });
    if (result) {
      res.status(201).json(new ApiResponse(201, result, "success"));
    } else {
      res
        .status(404)
        .json(new ApiResponse(404, null, "product does not exist"));
    }
  } catch (error) {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
};

let ReviewInsert = async (req, res) => {
  try {
    let result = await Review.create(req.body);
    res
      .status(201)
      .json(new ApiResponse(200, result, "Product Added Successfully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
};

let findRatingPersentageofProduct=async(req,res)=>{
  try{
    let persentage_5_star=0
    let persentage_4_star=0
    let persentage_3_star=0
    let persentage_2_star=0
    let persentage_1_star=0
    
    let number_5_star=0;
    let number_4_star=0;
    let number_3_star=0;
    let number_2_star=0;
    let number_1_star=0;

    let total=0;
    let overall_rating=0;

    let result=await Review.find({product_id:req.params.product_id});
    total=result.length;
    for(let i=0;i<total;i++)
    {
        if(result[i].rating=="1")
        {
            number_1_star++;
        }
        else if(result[i].rating=="2")
        {
          number_2_star++;
        }
        else if(result[i].rating=="3")
        {
          number_3_star++;
        }
        else if(result[i].rating=="4")
        {
          number_4_star++;
        }
        else
        {
          number_5_star++;
        }
    }
    let x=((number_1_star*1)+(number_2_star*2)+(number_3_star*3)+(number_4_star*4)+(number_5_star*5));
    let y=0;
    if(x) y=x/total;
    overall_rating=y.toFixed(2);
    if (x!=0) persentage_1_star=(((number_1_star/total)*100));
    if (x!=0) persentage_2_star=(((number_2_star/total)*100));
    if (x!=0) persentage_3_star=(((number_3_star/total)*100));
    if (x!=0) persentage_4_star=(((number_4_star/total)*100));
    if (x!=0) persentage_5_star=(((number_5_star/total)*100));
    let actualResult=[];
    actualResult.push({persentage_1_star,number_1_star});
    actualResult.push({persentage_2_star,number_2_star});
    actualResult.push({persentage_3_star,number_3_star});
    actualResult.push({persentage_4_star,number_4_star});
    actualResult.push({persentage_5_star,number_5_star});
    actualResult.push({overall_rating,total});
    res.status(201).json(new ApiResponse(201, actualResult, "success"));
  }catch{
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
}

let findReviewsBylowerAndUpperLimit = async (req, res) => {
  try{
      let lowerLimit=req.params.lowerLimit;
      let upperLimit=req.params.upperLimit;
      let limit=upperLimit-lowerLimit;
      const excludedFields = ["email", "_id","product_id","order_id","createdAt","updatedAt","__v"];
      const projection = excludedFields.reduce((acc, field) => {
        acc[field] = 0;
        return acc;
      }, {});

      let result=await Review.find({product_id: req.params.product_id}).select(projection).skip(lowerLimit).limit(limit+1).exec();
      let hasNextPage = result.length > limit;
      let actualResult=hasNextPage ? result.slice(0, limit) : result;
      let hasPrevPage = lowerLimit > 0;
      let pagination= {
        'prev': hasPrevPage,
        'next': hasNextPage,
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
  }catch{
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
};

let countNumberReviews=async(req,res)=>{
  try {
    const result=await Review.countDocuments({});
    res.status(201).json(new ApiResponse(201, result, "success"));
  }
  catch{
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
}


module.exports = {
  informationById,
  ReviewInsert,
  findReviewsBylowerAndUpperLimit,
  findRatingPersentageofProduct,
  countNumberReviews
};
