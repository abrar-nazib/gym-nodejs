const dashboardRoute = require("./dashboardRoute");
const uploadRoute = require("./uploadRoute");
const exerciseRoute = require("../api/routes/exerciseRoute");
const authRoute = require("./authRoute");

const routes = [
  {
    path: "/dashboard",
    handler: dashboardRoute,
  },
  {
    path: "/uploads",
    handler: uploadRoute,
  },
  {
    path: "/auth",
    handler: authRoute,
  },
  {
    path: "/api/exercises",
    handler: exerciseRoute,
  },
  {
    path: "/",
    handler: (req, res) => {
      res.json({
        message: "Server Running",
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
