const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class Conversation extends Model {
  static init(sequelize){
    super.init(
      {
        user_id: Sequelize.INTEGER,
        last_interaction: {
          type: Sequelize.DATE,
          defaultValue: new Date(),
        }
      },
      {
        sequelize
      }
    );

    return this;
  }
}

module.exports = Conversation;
