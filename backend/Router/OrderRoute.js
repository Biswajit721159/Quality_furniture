let Router = require("express");
let verifytoken = require("../middlewares/verifiedToken");
let {
    orderInsert,
    orderGetByEmail,
    informationById,
    updateFeedback,
} = require("../controlers/ordercontrolers");

const router = Router();

router.route("/").post(verifytoken, orderInsert);
router.route("/getByEmail/:email").get(verifytoken, orderGetByEmail);
router.route("/getById/:_id").get(verifytoken, informationById);
router.route('/updateFeedback/:_id').put(verifytoken,updateFeedback);


module.exports = router;