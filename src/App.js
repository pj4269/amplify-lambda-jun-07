import logo from './logo.svg';
import './App.css';
//import Amplify, { API } from 'aws-amplify'
//import { Amplify } from "aws-amplify";
import { get } from 'aws-amplify/api';




import React, { useEffect, useState } from 'react'

const myAPI = "June07AmplifyLambda2"
const path = '/customers'; 

const App = () => {
  const [input, setInput] = useState("")
  const [customers, setCustomers] = useState([])


  
  
  
  async function getCustomer(e) {
    let customerId = e.input
    const restOperation = get({apiName: myAPI, path: path + "/" + customerId})
    const { body } = await restOperation.response;
    const response = await body.json();
    console.log(response)
    let newCustomers = [...customers]
    newCustomers.push(response)
    setCustomers(newCustomers)
  }
  
  

  return (
    
    <div className="App">
      <h1>Super Simple React App</h1>
      <div>
          <input placeholder="customer id" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>      
      </div>
      <br/>
      <button onClick={() => getCustomer({input})}>Get Customer From Backend</button>

      <h2 style={{visibility: customers.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
      {
       customers.map((thisCustomer, index) => {
         return (
        <div key={thisCustomer.customerId}>
          <span><b>CustomerId:</b> {thisCustomer.customerId} - <b>CustomerName</b>: {thisCustomer.customerName}</span>
        </div>)
       })
      }
    </div>
  )
}

export default App;
