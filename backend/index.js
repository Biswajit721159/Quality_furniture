
let express = require("express");
let cors = require("cors");
let app = express();

app.use(express.json({ limit: "50mb" }));
const dotenv = require('dotenv')
dotenv.config();
let connectDB =require("./db/connection.js");

app.use(cors());
app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type',
}));


let userRouter=require("./Router/userRoute.js")
let productRouter=require('./Router/ProductRoute.js')
let ReviewsRouter=require('./Router/ReviewRoute.js')
let orderRouter=require('./Router/OrderRoute.js')


connectDB()

let User=require('./models/user_models.js')

app.get('/',async(req,res)=>{
    try{
        let x=await User.find();
        res.send(x)
    }catch{
        res.send("Data is loadded")
    }
})


app.use("/user", userRouter)
app.use('/product',productRouter)
app.use('/Reviews',ReviewsRouter)
app.use('/order',orderRouter)




app.listen(5000);
