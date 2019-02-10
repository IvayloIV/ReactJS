import React, { Component } from 'react';
import './warning.css';

import Title from './components/Title';
import Register from './components/Register';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Title />
        <Register />  
        <Navigation />
      </ErrorBoundary>
    );
  }
}

export default App;
