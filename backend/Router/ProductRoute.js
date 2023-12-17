let Router = require("express");
let verifytoken = require("../middlewares/verifiedToken");
let {
  getFullProduct,
  productInsert,
  informationById,
  searchProduct,
  Update_total_number_of_product,
  Update_RaingUpdateIntoProduct,
} = require("../controlers/productcontrolers");

const router = Router();

router.route("/").get(verifytoken, getFullProduct);
router.route("/uploads").post(verifytoken, productInsert);
router.route("/:_id").get(verifytoken,informationById);
router.route("/search/:key").get(verifytoken,searchProduct);
router.route("/total_number_of_product/:_id").get(verifytoken,Update_total_number_of_product);
router.route("/RaingUpdateIntoProduct/:_id").get(verifytoken,Update_RaingUpdateIntoProduct);


module.exports = router;
