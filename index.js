import express from 'express'
import dotenv from 'dotenv'
import db from './models/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './router/authentication.js'


dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())


// router
app.use('/api', router)

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
