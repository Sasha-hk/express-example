'use strict'

module.exports = (sequelize, DataTypes) => {
    const UserModel = sequelize.define(
        'User', 
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
            }
        }, 
        {
            timestamp: false
        }
    );

    return UserModel;
};