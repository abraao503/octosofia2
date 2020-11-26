const { Router } = require('express');
const messageController = require('../app/controllers/message.controller');
const { createMessageValidation } = require('../app/validation/message.validation');

const messageRouter = Router();

messageRouter.post('/', createMessageValidation, messageController.store);

messageRouter.get('/', messageController.index);

messageRouter.get('/:userId', messageController.show);

module.exports = messageRouter; 