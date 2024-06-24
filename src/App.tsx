import React, { useState } from 'react';
import './index.css';
import './App.css';
import { get } from 'aws-amplify/api';

const myAPI: string = "apijun19"; // Replace with your API endpoint
const path: string = "/customers";

interface Customer {
  customerId: string;
  customerName: string;
}

const My_App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [customers, setCustomers] = useState<Customer[]>([]);

  async function getCustomer(e: { input: string }): Promise<void> {
    try {
      let customerId = e.input;
      const restOperation = await get({ apiName: myAPI, path: path + "/" + customerId });
      const { body } = await restOperation.response;
      
      if (!body) {
        console.error('Empty response received from API');
        return;
      }

      let response: Customer | null = null;

      // Check if the response is of type Customer or transform it accordingly
      if (typeof body === 'object' && 'customerId' in body && 'customerName' in body) {
        response = body as Customer;
      } else {
        console.error('Unexpected response format from API:', body);
        return;
      }

      console.log(response);
      let newCustomers = [...customers];
      newCustomers.push(response);
      setCustomers(newCustomers);
    } catch (error) {
      console.error('Error fetching customer:', error);
      // Handle error scenario
    }
  }

  return (
    <div className="App">
      <h1>Super Simple React App - update : 9:32 am used FULL ACCESS role</h1>
      <div>
        <input
          placeholder="customer id"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <br />
      <button onClick={() => getCustomer({ input })}>Get Customer From Backend</button>

      <h2 style={{ visibility: customers.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
      {customers.map((thisCustomer, index) => (
        <div key={index}>
          <span><b>CustomerId:</b> {thisCustomer.customerId} - <b>CustomerName:</b> {thisCustomer.customerName}</span>
        </div>
      ))}
    </div>
  );
};

export default My_App;

