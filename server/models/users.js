const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const { Schema, model } = mongoose;

const userSchema = new Schema({
  id: {
    type: Number,
    required: false,
  },
  firstName: {
    type: String,
    required: [true, "User needs a first name."],
  },
  lastName: {
    type: String,
    required: [true, "User needs a last name."],
  },
  username: {
    type: String,
    required: [true, "User needs a username."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User needs a password."],
    minlength: 6,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  stripe_data: {
    stripe_location_id: {
      type: String,
      required: true,
      default: "tml_FDqTIgnlajdmGs",
    },
    stripe_reader_id: {
      type: String,
      required: true,
      default: "tmr_FD0uvQNycDMoY3",
    },
  },
});

userSchema.statics.generateTokenAsync = function (user, expiresIn) {
  return new Promise((resolve, reject) => {
    jwt.sign(user, process.env.JWT_SECRET, { expiresIn }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

userSchema.statics.verifyTokenAsync = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};

userSchema.pre("save", function (next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(SALT_ROUNDS, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }
          user.password = hash;
          next();
        });
      }
    });
  } else {
    next();
  }
});
const User = model("User", userSchema);
module.exports = User;
