let express = require("express");
let cors = require("cors");
let app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.json({ limit: "50mb" }));
const dotenv = require('dotenv')
dotenv.config();

let connectDB = require("./db/connection.js");
app.use(cors());
app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type',
}));

app.use(express.static("public"))

let userRouter = require("./Router/userRoute.js")
let productRouter = require('./Router/ProductRoute.js')
let ReviewsRouter = require('./Router/ReviewRoute.js')
let orderRouter = require('./Router/OrderRoute.js')
let adminpanel = require('./Router/AdminPanelRouter.js')
let Verification = require('./Router/Verification_Router.js')
let cart = require('./Router/cartRouter.js')
let wishlist = require('./Router/WishlistRoute.js')
let contact = require('./Router/ContactRoute.js')

connectDB()

app.get('/', async (req, res) => {
    res.send("Server is Running clearly")
})


app.use("/user", userRouter)
app.use('/product', productRouter)
app.use('/Reviews', ReviewsRouter)
app.use('/order', orderRouter)
app.use('/adminpanel', adminpanel)
app.use('/Verification', Verification)
app.use('/cart', cart)
app.use('/wishlist', wishlist)
app.use('/contact', contact)

app.listen(4000);


