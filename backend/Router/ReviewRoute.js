let Router = require("express");
let verifytoken = require("../middlewares/verifiedToken");

let {
  informationById,
  ReviewInsert,
  findReviewsBylowerAndUpperLimit,
  findRatingPersentageofProduct,
  countNumberReviews,
  exitProduct_idAndOrder_id,
  AdminpanelReview,
  AdminReviewUpdate,
  updateLikeAndDisLike,
} = require("../controlers/Reviewscontrolers");

const router = Router();
router.route('/Adninpanel/:lowerLimit/:upperLimit/:product_id').get(verifytoken, AdminpanelReview);
router.route('/updateLikeAndDisLike/:review_id').put(verifytoken, updateLikeAndDisLike);
router.route('/exitProduct_idAndOrder_id').post(verifytoken, exitProduct_idAndOrder_id);
router.route("/:product_id").get(verifytoken, informationById);
router.route("/").post(verifytoken, ReviewInsert);
router.route('/:product_id/:lowerLimit/:upperLimit/:email').get(findReviewsBylowerAndUpperLimit);
router.route('/findRatingPersentageofProduct/:product_id').get(findRatingPersentageofProduct);
router.route('/Dashboard/countNumberReviews').get(verifytoken, countNumberReviews);
router.route('/AdminReviewUpdate/:review_id').put(verifytoken, AdminReviewUpdate)

module.exports = router;
