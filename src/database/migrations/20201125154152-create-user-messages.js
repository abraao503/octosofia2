module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_messages', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      sender_is_admin: Sequelize.BOOLEAN,
      sender_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      recipient_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      recipient_is_admin: Sequelize.BOOLEAN,
      message_id: {
        type: Sequelize.INTEGER,
        references: { model: 'messages', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('user_messages');
  }
};
