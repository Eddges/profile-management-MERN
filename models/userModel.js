const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
    imageLocation : {
        type : String
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    firstName : {
        type : String
    },
    lastName : {
        type : String
    }
})

userSchema.plugin(passportLocalMongoose)

const userModel = mongoose.model('User', userSchema)

module.exports = userModel