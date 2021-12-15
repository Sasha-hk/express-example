const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const Sequelize = require('sequelize')


dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// router
// app.use('/api', router)

const start = () => {
    try {
        const sequelize = new Sequelize(
            process.env.DB_DB,
            process.env.DB_USER, 
            process.env.DB_PASSWORD, 
            {
                host: process.env.DB_HOST,
                dialect: 'postgres',
                operatorsAliases: false,
                
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                },
                operatorsAliases: 1
            }
        );
        


        const UserModel = sequelize.define('user', {
            email: {
                type: Sequelize.STRING,
                primaryKey: true,
            },
            password: {
                type: Sequelize.STRING,
            }
        })





        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}...`)
        }) 
    } 
    catch (e) {
        console.log(e)
    }
}


start()
