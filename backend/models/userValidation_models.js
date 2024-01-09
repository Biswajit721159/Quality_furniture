const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const userValidation_models = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    OTP: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userValidation_models.pre("save", async function (next) {
  if (!this.isModified("OTP")) return next();
  this.OTP = await bcrypt.hash(this.OTP, 10);
  next();
});

userValidation_models.methods.isOTPCorrect = async function (OTP) {
  return await bcrypt.compare(OTP, this.OTP);
};

const UserValidation = mongoose.model("UserValidation", userValidation_models);

module.exports = UserValidation;
