const express = require('express')
const cors = require('cors')

const app = express()

const whitelist = ['http://localhost:3000', 'https://localhost:3000']

const corsOptionsDelegate = (req, callback) => {
    let corsOptions

    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        console.log('Not -1')
        corsOptions = { origin : true }
    }

    else{
        console.log('-1')
        corsOptions = {origin : false}
    }

    callback(null, corsOptions)
}

exports.cors = cors()
exports.corsWithOptions = cors(corsOptionsDelegate)