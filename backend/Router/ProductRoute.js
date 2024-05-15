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
  getproductUponPriceProductTypeAndProductName,
  getproductByType,
  TopOfferProduct,
  countNumberProduct,
  getproductByLimit,
  ProductUpdate,
} = require("../controlers/productcontrolers");

const router = Router();

router.route("/").get(getFullProduct);
router.route("/:_id").get(verifytoken, informationById);
router.route("/search/:key").get(verifytoken, searchProduct);
router.route("/total_number_of_product/:_id").put(verifytoken, Update_total_number_of_product);
router.route("/RaingUpdateIntoProduct/:_id").put(verifytoken, Update_RaingUpdateIntoProduct);
router.route("/get_product_by_ids").patch(verifytoken, find_get_product_by_ids);
router.route('/getProductUponPrice/:low/:high/:catagory').get(verifytoken, getproductUponPrice);
router.route('/getproductUponPriceProductTypeAndProductName/:low/:high/:catagory/:product_name/:LowerLimit/:HighLimit').post(verifytoken, getproductUponPriceProductTypeAndProductName);
router.route('/Catagory/getallCatagory').get(getallProductType);
router.route('/getproductByType/:product_type').get(getproductByType);
router.route('/TopOfferProduct/:numberofProduct').get(TopOfferProduct);
router.route('/Dashboard/findcountNumberProduct').get(verifytoken, countNumberProduct);
router.route('/getproductByLimit/:LowerLimit/:HighLimit').get(verifytoken, getproductByLimit);
router.route("/uploads").post(verifytoken, productInsert);
router.route('/ProductUpdate/:_id').put(ProductUpdate);


module.exports = router;
