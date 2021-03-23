const passport = require("passport");
const localpassport = require("passport-local");
const mongoose = require("mongoose");

let user = mongoose.model("User");

passport.use(
  new localpassport({ usernameField: "email" }, (username, password, done) => {
    user.findOne({ email: username }, (err, user) => {
      if (err) {
        return done(err);
      } else if (!user) {
        return done(null, false, { message: "email is not registered" });
      } else if (!user.verifyPassword(password)) {
        return done(null, false, { message: "wrong password" });
      } else return done(null, user);
    });
  })
);
