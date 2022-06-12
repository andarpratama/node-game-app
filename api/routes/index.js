const routes = require('express').Router();
const homeController = require('../controllers/home.controller');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const farmRoutes = require('./farms.route');
const marketRoutes = require('./markets.route');
const barrackRoutes = require('./barrack.route');
const errHanddler = require('../middlewares/errorHanddler');

routes.get('/', homeController.home);
routes.get('/author', homeController.author);
routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/farms', farmRoutes);
routes.use('/markets', marketRoutes);
routes.use('/barracks', barrackRoutes);
routes.use(errHanddler);

module.exports = routes;
