const express = require('express')
const bodyParser = require('body-parser')
const User = require('../models/userModel')
const authenticate = require('../config/authenticate')
const multer = require('multer')

const uploadRouter = express.Router()
uploadRouter.use(bodyParser.json())

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callaback(null, 'public/images')
    }
})

uploadRouter.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({user : req.user})
})

module.exports = uploadRouter