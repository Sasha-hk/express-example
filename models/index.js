const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config')[env]
const db = {}
let sequelize;


// create sequelize instance
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config) 
}
else {
    sequelize = new Sequelize(config.database, config.username, config.password, config)
}

// get models
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (basename !== file) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model
    })

// associate
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize


module.exports = db
