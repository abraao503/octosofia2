const { Router } = require('express');
const messageToUserController = require('../app/controllers/messageToUser.controller');
const { messageToUserValidation } = require('../app/validation/message.validation');

const messageRouter = Router();

messageRouter.post('/', messageToUserValidation, messageToUserController.store);

messageRouter.get('/:userId', messageToUserController.show);

module.exports = messageRouter; 