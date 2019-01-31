import React from 'react';
import './App.css';

const App = () => {
    return (
      <div className="App">
        <p>Exact time: {new Date(Date.now()).toLocaleTimeString()}</p>
      </div>
    );
}

export default App;