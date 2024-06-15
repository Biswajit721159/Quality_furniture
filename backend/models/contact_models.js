let mongoose = require("mongoose")
let { Schema } = require("mongoose")

const Contact = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        isdeleted: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
)
let contact = mongoose.model("contact", Contact)

module.exports = contact