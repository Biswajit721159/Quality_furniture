let Router = require("express");
let verifytoken = require("../middlewares/verifiedToken");
let {
    orderInsert,
    orderGetByEmail,
    informationById,
    updateFeedback,
    getorderByLimit,
    countNumberOrder,
    getAllOrder,
} = require("../controlers/ordercontrolers");

const router = Router();

router.route("/").post( orderInsert);
router.route("/getByEmail/:email").get(verifytoken, orderGetByEmail);
router.route("/getById/:_id").get(verifytoken, informationById);
router.route('/updateFeedback/:_id').put(verifytoken,updateFeedback);
router.route('/getorderByLimit/:lowerLimit/:upperLimit/:email').get(verifytoken,getorderByLimit);
router.route('/Dashboard/countNumberOrder').get(verifytoken,countNumberOrder);
router.route('/getproductByLimit/:LowerLimit/:HighLimit').get(getAllOrder);

module.exports = router;