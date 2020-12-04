const MessageService = require('../services/message.service');
const UserMessageService = require('../services/user.message.service');
const Socket = require('../../socket');

class MessageController {
  async store(request, response) {
    const { recipientId, content } = request.body;
    const userId = request.userId;

    try {
      const message = await MessageService.createMessage(userId, content);

      const userMessageData = {
        senderId: userId,
        recipientId,
        messageId: message.id,
        senderIsAdmin: true,
        recipientIsAdmin: false,
      }; 

      const userMessage = await UserMessageService.createUserMessage(userMessageData);
      userMessage.message = message;

      Socket.sendMessage(recipientId, userMessage);
      
      return response.json(userMessage);
    } catch(err) {
      console.error(err);
      return response.status(500).json({error: 'Internal server error.'});
    }
  }

  async show(request, response) {
    const { userId } = request.params;

    try {
      const messages = await UserMessageService.getAdminMessages(userId);
      
      return response.json(messages);
    } catch(err) {
      console.error(err);
      return response.status(500).json({error: 'Internal server error.'});
    }
  }
}

module.exports = new MessageController();