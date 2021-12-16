'use strict';

module.exports = (sequelize, DataTypes) => {
    const TokenModel = sequelize.define(
        'Token', 
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            refresh_token: {
                type: DataTypes.STRING,
            },
        }, 
        {
            timestamp: false
        }
    );

    TokenModel.associate = function(models) {
        TokenModel.hasOne(models.User, {
            as: 'user_id',
            foreignKey: 'id'
        })
    };

    return TokenModel;
};