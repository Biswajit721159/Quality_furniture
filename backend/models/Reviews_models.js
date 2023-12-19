let mongoose=require("mongoose");
let {Schema} =require("mongoose")


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
    }, 
    {
        timestamps: true
    }
)

let Review= mongoose.model("Review", Reviews)

module.exports=Review 