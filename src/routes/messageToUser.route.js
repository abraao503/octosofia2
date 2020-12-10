const { Router } = require('express');
const messageToUserController = require('../app/controllers/messageToUser.controller');
const { messageToUserValidation } = require('../app/validation/message.validation');
const { listMessagesValidation } = require('../app/validation/listMessages.validation');

const messageRouter = Router();

messageRouter.post('/', messageToUserValidation, messageToUserController.store);

messageRouter.get('/:userId', listMessagesValidation,  messageToUserController.show);

module.exports = messageRouter; 