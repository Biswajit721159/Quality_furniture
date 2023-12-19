let mongoose=require("mongoose")
let {Schema} =require("mongoose")

const products = new Schema(
    {
        newImage:{
            type:Array,
            require:true
        },
        product_name: {
            type: String, 
            required: true
        },
        price: {
            type: Number, 
            required: true
        },
        offer: {
            type: Number, 
            required: true
        },
        product_type: {
            type: String, 
            required: true
        },
        total_number_of_product: {
            type: Number, 
            required: true
        },
        rating: {
            type: Number,
            default: 5
        },
        number_of_people_give_rating: {
            type: Number,
            default: 1
        },
        Description:{
            type:String,
            default:""
        },
        isdeleted:{
            type:Boolean,
            default:false
        },
    }, 
    {
        timestamps: true
    }
)
let product=mongoose.model("product", products)

module.exports=product