let Router = require("express");
let { addContactInfo } = require("../controlers/contectcontroler");
const router = Router();

router.route('/addContactInfo').post(addContactInfo)

module.exports = router;