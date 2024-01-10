let Router = require("express");
let verifytoken = require("../middlewares/verifiedToken");
let {Add_To_Cart,Remove_To_Cart} =require('../controlers/cartcontrolter')


const router = Router();

router.route('/Add_To_Cart').post(Add_To_Cart)
router.route('/Remove_To_Cart').delete(Remove_To_Cart)


module.exports = router;

