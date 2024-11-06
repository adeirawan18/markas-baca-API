
const express = require("express");
const testRoutes = require("./test_routes");
const bookRoutes = require("./bookRoutes");
const authorRoutes = require("./authorRoutes");
const categoryRoutes = require("./categoryRoutes");
const borrowerRoutes = require("./borrowerRoutes");
const borrowRoutes = require("./borrowRoutes");

const routes = express.Router();


routes.use(testRoutes);
routes.use(bookRoutes);
routes.use(authorRoutes);
routes.use(categoryRoutes);
routes.use(borrowerRoutes);
routes.use(borrowRoutes);

module.exports = routes;
