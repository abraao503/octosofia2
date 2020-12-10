const { Router } = require('express');
const conversationController = require('../app/controllers/conversation.controller');
const { listMessagesValidation } = require('../app/validation/listMessages.validation');

const conversationRouter = Router();

conversationRouter.get('/', listMessagesValidation, conversationController.index);

module.exports = conversationRouter; 