const mongoose = require("mongoose");
const config = require("../config");
const dbPath = config.MONGO_URI;
const chalk = require("chalk");

mongoose
  .connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log(chalk.yellow("[!] Successfully connected to the database"));
  })
  .catch(err => {
    console.log(chalk.red(err.message));
  });

const db = mongoose.connection;

db.on("error", () => {
  console.log(chalk.red("[-] Error occurred from the database"));
});

db.once("open", () => {
  console.log(
    chalk.yellow("[!] Successfully opened connection to the database")
  );
});

module.exports = mongoose;
