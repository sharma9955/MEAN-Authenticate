const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let userschema = new mongoose.Schema({
  fullname: { type: String },
  email: { type: String },
  password: {type: String,},
  saltsecret: { type: String },
});

userschema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltsecret = salt;
      next();
    });
  });
});

userschema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userschema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

mongoose.model("User", userschema);
