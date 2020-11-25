const { Router } = require('express');

const messageRouter = require('./message.route');

const routes = Router();

routes.use('/messages/', messageRouter);

module.exports = routes;