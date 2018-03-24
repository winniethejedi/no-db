import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      askPokemonName: '',
      createdPokemon: this.props.createdPokemon,
      realPokemon: this.props.realPokemon,
    }
    this.askForPokemon = this.askForPokemon.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeRealPokemon = this.removeRealPokemon.bind(this);
    this.removeCreatedPokemon = this.removeCreatedPokemon.bind(this);
    // this.realPokemonBattle = this.realPokemonBattle.bind(this);
  }

  componentWillMount() {
    this.setState({
      createdPokemon: this.props.createdPokemon,
      realPokemon: this.props.realPokemon,
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const createdPokemonList = this.props.createdPokemon
      .map((e, i) => {
        return <li key={i}>
          <button onClick={(e) => this.props.updatePokemon(e) } >Update</button>
          <button onClick={(e) => this.createdPokemonBattle(e)} > {e.name}</button>
          <button onClick={() => this.removeCreatedPokemon(i)} >X</button>
        </li>;
      })
    const realPokemonList = this.props.realPokemon.map((e, i) => {
      return <li key={i}>
        <button onClick={(e) => this.realPokemonBattle(e)} >{e.name}</button>
        <button onClick={() => this.removeRealPokemon(i)}>X</button>
      </li>;
    })
    return (
      <div className='select'>
        <h1>Select</h1>
        <div className='select-content'>
          <ul className="createdPokemonList" >{createdPokemonList}</ul>
          <form onSubmit={ (e) => e.preventDefault() } >
            <p>Find an official Pokemon!</p><input name="askPokemonName" type="text" placeholder="Pokemon Name" value={this.state.askPokemonName} onChange={this.handleChange} />
            <button onClick={this.askForPokemon} >Select</button>
          </form>
          <ul className="realPokemonList" >{realPokemonList} </ul>
        </div>
      </div>
    );
  }

  askForPokemon() {
    axios
      .get('//localhost:8080/api/real?name=' + this.state.askPokemonName)
      .then(res => {
        this.setState({
          askPokemonName: '',
        })
        return this.props.refreshPokemonData();
      })
  }

  removeRealPokemon(index) {
    console.log(this.state.realPokemon);
    axios
      .delete('//localhost:8080/api/pokemon-data/real/' + index)
      .then(res => {
        this.setState({
          realPokemon: this.state.realPokemon.filter((e, i) => index !== i),
        })
        this.props.removeRealPokemon(index);
      })
  }

  removeCreatedPokemon(index) {
    console.log(this.state.createdPokemon);
    axios
      .delete('//localhost:8080/api/pokemon-data/created/' + index)
      .then(res => {
        this.setState({
          createdPokemon: this.state.createdPokemon.filter((e, i) => index !== i),
        })
        this.props.removeCreatedPokemon(index);
      })
  }


  // createdPokemonBattle(obj) {
  //   axios
  //     .put('//localhost:8080/api/pokemon-data/created-battle/', (req, res) => obj)
  // }

  // realPokemonBattle(obj) {
  //   axios
  //     .put('//localhost:8080/api/pokemon-data/real-battle/', (req, res) => obj)
  // }


}

export default Select;