let Router = require("express");
let verifytoken = require("../middlewares/verifiedToken");

let {
  informationById,
  ReviewInsert,
  findReviewsBylowerAndUpperLimit,
  findRatingPersentageofProduct,
} = require("../controlers/Reviewscontrolers");

const router = Router();

router.route("/:product_id").get(verifytoken, informationById);
router.route("/").post(verifytoken, ReviewInsert);
router.route('/:product_id/:lowerLimit/:upperLimit').get(verifytoken,findReviewsBylowerAndUpperLimit);
router.route('/findRatingPersentageofProduct/:product_id').get(verifytoken,findRatingPersentageofProduct);

module.exports = router;
