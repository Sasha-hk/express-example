'use strict';

const UserModel = require('./UserModel');

module.exports = (sequelize, DataTypes) => {
    const TokenModel = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        refresh_token: {
            type: DataTypes.STRING,
        },
        // user_id: {
        //     model: 'User',
        //     key: 'id',
        // }
    }, {});

    TokenModel.associate = function(models) {
        TokenModel.hasMany(models.UserModel, {
            as: 'user_id',
            foreignKey: 'id'
        })
    };

    return TokenModel;
};