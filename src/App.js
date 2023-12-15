import './App.css';

import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

const App = () => {
  // Create coins variable and set to empty array
  const [coins, updateCoins] = useState([]);

  // Create additional state to hold user input for limit and start properties
  const [input, updateInput] = useState({ limit: 5, start: 0 });

  // Create a new function to allow users to update the input values
  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value });
  }

  // Define function to all API
  const fetchCoins = async() => {
    const { limit, start } = input;
    const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`);
    updateCoins(data.coins);
  }

  // Call fetchCoins function when component loads
  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <div className="App">
      {/* Add input fields to the UI for user input */}
        <input
          placeholder="start"
          onChange={e => updateInputValues('start', (e.target.value - 1))}
        />
        <input
          onChange={e => updateInputValues('limit', e.target.value)}
          placeholder="limit"
        />

      {/* Add button to the UI to give user the option to call the API */}
        <button onClick={fetchCoins}>Fetch Coins</button>
      {
        coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }
    </div>
  );
}

export default App;