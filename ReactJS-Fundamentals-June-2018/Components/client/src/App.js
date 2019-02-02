import React, { Component } from 'react';
import './App.css';
import Details from './components/Details';

import Slider from './components/Slider';
import Characters from './components/Characters';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      epOnFocus: 0,
      currentEpisode: 0
    };

    this.changeEp = (ep) => {
      this.setState({ epOnFocus: ep });
    }

    this.updateEpisode = (ep) => {
      this.setState({ currentEpisode: ep });
    }
  }

  render() {
    return (
      <div className="App">
        <Slider updateFunc={this.changeEp} focusedEp={this.state.epOnFocus} />
        <Characters updateEpisode={this.updateEpisode} />
        <Details focusedEp={this.state.currentEpisode} />
      </div>
    );
  }
}

export default App;
