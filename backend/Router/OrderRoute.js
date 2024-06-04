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
    updateOrderStatus,
    getorderByLimitAndSearchValue
} = require("../controlers/ordercontrolers");

const router = Router();

router.route("/updateOrderStatus/:_id").post(updateOrderStatus)
router.route("/").post(orderInsert);
router.route("/getByEmail/:email").get(verifytoken, orderGetByEmail);
router.route("/getById/:_id").get(verifytoken, informationById);
router.route('/updateFeedback/:_id').put(verifytoken, updateFeedback);
router.route('/getorderByLimit/:lowerLimit/:upperLimit/:email').get(verifytoken, getorderByLimit);
router.route('/Dashboard/countNumberOrder').get(verifytoken, countNumberOrder);
router.route('/getproductByLimit/:LowerLimit/:HighLimit').get(getAllOrder);
router.route('/AdminpanelOrder/:lowerLimit/:upperLimit/:searchValue').get(verifytoken, getorderByLimitAndSearchValue)

module.exports = router;