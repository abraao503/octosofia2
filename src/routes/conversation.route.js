const { Router } = require('express');
const conversationController = require('../app/controllers/conversation.controller');

const conversationRouter = Router();

conversationRouter.get('/', conversationController.index);

module.exports = conversationRouter; 