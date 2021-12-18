const { sequelize, User } = require('./models/')
const vars = require('./config/variables')
var colors = require('colors')
const env = process.env.NODE_ENV || 'development'


module.exports = async function connect() {
    if (vars.ALIAS_DEVELOPMENT.includes(env)) {
        await sequelize.sync({  
            alter: true,
            logging: false
        })
    }
    else if (vars.ALIAS_PRODUCTION.includes(env)) {
        await sequelize.connect()
    }
    else if (vars.ALIAS_TEST.includes(env)) {
        await sequelize.sync({
            loggin: false
        })
    }
    console.log('[server]'.green, 'Connected to database!')
}
