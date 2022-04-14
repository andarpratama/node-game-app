const routes = require("express").Router()
const homeController = require('../controllers/home.controller')
const authRoutes = require("./auth.route");
const userRoutes = require('./user.route');
const errHanddler = require('../middlewares/errorHanddler');


routes.get("/", homeController.home);
routes.get("/author", homeController.author);
routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use(errHanddler)

module.exports = routes;