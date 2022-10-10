const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const router = require('./router/index')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use('/api', router)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })    
        app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
    } catch (error) {
        console.log(error)
    } 
}

start()