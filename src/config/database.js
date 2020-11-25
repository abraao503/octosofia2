require('dotenv').config();

module.exports = {
  url: process.env.DATABASE_URL,
  options: {
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    }
  }
};
