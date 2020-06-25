const fs = require("fs");

const SERVER_CERT = fs.readFileSync(__dirname + "/server.cert", "utf8");
const SERVER_KEY = fs.readFileSync(__dirname + "/server.key", "utf8");

module.exports = {
  SERVER_CERT,
  SERVER_KEY,
  HTTP_PORT: 8080,
  HTTPS_PORT: 8081,
  MONGO_URI: "mongodb://localhost/students"
};
