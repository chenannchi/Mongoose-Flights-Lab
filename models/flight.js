import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ["American", "Southwest", "United"],
  },
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
    default: "DEN",
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    // default: Date.now,
    default:oneYearFromNow
  }
}, {
  timestamps: true
})

function oneYearFromNow(){
  const today = new Date()
  // console.log(today.getFullYear()+1)
  today.setFullYear(today.getFullYear()+1)
  // console.log(today)
  return today
}

oneYearFromNow()

// Compile the schema into a model and export it
const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}