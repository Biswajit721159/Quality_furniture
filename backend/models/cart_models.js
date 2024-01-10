let mongoose=require("mongoose");
let {Schema} =require("mongoose")
const carts = new Schema(
    {
        email: {
            type: String, 
            required: true
        },
        product_id: {
            type: Schema.Types.ObjectId,
            ref: "product"
        },
        product_count: {
            type: Number, 
            required: true
        },
    }, 
    {
        timestamps: true
    }
)
let cart=mongoose.model("Cart", carts)

module.exports=cart 