const MessageService = require('../services/message.service');
const UserMessageService = require('../services/user.message.service');

class MessageController {
  async store(request, response) {
    const { senderId, recipientId, content } = request.body;

    try {
      const message = await MessageService.createMessage(senderId, content);
      const userMessage = await UserMessageService.createUserUserMessage(senderId, recipientId, message.id);
      
      return response.json({message, userMessage});
    } catch(err) {
      return response.status(500).json({error: 'Internal server error.'});
    }
  }

  async show(request, response) {
    const { userId } = request.params;

    try {
      const messages = await UserMessageService.getUserMessages(userId);
      
      return response.json(messages);
    } catch(err) {
      return response.status(500).json({error: 'Internal server error.'});
    }
  }
}

module.exports = new MessageController();