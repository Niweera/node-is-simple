const express = require("express");
const chalk = require("chalk");
const http = require("http");
const https = require("https");
const config = require("./config");

const HTTP_PORT = config.HTTP_PORT;
const HTTPS_PORT = config.HTTPS_PORT;
const SERVER_CERT = config.SERVER_CERT;
const SERVER_KEY = config.SERVER_KEY;

const app = express();
const Middleware = require("./middleware");
const MainController = require("./controllers");

Middleware(app);
app.use("", MainController);
app.set("port", HTTPS_PORT);

/**
 * Create HTTPS Server
 */

const server = https.createServer(
  {
    key: SERVER_KEY,
    cert: SERVER_CERT
  },
  app
);

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind =
    typeof HTTPS_PORT === "string"
      ? "Pipe " + HTTPS_PORT
      : "Port " + HTTPS_PORT;

  switch (error.code) {
    case "EACCES":
      console.error(chalk.red(`[-] ${bind} requires elevated privileges`));
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(chalk.red(`[-] ${bind} is already in use`));
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(chalk.yellow(`[!] Listening on HTTPS ${bind}`));
};

server.listen(HTTPS_PORT);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Create HTTP Server (HTTP requests will be 301 redirected to HTTPS)
 */
http
  .createServer((req, res) => {
    res.writeHead(301, {
      Location:
        "https://" +
        req.headers["host"].replace(
          HTTP_PORT.toString(),
          HTTPS_PORT.toString()
        ) +
        req.url
    });
    res.end();
  })
  .listen(HTTP_PORT)
  .on("error", onError)
  .on("listening", () =>
    console.log(chalk.yellow(`[!] Listening on HTTP port ${HTTP_PORT}`))
  );

module.exports = app;
