var env = process.env.NODE_ENV || "development";

var config = require("./config.json");
var envconfig = config[env];
Object.keys(envconfig).forEach((key) => (process.env[key] = envconfig[key]));
