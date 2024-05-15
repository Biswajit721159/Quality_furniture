let Router = require("express");
const router = Router();
let verifytoken = require('../middlewares/verifiedToken')
let { AddFavouriteJourney,
    RemoveFavouriteJourney,
    GetFavouriteJourneyByemail, } = require('../controlers/Wishlistcontroler')

router.route('/AddFavourite/:product_id').post(verifytoken, AddFavouriteJourney);
router.route('/RemoveFavourite/:product_id').delete(verifytoken, RemoveFavouriteJourney);
router.route('/GetFavouriteByemail/:email').get(verifytoken, GetFavouriteJourneyByemail);



module.exports = router;