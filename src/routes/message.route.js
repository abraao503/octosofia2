const { Router } = require('express');
const messageController = require('../app/controllers/message.controller');

const messageRouter = Router();

messageRouter.post('/', messageController.store);
messageRouter.get('/', messageController.index);
messageRouter.get('/:userId', messageController.show);

module.exports = messageRouter; 