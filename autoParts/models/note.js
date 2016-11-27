"use strict"

module.exports = function(sequelize, DataTypes) {
    var note = sequelize.define("note", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'note',
        schema: 'public'
    });

    return note;
};