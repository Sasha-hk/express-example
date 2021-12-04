import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import {router} from './router.js'
import dotenv from 'dotenv'


dotenv.config()

const __dirname = path.resolve()
const PORT = 3000
const DB_URL = process.env.DB_URL

const app = express()

app.use(express.json())
app.use('/', router)

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}...`)
        })
    }
    catch (e) {
        console.log(e)
    }
}

startApp()