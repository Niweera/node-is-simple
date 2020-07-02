const fs = require("fs");

const SERVER_CERT = fs.readFileSync(__dirname + "/config/server.cert", "utf8");
const SERVER_KEY = fs.readFileSync(__dirname + "/config/server.key", "utf8");

module.exports = {
  apps: [
    {
      name: "node-is-simple",
      script: "./index.js",
      watch: true,
      env: {
        NODE_ENV: "development",
        SERVER_CERT,
        SERVER_KEY,
        HTTP_PORT: 8080,
        HTTPS_PORT: 8081,
        MONGO_URI: "mongodb://localhost/students"
      }
    }
  ]
};
