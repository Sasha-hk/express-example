import express from 'express'
import path from 'path'


const __dirname = path.resolve()
const PORT = 3000

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'))
} )

app.listen(PORT, () => {

})