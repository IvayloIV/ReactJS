import React from 'react';
import './App.css';
import ReactDOM from './index';

let counter = 0;

function increaseCounter() {
  counter++;
  ReactDOM.render(App(), document.getElementById('root'));
}

const App = () => {
  return (
    <div className="App">
      <p>Counter: {counter}</p>
      <button onClick={increaseCounter}>Add</button>
    </div>
  );
}

export default App;