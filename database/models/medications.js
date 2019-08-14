const mongoose = require('mongoose')

const medications = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // Reference to Patient Schema
    Medications: [{
        medname: String,
        dose: String,
        startDate: Date,
        stopDate: {
            type: Date,
            required: false
        },
    }]
})

module.exports = mongoose.model('Medications', medications)