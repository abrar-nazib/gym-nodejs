const express = require("express");
const morgan = require("morgan"); // for logging requests
// const mongoose = require("mongoose"); // for database
const config = require("config"); // for configuration management

// Middlewares
const middlewares = [
  morgan("dev"),
  express.static("public"), // to serve static files from public folder
  express.urlencoded({ extended: true }), // to parse url encoded data ( required for parsing form data)
  express.json(), // to parse json data
];

module.exports = (app) => {
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
};
