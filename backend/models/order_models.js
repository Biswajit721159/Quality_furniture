let mongoose=require("mongoose");
let {Schema} =require("mongoose")
const orders = new Schema(
    {
        email: {
            type: String, 
            required: true
        },
        address: {
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
        payment_method: {
            type: String, 
            required: true
        },
        Total_rupess: {
            type:Number,
            required: true
        },
        Date: {
            type: String,
            required: true
        },
    }, 
    {
        timestamps: true
    }
)
let order=mongoose.model("order", orders)

module.exports=order 