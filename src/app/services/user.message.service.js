const UserMessage = require('../models/user.message.model');
const { Op } = require("sequelize");
const Message = require('../models/message.model');

class UserMessageService {
  async createUserMessage({
    senderId,
    recipientId,
    messageId,
    senderIsAdmin,
    recipientIsAdmin
  }) {
    const userMessage = await UserMessage.create({
      sender_id: senderId,
      recipient_id: recipientId,
      message_id: messageId,
      sender_is_admin: senderIsAdmin,
      recipient_is_admin: recipientIsAdmin,
    });

    return userMessage.toJSON();
  }

  async getUserMessages(userId) {
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
  }

  async getAdminMessages(userId) {
    const messages = await UserMessage.findAll({
      where: { 
        [Op.or]: [
          { sender_id_admin: true }, 
          { recipient_is_admin: true }
        ],
        [Op.or]: [
          { sender_id: userId }, 
          { recipient_id: userId }
        ],
      },
      include: {
        model: Message,
        as: 'message'
      },
      order: [
        ['createdAt', 'asc']
      ],
    })

    return messages;
  }
}


module.exports = new UserMessageService();