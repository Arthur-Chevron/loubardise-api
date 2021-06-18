const dbConfig = require("./config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Dechets = db.dechets = require("./model.js")(sequelize, Sequelize)

db.sequelize.sync();

Dechets.create({
    urlfile : 'https://i.redd.it/npz0ul214cg61.jpg',
    latitude : '48.8062102',
    longitude : '2.360018',
    typedechets : 'pepi',
    See : true
})

module.exports = db