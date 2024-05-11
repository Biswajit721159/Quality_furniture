let Router = require("express");
const router = Router();
let verifytoken = require('../middlewares/verifiedToken')
let { AddFavouriteJourney,
    RemoveFavouriteJourney,
    GetFavouriteJourneyByemail, } = require('../controlers/Wishlistcontroler')

router.route('/AddFavouriteJourney/:product_id').post(verifytoken, AddFavouriteJourney);
router.route('/RemoveFavouriteJourney/:product_id').delete(verifytoken, RemoveFavouriteJourney);
router.route('/GetFavouriteJourneyByemail/:email').get(verifytoken, GetFavouriteJourneyByemail);



module.exports = router;