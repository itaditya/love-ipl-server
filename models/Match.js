const mongoose = require('../db')

const { Schema } = mongoose
const { ObjectId } = Schema.Types

var MatchSchema = new Schema({
  '_id': ObjectId,
  'Match_Id': {
    type: Number,
    required: true
  },
  'Match_Name': {
    type: String,
    unique: true,
    required: true
  },
  'Match_Date': String,
  'Team_Name_Id': Number,
  'Opponent_Team_Id': Number,
  'Season_Id': Number,
  'Venue_Name': String,
  'Toss_Winner_Id': Number,
  'Toss_Decision': String,
  'IS_Superover': Number,
  'IS_Result': Number,
  'Is_DuckWorthLewis': Number,
  'Win_Type': String,
  'Won_By': Number,
  'Match_Winner_Id': Number,
  'Man_Of_The_Match_Id': Number,
  'First_Umpire_Id': Number,
  'Second_Umpire_Id': Number,
  'City_Name': String,
  'Host_Country': String
})

module.exports = mongoose.model('Match', MatchSchema)
