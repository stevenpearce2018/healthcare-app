import React from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { ClipLoader } from 'react-spinners'
import { ToastContainer } from 'react-toastify'
import { observer } from 'mobx-react'
import { Button } from 'reactstrap'

/* 
 patientSelected
 Starts out as null, set to true/false afterwards to show/hide the patients medications
*/

/*
  patientIndex
  Used for key indexing/selections/updating data
*/

const Loader = () => <ClipLoader
  sizeUnit="px"
  size={50}
  color="#123abc"
  loading
/>

// props.patient.lastName
const Patient = ({
    patient: {
      lastName = "",
      firstName = "",
      // uiPulse and uiTemp are used to show the temp/pulse on the ui if the user has inputed information into the form
      uiPulse,
      uiTemp,
      town = "",
      Medications,
      pulse,
      temp,
      patientSelected = false,
      _id,
      selectPatient = () => {},
      handleChange = () => {},
      updateStatus = () => {},
      showForm = () => {},
      displayForm = false,
      patientIndex = 0 /* Required for proper keying in react! */
    }
  }) =>
    <div>
      <h2>Patient:</h2>
      <Button onClick={() => selectPatient({patientIndex, _id})}>{patientSelected ? "Hide Patient" : "Select Patient"}</Button>
      <br/>
      <br/>
      <p>FirstName: {firstName}</p>
      <p>LastName: {lastName}</p>
      <p>Town: {town}</p>
      {patientSelected && <h3>Medicine:</h3>}
      {patientSelected && (Medications ? Medications.map(({medname, dose, startDate, stopDate}, medicineIndex) =>
          <div key={`${patientIndex}-${medicineIndex}-medicine-key`}>
            <h3>{medicineIndex+1})</h3>
            <p>Medicine Name: {medname}</p>
            <p>Dosage: {dose}</p>
            <p>Start Date: {startDate}</p>
            {stopDate && <p>Stop Date: {stopDate}</p>}
            <br/>
          </div>
        ) : Loader())
      }
      <br/>
      {patientSelected && <h3>Status:</h3>}
      {/* ({patientIndex, _id, temp, pulse}) */}
      {patientSelected && ((temp && pulse) ?
        <div>
          <p>Temperature: {uiTemp || temp}</p>
          <p>Pulse: {uiPulse || pulse}</p>
        </div> : Loader())
      }
      {patientSelected && <div>
        {displayForm ?
          <div>
            <input name="temp" placeholder="Temperature" onChange={e => handleChange("uiTemp", e, patientIndex)} />
            <br/>
            <br/>
            <input name="pulse" placeholder="Pulse" onChange={e => handleChange("uiPulse", e, patientIndex)} />
            <br/>
            <br/>
            <Button onClick={() => updateStatus({patientIndex, _id, temp: uiTemp || temp, pulse: uiPulse || pulse})}>Save</Button>
          </div> :
           <Button onClick={() => showForm({patientIndex})}>Edit Status</Button>
        }
      </div>
      }
      <hr/>
    </div>


// https://medium.com/@pyrolistical/destructuring-nested-objects-9dabdd01a3b8
// props.mobxStore.patients is basically what I'm doing here
const App = observer(
  ({
    mobxStore: { patients = [], selectPatient = () => {}, updateStatus = () => {}, handleChange = () => {}, showForm = () => {} }
  }) => 
    <div className="App">
      <header className="App-header">
        <ToastContainer />
        <h1>Medical Startup App #91235!</h1>
      </header>
        {patients.map((patient, patientIndex) =>
          <Patient key={`patient-${patientIndex}`} patient={{ ...patient, patientIndex, selectPatient, updateStatus, handleChange, showForm }}/>
        )}
    </div>
)

export default App
