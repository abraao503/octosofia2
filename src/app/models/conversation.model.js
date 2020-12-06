const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class Conversation extends Model {
  static init(sequelize){
    super.init(
      {
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize
      }
    );

    return this;
  }
}

module.exports = Conversation;
