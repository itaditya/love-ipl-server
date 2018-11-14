const mongoose = require('../db')

const { Schema } = mongoose
const { ObjectId } = Schema.Types

var BallSchema = new Schema({
  '_id': ObjectId,
  'Match_Id': {
    type: Number,
    required: true
  },
  'Innings_Id': Number,
  'Over_Id': Number,
  'Ball_Id': Number,
  'Team_Batting_Id': Number,
  'Team_Bowling_Id': Number,
  'Striker_Id': Number,
  'Striker_Batting_Position': Number,
  'Non_Striker_Id': Number,
  'Bowler_Id': Number,
  'Batsman_Scored': Number,
  'Extra_Type': String,
  'Extra_Runs': Number,
  'Player_dissimal_Id': String,
  'Dissimal_Type': String,
  'Fielder_Id': String
})

module.exports = mongoose.model('Ball', BallSchema)
