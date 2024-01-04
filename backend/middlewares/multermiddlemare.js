// let multer= require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
// })
  
// const upload = multer({ 
//     storage, 
// })

// module.exports=upload

let multer= require("multer");
let fs =require("fs");

const destination = "./public/temp";

// Check if the destination directory exists, create it if not
if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
module.exports=upload