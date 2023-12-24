let Router = require("express");
let verifytoken = require("../middlewares/verifiedToken");
let upload = require("../middlewares/multermiddlemare");
let {
  getFullProduct,
  productInsert,
  informationById,
  searchProduct,
  Update_total_number_of_product,
  Update_RaingUpdateIntoProduct,
  find_get_product_by_ids,
  getproductUponPrice,
  getallProductType,
} = require("../controlers/productcontrolers");

const router = Router();

router.route("/").get(verifytoken, getFullProduct);
router.route("/:_id").get(verifytoken,informationById);
router.route("/search/:key").get(verifytoken,searchProduct);
router.route("/total_number_of_product/:_id").put(verifytoken,Update_total_number_of_product);
router.route("/RaingUpdateIntoProduct/:_id").put(verifytoken,Update_RaingUpdateIntoProduct);
router.route("/get_product_by_ids").patch(verifytoken,find_get_product_by_ids);
router.route('/getProductUponPrice/:low/:high/:catagory').get(getproductUponPrice);
router.route('/Catagory/getallCatagory').get(verifytoken,getallProductType);

router.route("/uploads").post(verifytoken,upload.fields([
  {
      name: "firstimg",
      maxCount: 1
  },
  {
      name: "secondimg",
      maxCount: 1
  },
  {
      name: "thirdimg",
      maxCount: 1
  },
]), productInsert);


module.exports = router;
