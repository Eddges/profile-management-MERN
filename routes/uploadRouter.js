const express = require('express')
const bodyParser = require('body-parser')
const User = require('../models/userModel')
const authenticate = require('../config/authenticate')
const multer = require('multer')
const path = require('path')
const { cors, corsWithOptions } = require('../config/cors')

const uploadRouter = express.Router()
uploadRouter.use(bodyParser.json())

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, 'public/images')
    },
    filename : (req, file, callback) => {
        callback(null, `${req.user.username}${path.extname(file.originalname)}`)
    }
})

const imageFileFilter = (req, file, callback) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return callback(new Error("Server can only handle image files. Please proceed accordingly"))
    }
    callback(null, true)
}

const upload = multer({storage : storage, fileFilter : imageFileFilter})

uploadRouter.route('/')
.options(corsWithOptions, (req, res) => {
    res.sendStatus = 200
})
.get(corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({success : true, user : req.user})
})

.post(corsWithOptions, authenticate.verifyUser, upload.single('imageFile'), (req, res) => {
    console.log(req.body)
    User.findById(req.user._id)
    .then(user => {
        console.log('file destination : ', req.file.destination)
        user.imageLocation = req.file.path
        console.log('imageLocation : ', user.imageLocation)
        user.save()
        .then(doc => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({user : user, file : req.file, success : true})
        })
    })
})

module.exports = uploadRouter