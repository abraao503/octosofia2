'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'conversations',
      'last_interaction',
      {
        type: Sequelize.DATE,
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('conversations', 'last_interaction');
  }
};