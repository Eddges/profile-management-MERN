const express = require('express')
const http = require('http')
const userRouter = require('./routes/userRouter')
const mongoose = require('mongoose')
const config = require('./config/config')
const passport = require('passport')
const uploadRouter = require('./routes/uploadRouter')

const app = express()

const PORT = 5000

const connect = mongoose.connect(config.mongoURL, () => {
    console.log('Connected to URL : ', config.mongoURL)
})

app.use(passport.initialize())
app.use('/user', userRouter)
app.use('/upload', uploadRouter)

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log('Server running on PORT : ', PORT)
})