const Conversation = require('../models/conversation.model');

class ConversationService {
  async listConversation() {
    const conversation = await Conversation.findAll({
      order: [
        ['updatedAt', 'asc']
      ],
    });

    return conversation;
  }

  async createConversation(userId) {
    const conversationExists = await Conversation.findOne({
      where: { user_id: userId }
    });

    if(!conversationExists){
      const conversation = await Conversation.create({
        user_id: userId,
      });

      return conversation;
    }
  }
}


module.exports = new ConversationService();