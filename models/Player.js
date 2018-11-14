const mongoose = require('../db')

const { Schema } = mongoose
const { ObjectId } = Schema.Types

var PlayerSchema = new Schema({
  '_id': ObjectId,
  'Player_Id': {
    type: Number,
    required: true
  },
  'Player_Name': {
    type: String,
    unique: true,
    required: true
  },
  'DOB': String,
  'Batting_Hand': String,
  'Bowling_Skill': String,
  'Country': String,
  'Is_Umpire': Number
})

module.exports = mongoose.model('Player', PlayerSchema)
