const UserMessage = require('../models/user.message.model');
const { Op } = require("sequelize");
const Message = require('../models/message.model');
const ConversationService = require('./conversation.service');

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

    if(!senderIsAdmin){
      await ConversationService.createOrUpdateConversation(senderId);
    }

    return userMessage.toJSON();
  }

  async getUserMessages(userId, limit, startDate) {
    const messages = await UserMessage.findAll({
      where: { 
        [Op.or]: [
          { sender_id: userId }, { recipient_id: userId }
        ],
        createdAt: {
          [Op.lt]: startDate,
        },
      },
      include: {
        model: Message, 
        as: 'message'
      },
      order: [
        ['createdAt', 'desc']
      ],
      limit,
    })

    return messages;
  }

  async getAdminMessages(userId, limit, startDate) {
    const messages = await UserMessage.findAll({
      where: { 
        [Op.or]: [
          { sender_id: userId }, 
          { recipient_id: userId }
        ],
        createdAt: {
          [Op.lt]: startDate,
        },
      },
      include: {
        model: Message,
        as: 'message'
      },
      order: [
        ['createdAt', 'desc']
      ],
      limit,
    })

    return messages;
  }
}


module.exports = new UserMessageService();