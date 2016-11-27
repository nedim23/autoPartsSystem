"use strict"

module.exports = function(sequelize, DataTypes) {
    var project = sequelize.define("project", {
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
        }
    }, {
        tableName: 'project',
        schema: 'public'
    });

    return project;
};
