const { Router } = require('express');

const auth = require('../app/middlewares/auth.middleware');
const userIsAdmin = require('../app/middlewares/userIsAdmin.middleware');
const messageToAdminRouter = require('./messageToAdmin.route');
const messageToUserRouter = require('./messageToUser.route');

const routes = Router();

routes.use(auth);
routes.use('/users/messages/', messageToAdminRouter);

routes.use(userIsAdmin);
routes.use('/admins/messages/', messageToUserRouter);

module.exports = routes;