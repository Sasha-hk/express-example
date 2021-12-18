const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const cookieParser = require('cookie-parser')
const { sequelize, User } = require('./models/')
const dbConnect = require('./db')
const router = require('./router//authentication')


dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// router
app.use('/api', router)

const start = async () => {
    try {
        dbConnect()

        app.listen(PORT, () => {
            console.log('[server]'.green, `Server started http://localhost:${PORT}`)
        })
    } 
    catch (e) {
        console.log(e)
    }
}


start()
