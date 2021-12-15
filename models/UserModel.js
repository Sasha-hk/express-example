const Sequelize = require('sequelize')


const UserModel = Sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    password: {
        type: Sequelize.STRING,
    }
})


module.exports = UserModel
