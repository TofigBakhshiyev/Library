const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
}) */

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    userid: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Event', eventSchema)