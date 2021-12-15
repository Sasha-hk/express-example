const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const Sequelize = require('sequelize')
const db = require('./models/index.js')


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
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}...`)
        }) 
    } 
    catch (e) {
        console.log(e)
    }
}


start()
