import React, { Component } from 'react';
import './App.css';
import Battle from './Components/Battle';
import Create from './Components/Create';
import Select from './Components/Select';
import pokemonLogo from './Images/pokemon-logo.png';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      createdPokemon: [],
      realPokemon: [],
      // battleCreatedPokemon: {},
      // battleRealPokemon: {},
      updatePokemon: {},
    };
    this.pokemonCreated = this.pokemonCreated.bind(this);
    this.createdPokemonDeleted = this.createdPokemonDeleted.bind(this);
    this.realPokemonDeleted = this.realPokemonDeleted.bind(this);
    this.pokemonGrabbed = this.pokemonGrabbed.bind(this);
    this.getUpdatedPokemon = this.getUpdatedPokemon.bind(this);
  }

  componentWillMount() {
    this.getPokemonData();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        {<img src={ pokemonLogo } alt='logo' className='pokemon-logo' />}
        </header>
        <div className="App-intro">
          <Create addPokemon={p => this.pokemonCreated(p)} />
          <Select removeCreatedPokemon={i => this.createdPokemonDeleted(i)} removeRealPokemon={i => this.realPokemonDeleted(i)} createdPokemon={this.state.createdPokemon} realPokemon={ this.state.realPokemon } refreshPokemonData={() => this.getPokemonData()} updatePokemon={() => this.state.getUpdatedPokemon} />
          <Battle  battleCreatedPokemon={ this.state.battleCreatedPokemon } battleRealPokemon={ this.setState.battleRealPokemon } />
        </div>
      </div>
    );
  }

  pokemonCreated(arg) {
    this.setState({
      createdPokemon: [
        ...this.state.createdPokemon,
        arg,
      ]
    });
  }

  pokemonGrabbed(arg) {
    this.setState({
      realPokemon: [
        ...this.state.realPokemon,
        arg,
      ]
    });
  }

  realPokemonDeleted(index) {
    this.setState({
      realPokemon: 
        this.state.realPokemon.filter((e, i) => index !== i)
    })
  }
  createdPokemonDeleted(index) {
    this.setState({
      createdPokemon: 
        this.state.createdPokemon.filter((e, i) => index !== i)
    })
  }
  getPokemonData() {
    return axios
    .get('/api/pokemon-data')
    .then((res) => {
      this.setState({
        createdPokemon: res.data.createdPokemon,
        realPokemon: res.data.realPokemon,
        battleCreatedPokemon: res.data.battleCreatedPokemon,
        battleRealPokemon: res.data.battleRealPokemon
      })
    })
  }

  getUpdatedPokemon(e) {
    this.setState({
      updatePokemon: e
    })
    console.log(this.state.updatePokemon)
  }

}

export default App;
