import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = { //Sum of stats should not exceed 218
      name: '', 
      height:'',
      weight: '',
      speed: '',
      specialDefense: '',
      specialAttack: '',
      defense: '',
      attack: '',
      hp: '',
      type: '',
      color: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.createPokemon = this.createPokemon.bind(this)
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createPokemon() {
    axios
      .post('//localhost:8080/api/pokemon-data', {
         name: this.state.name,
         height: this.state.height,
         weight: this.state.weight,
         speed: this.state.speed,
         specialDefense: this.state.specialDefense,
         specialAttack: this.state.specialAttack,
         defense: this.state.defense,
         attack: this.state.attack,
         hp: this.state.hp,
         type: this.state.type,
         color: this.state.color,
      })
      .then(res => {
        this.setState({
          name: '',
          height:'',
          weight: '',
          speed: '',
          specialDefense: '',
          specialAttack: '',
          defense: '',
          attack: '',
          hp: '',
          type: '',
          color: '',
        })
        this.props.addPokemon(res.data);
      })
  }

  render() {
    return (
      <div className="create">
        <h1>Create</h1>
        {/*<form /*onSubmit = {this.addItem put function here }>*/}
          <div className="inputs">
            <div className="first-inputs">
              <div className='input'><p className='label'>Name:</p><input type="text" placeholder="Name" name = "name" maxLength='20'onChange={this.handleChange} value={this.state.name}/></div>
              <div className='input'><p className='label'>Height:</p><input type="number" placeholder="Height" name = "height" max='999'onChange={this.handleChange} value={this.state.height}/><p className='paren'>(up to 999 inches)</p></div>
              <div className='input'><p className='label'>Weight:</p><input type="number" name="weight" placeholder='Weight' max='9999'onChange={this.handleChange} value={this.state.weight}/><p className='paren'>(up to 9999 pounds)</p></div>
            </div>
            <div className='stats'>
              <h2>Stats: Sum cannot exceed 318</h2>
              <div className='input'><p className='label'>Speed:</p><input type="number" placeholder='Speed' name = "speed" max='318'onChange={this.handleChange} value={this.state.speed}/></div>
              <div className='input'><p className='label'>Special Defense:</p><input type="number" placeholder='Special Defense' name = "specialDefense" max='318'onChange={this.handleChange} value={this.state.specialDefense}/></div>
              <div className='input'><p className='label'>Special Attack:</p><input type="number" placeholder='Special Attack' name="specialAttack"  max='318' onChange={this.handleChange} value={this.state.specialAttack}/></div>
              <div className='input'><p className='label'>Defense:</p><input type="number" name = "defense" placeholder='Defense' max='318'onChange={this.handleChange} value={this.state.defense}/></div>
              <div className='input'><p className='label'>Attack:</p><input type="number" name = "attack" placeholder='Attack' max='318'onChange={this.handleChange} value={this.state.attack}/></div>
              <div className='input'><p className='label'>Hit Points:</p><input type="number" name = "hp" placeholder='Hit Points' max='318'onChange={this.handleChange} value={this.state.hp}/></div>
            </div>
          </div>
          <div className="buttons">
            <div className="colors"> {/*replace text with colors*/}
              <p>Color</p>
              <div className='colors-content'>
                <button className='choice' name="color" onClick={this.handleChange} value='black' id='black'>Default</button>
                <button className='choice' name="color" onClick={this.handleChange} value='blue' id='blue'>Default</button>
                <button className='choice' name="color" onClick={this.handleChange} value='brown' id='brown'>Default</button>
                <button className='choice' name="color" onClick={this.handleChange} value='gray' id='gray'>Default</button>
                <button className='choice' name="color" onClick={this.handleChange} value='green' id='green'>Default</button>
                <button className='choice' name="color" onClick={this.handleChange} value='pink' id='pink'>Default</button>
                <button className='choice' name="color" onClick={this.handleChange} value='purple' id='purple'>Default</button>
                <button className='choice' name="color" onClick={this.handleChange} value='red' id='red'>Default</button>
                <button className='choice' name="color" onClick={this.handleChange} value='white' id='white'>Default</button>
                <button className='choice' name="color" onClick={this.handleChange} value='yellow' id='yellow'>Default</button>
              </div>
            </div>
            <div className="types">
                <p>Type: Choose 1</p>
                <div className='types-content' >
                  <button className='choice' name="type" onClick={this.handleChange} value='normal'>Normal</button>
                  <button className='choice' name="type" onClick={this.handleChange} value='fighting'>Fighting</button>
                  <button className='choice' name="type" onClick={this.handleChange} value='flying'>Flying</button>
                  <button className='choice' name="type" onClick={this.handleChange} value='poison'>Poison</button>
                  <button className='choice' name="type" onClick={this.handleChange} value='ground'>Ground</button>
                  <button className='choice' name="type" onClick={this.handleChange} value='rock'>Rock</button>
                  <button className='choice' name="type" onClick={this.handleChange} value='bug'>Bug</button>
                  <button className='choice' name="type" onClick={this.handleChange} value='ghost'>Ghost</button>
                  <button className='choice' name="type" onClick={this.handleChange} value='steel'>Steel</button>
                  <button className='choice' name="type" onClick={this.handleChange} value='fire'>Fire</button>
                  <button className='choice' name="type" onClick={this.handleChange} value='water'>Water</button>
                  <button className='choice' name="type" onClick={this.handleChange} value='grass'>Grass</button>
                  <button className='choice' name="type" onClick={this.handleChange} value='electric'>Electric</button>
                  <button className='choice' name="type" onClick={this.handleChange} value='psychic'>Psychic</button>
                  <button className='choice' name="type" onClick={this.handleChange} value='ice'>Ice</button>
                  <button className='choice' name="type" onClick={this.handleChange} value='dragon'>Dragon</button>
                  <button className='choice' name="type" onClick={this.handleChange} value='dark'>Dark</button>
                  <button className='choice' name="type" onClick={this.handleChange} value='fairy'>Fairy</button>
                </div>
            </div>
          </div>
      <button /*type = 'submit'*/ onClick={this.createPokemon} >Make Pokemon!</button>
    {/*</form>*/}
    </div>
    );
  }
}

export default Create;