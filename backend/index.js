const mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
var ObjectID = require("bson-objectid");
let app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

let Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

let dbconnect = require("./mongodb");
let dbconnect_product = require("./product");
let dbconnect_order = require("./order");
let dbconnect_Reviews = require("./reviews");

mongoose.connect("mongodb+srv://biswajit2329:T1voipAip4RSgv97@cluster0.fw5wwvc.mongodb.net/e-comm?retryWrites=true&w=majority");

//Reviews section

app.get("/Reviews",verifytoken, async (req, res) => {
  try {
    let data = await dbconnect_Reviews();
    let result = await data.find().toArray();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/Reviews/:product_id",verifytoken,async(req,res)=>{
  try {
    let data = await dbconnect_Reviews();
    let result = await data.find({product_id:req.params.product_id}).toArray()
    res.send(result);
  } catch (error) {
    console.log(error);
  }
})

app.post("/Reviews",verifytoken, async (req, res) => {
  try {
    let data = await dbconnect_Reviews();
    let result = await data.insertOne(req.body);
    res.send(req.body);
  } catch (error) {
    console.log(error);
  }
});

//order section

app.get("/order", verifytoken, async (req, resp) => {
  try {
    let data = await dbconnect_order();
    let result = await data.find().toArray();
    resp.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/order/order_id/:id", verifytoken, async (req, resp) => {
  try {
    let data = await dbconnect_order();
    let result = await data.find().toArray();
    let ans = [];
    for (let i = 0; i < result.length; i++) {
      if (result[i]._id == req.params.id) {
        ans.push(result[i]);
        break;
      }
    }
  resp.send(ans);
  } catch (error) {
    console.log(error);
  }
});


app.post("/order",verifytoken, async (req, resp) => {
  try {
    let data = await dbconnect_order();
    let result = await data.insertOne(req.body);
    resp.send(req.body);
  } catch (error) {
    console.log(error);
  }
});

app.get("/order/:email", verifytoken, async (req, resp) => {
  try {
    let data = await dbconnect_order();
    let result = await data.find().toArray();
    let ans=[]
    for(let i=0;i<result.length;i++)
    {
      if(result[i].email==req.params.email)
      {
        ans.push(result[i])
      }
    }
    resp.send(ans);
  } catch (error) {
    console.log(error);
  }
});

//product data

app.get("/product", verifytoken, async (req, resp) => {
  try {
    let data = await dbconnect_product();
    let result = await data.find().toArray();
    resp.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

app.post("/uploads",verifytoken,async (req, res) => {
  let data = await dbconnect_product();
  let result = await data.insertOne(req.body);
  res.send(req.body);
});

app.get("/product/:_id", verifytoken, async (req, resp) => {
  let data = await dbconnect_product();
  let result = await data.find().toArray();
  let ans = [];
  for (let i = 0; i < result.length; i++) {
    if (result[i]._id == req.params._id) {
      ans.push(result[i]);
      break;
    }
  }
  resp.send(ans);
});

app.get("/product/search/:key", verifytoken, async (req, resp) => {
  let data = await dbconnect_product();
  let result = await data
    .find({
      $or: [
        { product_type: { $regex: req.params.key } },
        { product_name: { $regex: req.params.key } },
        { price: { $regex: req.params.key } },
        { offer: { $regex: req.params.key } },
        { rating: { $regex: req.params.key } },
      ],
    })
    .toArray();
  resp.send(result);
});

app.put("/product/:id",verifytoken, async (req, res) => {
  let data = await dbconnect_product();
  //let nums = await data.findOne({ _id: new mongoose.mongo.BSON.ObjectId(req.params.id) })
  try {
    let result = await data.updateOne(
      { _id: new mongoose.mongo.BSON.ObjectId(req.params.id) },
      { $set: { total_number_of_product: req.body.product_count } }
    );
    if (result.acknowledged) {
      res.send({
        message: "SuccessFully Added",
      });
    } else {
      res.send({ Message: "We Find Some Error" });
    }
  } catch {
    console.log("Error");
  }
});

app.put("/RaingUpdateIntoProduct/:id",verifytoken, async (req, res) => {
  let data = await dbconnect_product();
  try {
    let result = await data.updateOne(
      { _id: new mongoose.mongo.BSON.ObjectId(req.params.id) },
      {
        $set: {
          rating: req.body.rating,
          number_of_people_give_rating: req.body.number_of_people_give_rating,
        },
      }
    );
    if (result.acknowledged) {
      res.send({
        message: "SuccessFully Added",
      });
    } else {
      res.send({ Message: "We Find Some Error" });
    }
  } catch {
    console.log("Error");
  }
});

//user data

app.get("/",verifytoken, async (req, res) => {
  let data = await dbconnect();
  let result = await data.find().toArray();
  res.send(result);
});

app.get("/usermail/:email", async (req, res) => {
  let data = await dbconnect();
  let result = await data.find({ email: req.params.email }).toArray();
  if (result.length != 0) {
    res.send({ message: true });
  } else {
    res.send({ message: false });
  }
});

app.post("/register", async (req, resp) => {
  let data = await dbconnect();
  let result = await data.insertOne(req.body);
  let user=req.body
  if (result.acknowledged) 
  {
    Jwt.sign({ user }, jwtKey, (error, token) => {
      if (error) 
      {
        resp.send({ message: "We find some error" });
      }
      resp.send({ user, auth: token });
    });
  } 
  else 
  {
    resp.send("user no found");
  }
    // Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (error, token) => {
});

app.patch("/login", async (req, resp) => {
  if (req.body.email && req.body.password) {
    let data = await dbconnect();
    let user = await data.findOne(req.body);
    if (user) {
      Jwt.sign({ user }, jwtKey, (error, token) => {
        if (error) {
          resp.send({ message: "We find some error" });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send("user no found");
    }
  } else {
    resp.send("user not found");
  }
});

app.get("/user/:_id",verifytoken, async (req, resp) => {
  let data = await dbconnect();
  let result = await data.find().toArray();
  let ans = [];
  for (let i = 0; i < result.length; i++) {
    if (result[i]._id == req.params._id) {
      ans.push(result[i]);
      break;
    }
  }
  resp.send(ans);
});

app.put("/user/:_id",verifytoken, async (req, res) => {
  try {
    let data = await dbconnect();
    let result = await data.updateOne(
      { email: req.body.email },
      { $set: { name: req.body.name, address: req.body.address } }
    );
    let user = await data.findOne({ _id: new mongoose.mongo.BSON.ObjectId(req.params._id) })
    if (user && result.acknowledged) 
    {
      Jwt.sign({ user }, jwtKey, (error, token) => {
        if (error) {
          res.send({ message: "We find some error" });
        }
        res.send({ user, auth: token });
      });
    } 
    else 
    {
      res.send("user no found");
    }
  } catch {
    console.log("Error");
  }
});

// const UserSchema=new mongoose.Schema({
//     name:String,
//     email:String,
//     password:String
// })

// const ProductSchema=new mongoose.Schema({

//     name:String,
//     brand:String,
//     catagory:String,
//     user_id:String
// })

// app.get('/images',async(req,res)=>{
//     let data = await dbconnect_product();
//     let result = await data.find().toArray();
//     res.send(result);
// })

// app.post('/product',async(req,resp)=>{
//     let data=await dbconnect_product()
//     let result=await data.insertOne(req.body)
//     if(result.acknowledged==true)
//        resp.send("succesfully addred")
//     else resp.send("Faild to added ")
// })

function verifytoken(req, res, next) {
  let token = req.headers["auth"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (error, valid) => {
      if (error) {
        res.status(401).send({ status: "498", mess: "Invalid Token" });
      } else {
        next();
      }
    });
  } else {
    res.status(498).send({ status: 498, mess: "Invalid Token" });
  }
}

app.listen(5000);
