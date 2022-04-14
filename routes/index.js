const routes = require("express").Router()
const homeController = require('../controllers/home.controller')
const authRoutes = require("./auth.route");


routes.get("/", homeController.home);
routes.get("/author", homeController.author);
routes.use("/auth", authRoutes);

module.exports = routes;