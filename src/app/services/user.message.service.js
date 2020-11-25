const UserMessage = require('../models/user.message.model');
const { Op } = require("sequelize");
const Message = require('../models/message.model');

class UserMessageService {
  async createUserUserMessage(senderId, recipientId, messageId) {
    try {
      const userMessage = await UserMessage.create({
        sender_id: senderId,
        recipient_id: recipientId,
        message_id: messageId,
      });

      return userMessage;
    } catch(err){
      console.error(err);
    }
  }

  async getUserMessages(userId) {
    try {
      const messages = await UserMessage.findAll({
        where: { [Op.or]: [{ sender_id: userId }, { recipient_id: userId }] },
        include: {
          model: Message,
          as: 'message'
        },
        order: [
          ['createdAt', 'asc']
        ],
      })

      return messages;
    } catch(err){
      console.error(err);
    }
  }
}


module.exports = new UserMessageService();