const { Sequelize } = require('sequelize');
const { dbUser, dbPass, dbName, dbHost, dbPort } = require("./env");

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    dialectOptions: {
        ssl: false
    }
});

module.exports = sequelize;
