let Router = require("express");
let verifytoken = require("../middlewares/verifiedToken");
let {Add_To_Cart,Remove_To_Cart,GetCart} =require('../controlers/cartcontrolter')


const router = Router();

router.route('/Add_To_Cart').post(verifytoken,Add_To_Cart)
router.route('/Remove_To_Cart').delete(verifytoken,Remove_To_Cart)
router.route('/GetCart').get(verifytoken,GetCart)


module.exports = router;

