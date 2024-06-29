let mongoose = require("mongoose");
let { Schema } = require("mongoose")


const Reviews = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        product_id: {
            type: Schema.Types.ObjectId,
            ref: "product"
        },
        order_id: {
            type: Schema.Types.ObjectId,
            ref: "order"
        },
        rating: {
            type: Number,
            required: true
        },
        review: {
            type: String,
            required: true
        },
        like: { // this is for count of the like 
            type: Number,
            default: 0
        },
        dislike: { // this is for count of the dislike
            type: Number,
            default: 0
        },
        islike: {
            type: Number,
            default: 0 // -1 mean dislike and 1 mean like
        }
    },
    {
        timestamps: true
    }
)

let Review = mongoose.model("Review", Reviews)

module.exports = Review 