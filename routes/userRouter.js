const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const User = require('../models/userModel')
const passport = require('passport')
const authenticate = require('../config/authenticate')
const cors = require('../config/cors')

const userRouter = express.Router()
userRouter.use(bodyParser.json())

userRouter.route('/signup')
.options()
.post(cors.corsWithOptions, (req, res, next) => {
    User.register(new User({username : req.body.username}), req.body.password, (err, user) => {
        if(err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.json({err : err})
        }
        else{
            if(req.body.firstName) {
                user.firstName = req.body.firstName
            }
            if(req.body.lastName) {
                user.lastName = req.body.lastName
            }
            user.save()
            .then(() => {
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.json({ success : true, msg : 'Registration Successful!'})
                })
            })
        }
    })
})

userRouter.route('/login')
.options(cors.corsWithOptions, (req, res) => {
    res.sendStatus = 200
})
.post(cors.corsWithOptions, passport.authenticate('local'), (req, res, next) => {
    const token = authenticate.getToken({_id : req.user._id})
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({success : true, token : token, msg : 'Login Successful'})
})

module.exports = userRouter