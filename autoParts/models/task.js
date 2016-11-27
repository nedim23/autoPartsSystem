"use strict"

module.exports = function(sequelize, DataTypes) {
    var task = sequelize.define("task", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'task',
        schema: 'public'
    });

    return task;
};
