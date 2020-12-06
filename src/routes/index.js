const { Router } = require('express');

const auth = require('../app/middlewares/auth.middleware');
const userIsAdmin = require('../app/middlewares/userIsAdmin.middleware');
const messageToAdminRouter = require('./messageToAdmin.route');
const messageToUserRouter = require('./messageToUser.route');
const conversationRouter = require('./conversation.route');

const routes = Router();

routes.use(auth);
routes.use('/users/messages/', messageToAdminRouter);

routes.use(userIsAdmin);
routes.use('/admins/messages/', messageToUserRouter);
routes.use('/admins/conversations/', conversationRouter);

module.exports = routes;