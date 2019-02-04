import React, { Component } from 'react'
import './App.css'

import SingUpForm from './components/form/SingUpForm'
import LoginFrom from './components/form/LoginForm'
import PokemonForm from './components/form/PokemonForm'
import Images from './components/form/Images'

class App extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      token: '',
      images: []
    }
  }

  getImages = () => {
    return new Promise((res, rej) => {
      fetch('http://localhost:5000/pokedex/pokedex')
        .then(data => data.json())
        .then((parsedDate) => {
          res(parsedDate);
        }).catch(e => {
          rej(e);
        });
    })
  }

  updateState = (data) => {
    this.setState({
      username: data.name,
      token: data.token
    });
    localStorage.setItem('token', data.token);
  }

  updatePokemons = (images) => {
    this.setState({ images });
  }

  componentDidMount() {
    this.setState({ token: localStorage.getItem('token') });

    fetch('http://localhost:5000/pokedex/pokedex')
      .then(data => data.json())
      .then((parsedDate) => {
        this.setState({ images: parsedDate.pokemonColection });
      });
  }

  render() {
    if (this.state.token !== '' && this.state.token !== 'undefined') {
      return (
        <div>
          <h2>Logged</h2>
          <PokemonForm upFunc={this.updatePokemons} getImages={this.getImages} />
          <Images images={this.state.images} />
        </div>
      )
    } else {
      return (
        <div>
          <SingUpForm />
          <LoginFrom updateFunc={this.updateState} />
        </div>
      )
    }
  }
}

export default App
