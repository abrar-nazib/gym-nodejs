const apiRoute = require("../api/routes/apiRoutes");

const routes = [
  {
    path: "/api",
    handler: apiRoute,
  },
  {
    path: "/",
    handler: (req, res) => {
      res.json({
        message: "Server running",
      });
    },
  },
];

module.exports = (app) => {
  routes.forEach((route) => {
    if (route.path === "/") {
      app.get(route.path, route.handler);
    } else {
      app.use(route.path, route.handler);
    }
  });
};
