let mongoose=require("mongoose");
let {Schema} =require("mongoose")
const Wishlistmodels = new Schema(
    {
        email: {
            type: String, 
            required: true
        },
        product_id: {
            type: Schema.Types.ObjectId,
            ref: "product"
        }
    }, 
    {
        timestamps: true
    }
)
let Wishlist=mongoose.model("Wishlist", Wishlistmodels)

module.exports=Wishlist 