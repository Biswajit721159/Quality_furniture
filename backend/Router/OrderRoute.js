let Router = require("express");
let verifytoken = require("../middlewares/verifiedToken");
let {
    orderInsert,
    orderGetByEmail,
    informationById
} = require("../controlers/ordercontrolers");

const router = Router();

router.route("/").post(verifytoken, orderInsert);
router.route("/getByEmail/:email").get(verifytoken, orderGetByEmail);
router.route("/getById/:_id").get(verifytoken, informationById);


module.exports = router;