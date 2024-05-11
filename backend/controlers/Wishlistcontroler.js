let Wishlist = require('../models/Wishlist_models')
let Product = require('../models/product_models')
let { ApiResponse } = require('../utils/ApiResponse')

async function AddFavouriteJourney(req, res) {
    try {
        let product_id = req.params.product_id
        let email = req?.user?.email
        if (!email || !product_id) {
            return res
                .status(404)
                .json(new ApiResponse(404, [], "Some parameter is missing!"));
        }
        else {
            let love = await Wishlist.create({ email, product_id })
            if (love) {
                return res
                    .status(201)
                    .json(new ApiResponse(201, [], "Product added successfully"));
            } else {
                return res
                    .status(500)
                    .json(new ApiResponse(500, [], "Server down ! "));
            }
        }
    } catch {
        return res
            .status(500)
            .json(new ApiResponse(500, [], "Server down !"));
    }
}

async function RemoveFavouriteJourney(req, res) {
    try {
        let love = await Wishlist.deleteOne({ email: req?.user?.email, product_id: req?.params?.product_id })
        if (love?.acknowledged && love?.deletedCount) {
            return res
                .status(200)
                .json(new ApiResponse(200, [], "Wishlist is deleted successfully"));
        } else {
            return res
                .status(500)
                .json(new ApiResponse(500, [], "Server down !"));
        }
    } catch {
        return res
            .status(500)
            .json(new ApiResponse(500, [], "Server down !"));
    }
}

async function GetFavouriteJourneyByemail(req, res) {
    try {
        let love = await Wishlist.find({ email: req?.params?.email })
        let product_ids = love?.map((data) => { return data?.product_id })
        let products = await Product.find({ _id: { $in: product_ids } })
        if (love?.length) {
            return res
                .status(200)
                .json(new ApiResponse(200, products, "Wishlist is found successfully !"));
        } else {
            return res
                .status(404)
                .json(new ApiResponse(404, [], "Wishlist not found !"));
        }
    } catch {
        return res
            .status(500)
            .json(new ApiResponse(500, [], "Server down !"));
    }
}



module.exports = {
    AddFavouriteJourney,
    RemoveFavouriteJourney,
    GetFavouriteJourneyByemail,
}