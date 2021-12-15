const UserModel = require('./UserModel')
const Sequelize = require('sequelize')


const TokenModel = Sequelize.define('token', {
    user_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        reference: {
            model: UserModel,
            key: 'id',
        }
    }
})


module.exports = TokenModel
