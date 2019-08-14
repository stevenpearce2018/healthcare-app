const mongoose = require('mongoose')

const tempAndPulse = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // Reference to Patient Schema
    temp: Number,
    pulse: Number
})

module.exports = mongoose.model('TempAndPulse', tempAndPulse)