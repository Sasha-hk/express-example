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
            tableName: 'tokens',
            freezeTableName: true,
            timestamp: false,
            createdAt: false,
            updatedAt: false,
        }
    );

    TokenModel.associate = function(models) {
        TokenModel.belongsTo(models.User, 
        {
            as: 'user',
            foreignKey: 'user_id'
        })
    };

    return TokenModel;
};