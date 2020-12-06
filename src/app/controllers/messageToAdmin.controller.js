const MessageService = require('../services/message.service');
const UserMessageService = require('../services/user.message.service');
const Socket = require('../../socket');

class MessageController {
  async store(request, response) {
    const { content } = request.body;
    const userId = request.userId;

    try {
      const message = await MessageService.createMessage(userId, content);

      const userMessageData = {
        senderId: userId,
        messageId: message.id,
        senderIsAdmin: false,
        recipientIsAdmin: true,
      }; 

      const userMessage = await UserMessageService.createUserMessage(userMessageData);
      userMessage.message = message;

      Socket.sendMessageToAdmins(userMessage);
      
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
}

module.exports = new MessageController();