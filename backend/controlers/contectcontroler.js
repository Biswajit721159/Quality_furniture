let { ApiResponse } = require("../utils/ApiResponse.js");
let contact = require('../models/contact_models.js');

const addContactInfo = async (req, res) => {
    try {
        let { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res
                .status(400)
                .json(new ApiResponse(400, null, "some parameter is missing"));
        }
        else {
            let newcontact = await contact.create(req.body)
            if (newcontact._id) {
                return res
                    .status(201)
                    .json(new ApiResponse(201, null, "Successfully submited"));
            } else {
                return res
                    .status(500)
                    .json(new ApiResponse(500, null, "something goes wrong!"));
            }
        }
    } catch (error) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "something goes wrong!"));
    }
}

module.exports = { addContactInfo }
