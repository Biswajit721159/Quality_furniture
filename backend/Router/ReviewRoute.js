let Router = require("express");
let verifytoken = require("../middlewares/verifiedToken");

let { informationById,ReviewInsert } = require("../controlers/Reviewscontrolers");

const router = Router();

router.route("/:product_id").get(verifytoken, informationById);
router.route('/').post(verifytoken,ReviewInsert);
module.exports = router;
