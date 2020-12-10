const ConversationService = require('../services/conversation.service');

class ConversationController {
  async index(request, response) {
    const { 
      limit = 20, 
      olderThan = new Date(),
    } = request.query;

    try {
      const conversations = await ConversationService.listConversation(limit, olderThan);
      
      return response.json(conversations);
    } catch(err) {
      console.error(err);
      return response.status(500).json({error: 'Internal server error.'});
    }
  }
}

module.exports = new ConversationController();