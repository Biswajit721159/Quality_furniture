let product = require("../models/product_models");
let Wishlist = require('../models/Wishlist_models.js')
const mongoose = require("mongoose");
let { ApiResponse } = require("../utils/ApiResponse.js");
let { uploadOnCloudinary } = require("../utils/cloudenary");

const getProductName = async (req, res) => {
  try {
    let productNames = await product.find({}).select(["product_name", "newImage"]);
    let filterProductName = [];
    let seen = new Set(); // To keep track of seen product names

    productNames.forEach((data) => {
      // Check if product_name is not already in seen set
      if (!seen.has(data.product_name)) {
        seen.add(data.product_name);
        let obj = {
          photo: data.newImage[0], // Assuming newImage is an array and taking the first item
          product_name: data.product_name
        }
        filterProductName.push(obj);
      }
    });

    res.status(200).json({
      status: 200,
      data: filterProductName,
      message: "Product names successfully fetched"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      data: null,
      message: "Error occurred while fetching product names"
    });
  }
}

let ProductUpdate = async (req, res) => {
  try {
    let result = await product.updateOne(
      { _id: new mongoose.mongo.BSON.ObjectId(req.params._id) },
      {
        $set: {
          newImage: req.body.arr,
          product_name: req.body.product_name,
          price: req.body.price,
          offer: req.body.offer,
          product_type: req.body.product_type,
          total_number_of_product: req.body.total_number_of_product,
          rating: req.body.rating,
          number_of_people_give_rating: req.body.number_of_people_give_rating,
          Description: req.body.Description,
          isdeleted: req.body.isdeleted
        }
      }
    );
    if (result.acknowledged) {
      res.status(200).json(new ApiResponse(200, result, "Product Update SuccessFully"));
    } else {
      res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
    }
  } catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
}

let get_product_by_ids = async (product_id_arr) => {
  try {
    let res = await product.find({ _id: { $in: product_id_arr } });
    return res;
  } catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
};

let find_get_product_by_ids = async (req, res) => {
  try {
    let result = await get_product_by_ids(req.body.product);
    if (result.length) {
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

let getFullProduct = async (req, res) => {
  try {
    let result = await product.find();
    if (result.length) {
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

let productInsert = async (req, res) => {
  let jsondata = {
    newImage: req.body.arr,
    product_name: req.body.product_name,
    price: req.body.price,
    offer: req.body.offer,
    product_type: req.body.product_type,
    total_number_of_product: req.body.total_number_of_product,
    rating: req.body.rating,
    number_of_people_give_rating: req.body.number_of_people_give_rating,
    Description: req.body.Description,
    isdeleted: req.body.isdeleted,
  };
  try {
    let data = await product.create(jsondata);
    res
      .status(201)
      .json(new ApiResponse(201, data, "Product Added Successfully"));
  } catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
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
      res
        .status(404)
        .json(new ApiResponse(404, null, "product does not exist"));
    }
  } catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
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
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
};

let Update_total_number_of_product = async (req, res) => {
  try {
    let result = await product.updateOne(
      { _id: new mongoose.mongo.BSON.ObjectId(req.params._id) },
      { $set: { total_number_of_product: req.body.product_count } }
    );
    if (result.acknowledged) {
      res.status(200).json(new ApiResponse(200, result, "success"));
    } else {
      res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
    }
  } catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
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
      res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
    }
  } catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
};

let getproductUponPrice = async (req, res) => {
  try {
    let low = req.params.low;
    let high = req.params.high;
    let catagory = req.params.catagory;
    let result = null;
    if (catagory == "ALL")
      result = await product.find({ price: { $gte: low, $lte: high } });
    else
      result = await product.find({
        price: { $gte: low, $lte: high },
        product_type: catagory,
      });
    if (result) res.status(201).json(new ApiResponse(201, result, "success"));
    else
      res
        .status(404)
        .json(new ApiResponse(404, null, "product does not exist"));
  } catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
};

let getproductUponPriceProductTypeAndProductName = async (req, res) => {
  try {
    let low = req.params.low;
    let high = req.params.high;
    let catagory = req.params.catagory;
    let product_name = req.params.product_name;
    let LowerLimit = req.params.LowerLimit;
    let HighLimit = req.params.HighLimit;
    let Limit = HighLimit - LowerLimit;
    let result = null;

    if (product_name == "none") {
      if (catagory == "ALL") {
        result = await product.find({
          price: { $gte: low, $lte: high },
          isdeleted: false
        }).select(["-createdAt", "-updatedAt", "-__v", "-isdeleted"]).skip(LowerLimit).limit(Limit + 1).exec();
      } else {
        result = await product.find({
          price: { $gte: low, $lte: high },
          product_type: catagory,
          isdeleted: false,
        }).select(["-createdAt", "-updatedAt", "-__v", "-isdeleted"]).skip(LowerLimit).limit(Limit + 1).exec();
      }
    } else {
      if (catagory == "ALL") {
        result = await product.find({
          price: { $gte: low, $lte: high },
          $or: [
            { product_name: { $regex: new RegExp(product_name, 'i') } },
            { product_type: { $regex: new RegExp(product_name, 'i') } },
          ],
          isdeleted: false,
        }).select(["-createdAt", "-updatedAt", "-__v", "-isdeleted"]).skip(LowerLimit).limit(Limit + 1).exec();
      } else {
        result = await product.find({
          price: { $gte: low, $lte: high },
          product_type: catagory,
          $or: [
            { product_name: { $regex: new RegExp(product_name, 'i') } },
            { product_type: { $regex: new RegExp(product_name, 'i') } },
          ],
          isdeleted: false,
        }).select(["-createdAt", "-updatedAt", "-__v", "-isdeleted"]).skip(LowerLimit).limit(Limit + 1).exec();
      }
    }

    let email = req?.body?.email
    let Wishlistproduct = await Wishlist.find({ 'email': email })
    let WishlistproductIds = Wishlistproduct?.map((data) => { return data?.product_id?.toString() })
    let ans = []
    for (let i = 0; i < result?.length; i++) {
      let obj = {
        _id: result[i]?._id,
        newImage: result[i].newImage,
        product_name: result[i]?.product_name,
        price: result[i]?.price,
        offer: result[i]?.offer,
        product_type: result[i]?.product_type,
        total_number_of_product: result[i]?.total_number_of_product,
        rating: result[i]?.rating,
        number_of_people_give_rating: result[i]?.number_of_people_give_rating,
        Description: result[i]?.Description,
        islove: false
      }
      if (WishlistproductIds.includes(result[i]._id.toString())) {
        obj.islove = true
      }
      ans.push(obj)
    }
    result = ans

    let hasNextPage = result.length > Limit;
    let actualResult = hasNextPage ? result?.slice(0, Limit) : result;
    let hasPrevPage = LowerLimit > 0;
    let pagination = {
      'prev': hasPrevPage,
      'next': hasNextPage,
    }
    if (actualResult.length) actualResult.push(pagination)
    if (actualResult) {
      res.status(200).json(new ApiResponse(200, actualResult, "success"));
    }
    else {
      let result = []
      result.push({
        'prev': false,
        'next': false,
      })
      res.status(404).json(new ApiResponse(404, result, "product does not exist"));
    }

  } catch {
    let result = []
    result.push({
      'prev': false,
      'next': false,
    })
    res.status(500).json(new ApiResponse(500, result, "Some Error is Found"));
  }
};

let getallProductType = async (req, res) => {
  try {
    const result = await product.aggregate([
      {
        $match: {
          isdeleted: false
        }
      },
      {
        $group: {
          _id: "$product_type",
          firstImage: { $first: { $arrayElemAt: ["$newImage", 0] } },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          product_type: "$_id",
          firstImage: 1,
          count: 1
        }
      }
    ]);
    let totalproduct = result.reduce((total, curr) => {
      total += curr?.count
      return total;
    }, 0)
    result.push({
      firstImage: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?cs=srgb&dl=pexels-pixabay-271816.jpg&fm=jpg',
      count: totalproduct,
      product_type: 'ALL'
    })
    if (result) res.status(200).json(new ApiResponse(200, result, "success"));
    else
      res
        .status(404)
        .json(new ApiResponse(404, null, "product does not exist"));
  } catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
};

let getproductByType = async (req, res) => {
  try {
    let result = await product.find({ product_type: req.params.product_type });
    if (result) res.status(201).json(new ApiResponse(201, result, "success"));
    else
      res
        .status(404)
        .json(new ApiResponse(404, null, "product does not exist"));
  } catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
};

let TopOfferProduct = async (req, res) => {
  try {
    const result = await product.aggregate([
      { $sort: { offer: -1 } },
      { $limit: parseInt(req.params.numberofProduct) },
    ]);
    if (result) res.status(201).json(new ApiResponse(201, result, "success"));
    else
      res
        .status(404)
        .json(new ApiResponse(404, null, "product does not exist"));
  } catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
};

let countNumberProduct = async (req, res) => {
  try {
    const result = await product.countDocuments({});
    res.status(200).json(new ApiResponse(200, result, "success"));
  }
  catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
}

let getproductByLimit = async (req, res) => {
  try {
    let searchValue = req.params?.searchValue
    if (searchValue === "undefined") searchValue = ''
    let LowerLimit = req.params?.LowerLimit;
    let HighLimit = req.params?.HighLimit;
    let Limit = HighLimit - LowerLimit;
    let result = await product.find({
      $or: [
        { product_name: { $regex: searchValue } },
        { product_type: { $regex: searchValue } },
      ]
    }).skip(LowerLimit).limit(Limit + 1).exec();
    let hasNextPage = result.length > Limit;
    let actualResult = hasNextPage ? result.slice(0, Limit) : result;
    let hasPrevPage = LowerLimit > 0;
    let pagination = {
      'prev': hasPrevPage,
      'next': hasNextPage,
    }
    if (actualResult.length) actualResult.push(pagination)
    if (actualResult) {
      res.status(200).json(new ApiResponse(200, actualResult, `Total ${actualResult?.length - 1} product found!`));
    }
    else {
      res.status(404).json(new ApiResponse(404, null, "Product does not exist"));
    }
  }
  catch {
    res.status(500).json(new ApiResponse(500, null, "Some Error is Found"));
  }
}

module.exports = {
  getProductName,
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
  getproductUponPriceProductTypeAndProductName,
  getproductByType,
  TopOfferProduct,
  countNumberProduct,
  getproductByLimit,
  ProductUpdate,
};
