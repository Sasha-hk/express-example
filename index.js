require('dotenv').config()
const cors = require('cors')
const express = require('express')
const colors = require('colors')
const cookieParser = require('cookie-parser')
const dbConnect = require('./db')
const router = require('./router/authentication')



const PORT = process.env.PORT || 3000
const app = express()
const env = process.env.NODE_ENV || 'development'

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// router
app.use('/api', router)

const start = async () => {
    try {
        console.log('[server]'.green, 'Project state', env)
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
