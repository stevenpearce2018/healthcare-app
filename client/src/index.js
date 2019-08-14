import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { observable } from "mobx"
import 'bootstrap/dist/css/bootstrap.min.css'
import { popup } from './popup'

const mobxStore = observable({
    showForm: ({patientIndex}) => {
        mobxStore.patients[patientIndex].displayForm = true
    },
    handleChange: (key, event, patientIndex) => {
        mobxStore.patients[patientIndex][key] = event.target.value
    },
    updateStatus: ({patientIndex, _id, temp, pulse}) => {
        const oldTemp = mobxStore.patients[patientIndex].temp
        const oldPulse = mobxStore.patients[patientIndex].pulse
        try {
            mobxStore.patients[patientIndex].temp = temp
            mobxStore.patients[patientIndex].pulse = pulse
            fetch(`/patient-status/${_id}`, {
                method: 'PUT',
                mode: 'cors', // no-cors, cors, *same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // no-referrer, *client, 
                body: JSON.stringify({temp, pulse})
            }).then(response =>
                popup("Successful update!", true)
            )  
        } catch (error) {
            mobxStore.patients[patientIndex].temp = oldTemp
            mobxStore.patients[patientIndex].pulse = oldPulse
            popup("Did not update!", false)
        }
        mobxStore.patients[patientIndex].displayForm = false
    },
    getPatients: () => {
        let patientsArray = []
        try {
            // Don't make request if we already have the data
            if (mobxStore.patients.length === 0)
                fetch('/patients').then(response => response.json()).then(patients => {
                    Object.keys(patients).map(_id =>
                        patientsArray.push({ _id, ...patients[_id]})
                    )
                    mobxStore.patients = patientsArray
                })
        } catch (error) {
            popup("Failed to fetch patients!", false)
        }
    },
    selectPatient: ({patientIndex, _id}) => {
        try {
            // If statements are here to avoid making request for data we already have
            if (!mobxStore.patients[patientIndex].temp || mobxStore.patients[patientIndex].pulse)
                fetch(`/patient-status/${_id}`).then(response => response.json()).then(({temp, pulse}) => {
                    mobxStore.patients[patientIndex].temp = temp
                    mobxStore.patients[patientIndex].pulse = pulse
                })
            if (!mobxStore.patients[patientIndex].Medications)
                fetch(`/medications/${_id}`).then(response => response.json()).then(medications => {
                    mobxStore.patients[patientIndex].Medications = medications.Medications
                })
        } catch (error) {
            popup("Failed to fetch medications/patient status!", false)
        }
        mobxStore.patients[patientIndex].patientSelected = !mobxStore.patients[patientIndex].patientSelected
    },
    patients: []
    // Example Schema
    // patients: [
    //     {
    //       patientSelected: false,
    //       lastName: "Rogen",
    //       firstName: "Seth",
    //       town: "Funk Town",
    //       temp: 105,
    //       pulse: 170,
    //       Medications: [
    //         {
    //           medname: 'pineapple express',
    //           dose: '420mg',
    //           startDate: "04/20/2020"
    //         },
    //         {
    //           medname: 'baby asprin',
    //           dose: '2mg',
    //           startDate: "02/30/2019"
    //         },
    //       ]
    //     },
    //     {
    //       lastName: "Simpson",
    //       firstName: "Bart",
    //       town: "Springfield",
    //       temp: 98,
    //       pulse: 110,
    //       Medications: [
    //         {
    //           medname: 'shorts',
    //           dose: '100mg',
    //           startDate: "04/20/2020"
    //         },
    //         {
    //           medname: 'skateboarding',
    //           dose: '200mg',
    //           startDate: "12/17/1989"
    //         },
    //       ]
    //     }
    //   ]
})

mobxStore.getPatients()

// New to mobx, this tutorial was good
// https://medium.com/@shoaibbhimani1392/getting-started-with-mobx-82306df92d90

ReactDOM.render(<App mobxStore={mobxStore} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
