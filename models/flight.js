import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat:{
    type:String,
    match:/[A-F][1-9]\d?/
  },
  price:{
    type:Number,
    min:0,
  }
})

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
    default:oneYearFromNow
  },
  tickets:[ticketSchema],
  meals:[{type:Schema.Types.ObjectId, ref:"Meal"}]
}, {
  timestamps: true
})

function oneYearFromNow(){
  const today = new Date()
  today.setFullYear(today.getFullYear()+1)
  return today
}

// Compile the schema into a model and export it
const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}