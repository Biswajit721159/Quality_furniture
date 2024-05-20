let Router = require("express");
let verifytoken = require("../middlewares/verifiedToken");

let {
  informationById,
  ReviewInsert,
  findReviewsBylowerAndUpperLimit,
  findRatingPersentageofProduct,
  countNumberReviews,
  exitProduct_idAndOrder_id
} = require("../controlers/Reviewscontrolers");

const router = Router();
router.route('/exitProduct_idAndOrder_id').post(verifytoken, exitProduct_idAndOrder_id)
router.route("/:product_id").get(verifytoken, informationById);
router.route("/").post(verifytoken, ReviewInsert);
router.route('/:product_id/:lowerLimit/:upperLimit').get(verifytoken, findReviewsBylowerAndUpperLimit);
router.route('/findRatingPersentageofProduct/:product_id').get(verifytoken, findRatingPersentageofProduct);
router.route('/Dashboard/countNumberReviews').get(verifytoken, countNumberReviews)

module.exports = router;
