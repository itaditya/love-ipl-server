const mongoose = require('../db')

const { Schema } = mongoose
const { ObjectId } = Schema.Types

var TeamSchema = new Schema({
  '_id': ObjectId,
  'Team_Id': {
    type: Number,
    required: true
  },
  'Team_Name': {
    type: String,
    unique: true,
    required: true
  },
  'Team_Short_Code': {
    type: String,
    unique: true,
    required: true
  }
})

module.exports = mongoose.model('Team', TeamSchema)
