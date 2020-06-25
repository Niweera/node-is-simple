const CommonMiddleware = require("./common");

const Middleware = app => {
  CommonMiddleware(app);
};

module.exports = Middleware;
