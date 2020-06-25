const bodyParser = require("body-parser");
const helmet = require("helmet");

module.exports = app => {
  app.use(bodyParser.json());
  app.use(helmet());
};
