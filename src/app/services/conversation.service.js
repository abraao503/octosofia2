const { Op } = require("sequelize");
const Conversation = require('../models/conversation.model');

class ConversationService {
  async listConversation(limit, startDate) {
    const conversation = await Conversation.findAll({
      order: [
        ['updatedAt', 'desc']
      ],
      createdAt: {
        [Op.lt]: startDate,
      },
      limit,
    });

    return conversation;
  }

  async createOrUpdateConversation(userId) {
    const conversationExists = await Conversation.findOne({
      where: { user_id: userId }
    });

    if(conversationExists){
      conversationExists.update({
        last_interaction: new Date(),
      });
      
      return;
    }

    const conversation = await Conversation.create({
      user_id: userId,
    });

    return conversation;
  }
}


module.exports = new ConversationService();