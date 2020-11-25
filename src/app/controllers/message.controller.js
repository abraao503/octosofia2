const MessageService = require('../services/message.service');
const UserMessageService = require('../services/user.message.service');
const Socket = require('../../socket');

class MessageController {
  async store(request, response) {
    const { recipientId, content } = request.body;
    const userId = request.userId;

    try {
      const message = await MessageService.createMessage(userId, content);
      const userMessage = await UserMessageService.createUserUserMessage(userId, recipientId, message.id);
      userMessage.message = message;

      Socket.sendMessage(recipientId, userMessage);
      
      return response.json(userMessage);
    } catch(err) {
      console.error(err);
      return response.status(500).json({error: 'Internal server error.'});
    }
  }

  async index(request, response) {
    const userId = request.userId;

    try {
      const messages = await UserMessageService.getUserMessages(userId);
      
      return response.json(messages);
    } catch(err) {
      console.error(err);
      return response.status(500).json({error: 'Internal server error.'});
    }
  }

  //somentes admins deveriam acessar, necessario configurar
  async show(request, response) {
    const { userId } = request.params;

    try {
      const messages = await UserMessageService.getUserMessages(userId);
      
      return response.json(messages);
    } catch(err) {
      console.error(err);
      return response.status(500).json({error: 'Internal server error.'});
    }
  }
}

module.exports = new MessageController();