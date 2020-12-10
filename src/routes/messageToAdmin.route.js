const { Router } = require('express');
const messageToAdminController = require('../app/controllers/messageToAdmin.controller');
const { messageToAdminValidation } = require('../app/validation/message.validation');
const { listMessagesValidation } = require('../app/validation/listMessages.validation');

const messageRouter = Router();

messageRouter.post('/', messageToAdminValidation, messageToAdminController.store);

messageRouter.get('/', listMessagesValidation, messageToAdminController.index);

module.exports = messageRouter; 