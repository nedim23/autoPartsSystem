"use strict"

module.exports = function(sequelize, DataTypes) {
    var contact = sequelize.define("contact", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        eMail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        company: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'contact',
        schema: 'public'
    });

    return contact;
};
