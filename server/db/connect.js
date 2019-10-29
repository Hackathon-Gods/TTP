const mongoose = require('mongoose')
const MONGO_URI = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost:27017/devdb'

/**
 * Connect to the mongo database
 * @param {import('express').Express} expressApp 
 */

const connect = expressApp => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
    .then(() => expressApp.emit('ready'))
    .catch(err => { throw err })
}

module.exports = connect