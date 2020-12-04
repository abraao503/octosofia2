const { Router } = require('express');
const messageToAdminController = require('../app/controllers/messageToAdmin.controller');
const { messageToAdminValidation } = require('../app/validation/message.validation');

const messageRouter = Router();

messageRouter.post('/', messageToAdminValidation, messageToAdminController.store);

messageRouter.get('/', messageToAdminController.index);

module.exports = messageRouter; 