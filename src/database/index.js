const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');

const Message = require('../app/models/message.model');
const UserMessage = require('../app/models/user.message.model');

const models = [
  Message,
  UserMessage,
];

class Database{
  constructor(){
    this.init();
  }
 
  init(){
    this.connection = new Sequelize(databaseConfig.url, databaseConfig.options);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

module.exports = new Database();