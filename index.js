import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'


dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(cookieParser())
app.use(cors())


async function start() {
    try {
        await mongoose.connect(process.env.DB_URL, {
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
