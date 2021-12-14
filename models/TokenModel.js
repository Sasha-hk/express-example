import Sequelize from 'sequence'
import UserModel from './UserModel.js'


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


export default TokenModel
