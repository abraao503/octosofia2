const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class UserMessage extends Model {
  static init(sequelize){
    super.init(
      {
        sender_id: Sequelize.INTEGER,
        recipient_id: Sequelize.INTEGER,
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models){
    this.belongsTo(models.Message, { foreignKey: 'message_id', as: 'message' });
  }
}

module.exports = UserMessage;
