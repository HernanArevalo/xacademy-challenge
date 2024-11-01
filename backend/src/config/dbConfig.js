const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fifa_local', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

const initializeDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la DB establecida');
    // const { Player } = require('../models')
    await sequelize.sync({ force: false });
  } catch (error) {
    console.error('Error inicializando la DB', error);
  }
};

module.exports = { sequelize, initializeDB };
