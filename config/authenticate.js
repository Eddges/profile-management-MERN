const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('../models/userModel')

exports.local = passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

exports.getToken = (user) => {
    return jwt.sign(user, config.secretKey, { expiresIn : 7200 })
}

var opts = {
    jwtFromRequest : extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : config.secretKey
}

exports.jwtPassport = passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
    console.log('JWT Payload : ', jwt_payload)
    User.findOne({_id : jwt_payload._id}, (err, user) => {
        if(err) {
            return done(err, false)
        }
        else if(user) {
            console.log('user : ', user)
            return done(null, user)
        }
        else{
            return done(null, false)
        }
    })
}))

exports.verifyUser = passport.authenticate('jwt', {session : false})