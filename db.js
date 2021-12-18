const vars = require('./config/variables')
var colors = require('colors')
require('dotenv').config()

const env = process.env.NODE_ENV || 'development'

module.exports = async function connect() {
    if (env.includes(vars.ALIAS_DEVELOPMENT)) {
        await sequelize.sync({  
            alter: true,
        })
    }
    else if (env.includes(vars.ALIAS_PRODUCTION)) {
        await sequelize.connect()
    }
    else if (env.includes(vars.ALIAS_TEST)) {
        await sequelize.sync()
    }
    console.log('[server]'.green, 'Connected to database!')
}
