const mongoose = require('mongoose')

const patientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    lastName: String,
    firstName: String,
    town: String
})

module.exports = mongoose.model('Patient', patientSchema)