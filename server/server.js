const express = require('express')
const app = express()
const minify = require('express-minify')
const compression = require('compression')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const TempAndPulse = require('./database/models/tempAndPulse')
const Medications = require('./database/models/medications')
const Patient = require('./database/models/patient')
const connect = require('./database/connect')
connect()
// File compression middleware/body parser middlewear

// This server doesn't send out any files currently but if it did you could use these two middleware
// for a free performance upgrade
app.use(compression())
app.use(minify())

// Parses request.body, just an easy module to help handle the request.body
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }))

app.get('/medications/:_id', async(req, res) => {
    const { _id } = req.params
    const medications = await Medications.findOne({ _id })
    medications ? res.send(medications).status(200) : res.send("Not found").status(400)
})

app.get('/patient-status/:_id', async(req, res) => {
    // returns temp and pulse of patient
    const { _id } = req.params
    if (!_id)
        return res.send("Id missing, oh no!").status(400)
    try {
        const status = await TempAndPulse.findOne({ _id })
        return res.send(status).status(400)
    } catch (error) {
        return res.send("Something went wrong").status(500)
    }
})

app.get('/patients', async(req, res) => {
    try {
        Patient.find({}, (err, patients) => {
            let patientMap = {}
            patients.forEach(patient => patientMap[patient._id] = patient )
            // console.log({patientMap})
            res.send(patientMap).status(200)
        })
    } catch (error) {
        res.send("Could not get any records, oh no!").status(500)
    }
})

app.put('/patient-status/:_id', async(req, res) => {
    const { _id } = req.params
    const { temp, pulse } = req.body
    if (!_id)
        return res.send("You must select a patient!").status(400)
    else if (!temp && !pulse)
        return res.send("You must input a pulse or temperature").status(400)
    try {
        await TempAndPulse.updateOne(
            { "_id" : _id }, 
            { "$set" : { temp, pulse } },
            { "upsert" : false } 
        )
        res.send("Update successful!").status(201)
    } catch (error) {
        return res.send("Sorry, something went wrong. Update failed.").status(500)
    }
})

// You could use this function to add new users when the server starts

// const registerPatient = async() => {
//     const _id = new mongoose.Types.ObjectId()

//     const patient = new Patient({
//       _id,
//       lastName: "Rogen",
//       firstName: "Seth",
//       town: "Los Angelos"
//     })
//     await patient.save().catch(err => console.log(err))

//     const tempAndPulse = new TempAndPulse({
//         _id,
//         temp: 105,
//         pulse: 102
//       })
//     await tempAndPulse.save().catch(err => console.log(err))

//     const medications = new Medications({
//         _id,
//         Medications: [
//             {
//                 medname: "Pineapple Express",
//                 dose: "420mg",
//                 startDate: new Date(2008, 11, 24)
//             },
//             {
//                 medname: "Asprin",
//                 dose: "200mg",
//                 startDate: new Date(2018, 11, 24),
//                 stopDate: new Date(2019, 12, 25)
//             }
//         ]
//     })
//     await medications.save().catch(err => console.log(err)) 
//   }
//   registerPatient()

app.listen(5000, () => console.log('App listening on port http://localhost:5000! Make sure you change the port here and in the proxy if you have something cached on this url :).'))