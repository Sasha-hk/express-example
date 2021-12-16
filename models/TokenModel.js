'use strict';


module.exports = (sequelize, DataTypes) => {
    const TokenModel = sequelize.define('Token', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        refresh_token: {
            type: DataTypes.STRING,
        },
    }, {});

    TokenModel.associate = function(models) {
        TokenModel.hasMany(models.UserModel, {
            as: 'user_id',
            foreignKey: 'id'
        })
    };

    return TokenModel;
};