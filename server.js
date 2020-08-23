const express = require('express')
const http = require('http')
const uploadRouter = require('./routes/uploadRouter')

const app = express()

const PORT = 5000

app.use('/', uploadRouter)

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log('Server running on PORT : ', PORT)
})