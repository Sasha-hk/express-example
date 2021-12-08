import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
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
       mongoose.connect(process.env.DB_URL, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
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
