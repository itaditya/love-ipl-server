const mongoose = require('mongoose')

const { MONGO_URL } = process.env

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
})

const { connection } = mongoose

connection.on('error', console.error)
connection.once('open', function () {
  console.log('Connection ok!')
})

module.exports = mongoose
