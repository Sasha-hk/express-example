const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const {sequelize} = require('./models/')


dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// router
// app.use('/api', router)

const start = async () => {
    try {
        sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}...`)
        }) 
    } 
    catch (e) {
        console.log(e)
    }
}


start()
