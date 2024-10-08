const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { time } = require("console");
const { type } = require("os");
const Promotion = require("./PromotionsModel");

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[\p{L}\s]+$/u.test(v);
      },
      message: (props) => `${props.value} is not a valid last name!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(v);
      },
      message: (props) =>
        `Password must contain at least 8 characters, including uppercase, lowercase letters and numbers!`,
    },
  },
  img_avatar_url: {
    type: String,
    default:
      "https://res.cloudinary.com/df44phxv9/image/upload/v1718237515/PRO2052/frx8qlue8l1xjfiqty6k.png",
  },
  role: {
    type: String,
    enum: ["staff", "client", "admin"],
    required: true,
    default: "client",
  },
  verificationCode: {
    type: String,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  reputationPoints: {
    type: Number,
    default: 0,
  },

  promotionsRedeemed: [
    {
      promotionId: {
        type: mongoose.Schema.ObjectId,
        ref: "Promotion",
        required: true,
      },

      promotionCode: {
        type: String,
        required: true,
      },

      version: { type: Number, required: true },

      usageCount: {
        type: Number,
        default: 0,
      },

      redeemedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  passwordChangedAt: Date,

  passwordResetToken: String,

  passwordResetExpires: Date,

  passwordResetCode: String,

  passwordResetCodeExpires: Date,

  FCMTokens: {
    type: String,
    default: "",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.createPasswordResetCode = function () {
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

  this.passwordResetCode = resetCode;

  this.passwordResetCodeExpires = Date.now() + 10 * 60 * 1000;

  return resetCode;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
