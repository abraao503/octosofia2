const { Router } = require('express');

const auth = require('../app/middlewares/auth.middleware');
const messageRouter = require('./message.route');

const routes = Router();

routes.use(auth);
routes.use('/messages/', messageRouter);

module.exports = routes;