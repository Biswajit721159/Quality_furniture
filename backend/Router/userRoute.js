let Router = require("express");
let {
  register,
  loginUser,
  getinfromationByEmail,
  getinfromationById,
  updateNameAddress,
  countNumberUser,
  getAlluser,
  searchNameAndEmail
} = require("../controlers/usercontrolers");

let verifytoken = require('../middlewares/verifiedToken')

const router = Router();

router.route("/searchNameAndEmail/:searchValue/:LowerLimit/:HighLimit").get(searchNameAndEmail);
router.route("/register").post(register);
router.route("/login").patch(loginUser);
router.route("/usermail/:email").get(verifytoken, getinfromationByEmail);
router.route("/informationbyID/:_id").get(verifytoken, getinfromationById);
router.route("/updateAddressAndName/:_id").put(verifytoken, updateNameAddress);
router.route('/Dashboard/countNumberUser').get(verifytoken, countNumberUser);
router.route("/getUserByLimit/:LowerLimit/:HighLimit").get(verifytoken, getAlluser);
// router.route("/logout").post(verifyJWT,  logoutUser)

module.exports = router;
