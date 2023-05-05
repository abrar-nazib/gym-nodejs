// config dotenv
require("dotenv").config();

// import dependencies
const express = require("express");
const config = require("config"); // for configuration management
const chalk = require("chalk"); // for colorful console messages
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const app = express();

// Setup view engine
app.set("view engine", "ejs");
app.set("views", "views");

const setMiddlewares = require("./middleware/middlewares");
const setRoutes = require("./routes/routes");

// Using Middlewares from middleware directory
setMiddlewares(app);

// Using Routes from routes directory
setRoutes(app);

// documentation
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Exercise API",
      description: "Exercise API for Gizantech",
      contact: {
        name: "Nazib Abrar",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
  },
  apis: ["./api/routes/*.js"],
};

const specs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//  Error handler middleware: must be at the last of all middlewares to catch all errors
app.use((req, res, next) => {
  let error = new Error("404 Page Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  if (error.status === 404) {
    res.status(404);
    return res.render("pages/error/404", {
      flashMessage: {},
    });
  }
  console.log(chalk.red.inverse(error.message));
  console.log(error);
  res.status(500);
  return res.render("pages/error/500", {
    flashMessage: {},
  });
});

// Specify port and start the server
const port = config.get("port");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
