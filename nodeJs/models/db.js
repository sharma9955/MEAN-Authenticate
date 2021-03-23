const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (!err) {
      console.log("MongoBD successfully connected");
    } else {
      console.log("error" + JSON.stringify(err, undefined, 2));
    }
  }
);

require("./usermodel");
