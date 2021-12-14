import Sequelize from 'sequelize'


const UserModel = Sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    password: {
        type: Sequelize.STRING,
    }
})


export default UserModel
