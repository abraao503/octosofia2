const Message = require('../models/message.model');

class MessageService {
  async createMessage(userId, content) {
    try {
      const message = await Message.create({
        user_id: userId,
        content
      });

      return message;
    } catch(err){
      console.error(err);
    }
  }
}

module.exports = new MessageService();