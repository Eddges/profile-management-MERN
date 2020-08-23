const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const uploadRouter = express.Router()

uploadRouter.route('/')
.get((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('You are in /')
})

module.exports = uploadRouter