const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class Message extends Model {
  static init(sequelize){
    super.init(
      {
        user_id: Sequelize.INTEGER,
        content: Sequelize.TEXT,
      },
      {
        sequelize
      }
    );

    return this;
  }
}

module.exports = Message;
