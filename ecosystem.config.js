const fs = require("fs");

const SERVER_CERT = fs.readFileSync(__dirname + "/config/server.cert", "utf8");
const SERVER_KEY = fs.readFileSync(__dirname + "/config/server.key", "utf8");

module.exports = {
  apps: [
    {
      name: "node-is-simple",
      script: "./index.js",
      watch: true,
      args: ["--color"],
      env: {
        NODE_ENV: "development",
        SERVER_CERT,
        SERVER_KEY,
        HTTP_PORT: 8080,
        HTTPS_PORT: 8081,
        MONGO_URI: "mongodb://localhost/students",
        JWT_SECRET: "this_must_be_a_super_secret",
        SIGN_ALGORITHM: "HS256",
        TOKEN_ISSUER: "NIS_SERVER",
        JWT_EXPIRES_IN: "1h",
        VERIFY_ALGORITHM: ["HS256"]
      }
    }
  ]
};
