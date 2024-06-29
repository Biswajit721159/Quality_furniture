const mongoose = require("mongoose");
const { Schema } = mongoose;

const InfoSchema = new Schema(
    {
        review_id: {
            type: Schema.Types.ObjectId,
            ref: "Review",
            required: true,
        },
        option: {
            type: String,
            enum: ['like', 'dislike', 'none'],
            required: true,
            default: 'none'
        },
    },
    { _id: false }
);

const LikeAndDislikeSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        info: {
            type: [InfoSchema],
            required: true
        }
    },
    {
        timestamps: true
    }
);

const LikeAndDislike = mongoose.model("LikeAndDislike", LikeAndDislikeSchema);

module.exports = LikeAndDislike;
