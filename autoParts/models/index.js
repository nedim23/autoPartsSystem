"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");

var config = require('../config/configuration');
var CONNSTR = config.postgres.connectionString;

var sequelize = new Sequelize(CONNSTR, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: false
    }
});

var db = {};

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        console.log('import model: ' + file)
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

