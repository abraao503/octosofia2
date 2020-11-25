const Message = require('../models/message.model');

class MessageService {
  async createMessage(userId, content) {
    const message = await Message.create({
      user_id: userId,
      content
    });

    return message;
  }
}

module.exports = new MessageService();