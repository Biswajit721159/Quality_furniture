let Router = require("express");
let verifytoken = require("../middlewares/verifiedToken");
let { Register,Login } = require("../controlers/Adminpanelcontrolers");

const router = Router();

router.route("/Register").post(Register);
router.route("/Login").post(Login);

module.exports = router;
