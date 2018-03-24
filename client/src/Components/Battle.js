import React, { Component } from 'react';
import '../App.css';

class Battle extends Component {
  constructor() {
    super();
    this.state = {
      battleCreatedPokemon: {},
      battleRealPokemon: {}
    }

  }

  componentWillMount() {
    this.setState({
      battleCreatedPokemon: this.props.battleCreatedPokemon,
      battleRealPokemon: this.props.battleRealPokemon
    })
  }

  render() {
    return (
      <div className='battle'>
        <h1>Battle</h1>
        {/* <p> {this.props.battleCreatedPokemon.name} </p> */}
      <button>Battle!</button>
      {/* <p> { this.state.battleRealPokemon.name }</p> */}
      </div>
    );
  }
}

export default Battle;
