const routes = require("express").Router()
const homeController = require('../controllers/home.controller')

routes.get("/", homeController.home);
routes.get("/author", homeController.author);

module.exports = routes;