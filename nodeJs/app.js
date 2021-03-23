require("./config/config");
require("./models/db");
require("./config/passportconfig");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const routesindex = require("./routes/indexRoutes");

let app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use("/api", routesindex);

app.listen(process.env.PORT, () =>
  console.log(`server started at port :${process.env.PORT} `)
);
