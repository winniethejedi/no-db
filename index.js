const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const RapidAPI = new require('rapidapi-connect');
const rapid = new RapidAPI(process.env.CONNECTION_STRING);

const app = express();

app.use(cors());
app.use(bodyParser.json());

let createdPokemon = [];
let realPokemon = [];
let pokemonName='';
// let battleCreatedPokemon = {};
// let battleRealPokemon = {};

let newPokemon;
app.get('/api/pokemon-data', (req, res, next) => {
    let data = {
        createdPokemon,
        realPokemon,
        //battleCreatedPokemon,
        //battleRealPokemon,
    }
    res.json(data);
});

app.post('/api/pokemon-data', (req, res, next) => {
    const receivedPokemon = req.body;
    createdPokemon.push(receivedPokemon);
    res.json(receivedPokemon)
})

app
    .get('/api/real', (req, res, next) => {
        const pokemonName = req.query.name;
        rapid.call('Poke', 'getPokemonByName', { 
            'pokemonName': pokemonName
        
        }).on('success', (payload)=>{
            let newPayload = payload.pop();
            let realPokemonObj = {
                name: newPayload.name,
                height: newPayload.height,
                speed: newPayload.stats[0].base_stat,
                specialDefense: newPayload.stats[1].base_stat,
                specialAttack: newPayload.stats[2].base_stat,
                defense: newPayload.stats[3].base_stat,
                attack: newPayload.stats[4].base_stat,
                hp: newPayload.stats[5].base_stat
            }
            realPokemon.push(realPokemonObj);
            res.json(realPokemonObj)
        }).on('error', (payload)=>{
            console.warn(payload);
        });

        
    })

    app.delete('/api/pokemon-data/created/:id', (req, res) => {
        const child = createdPokemon.splice(req.params.id, 1)[0];
        res.json(child);
    });
    app.delete('/api/pokemon-data/real/:id', (req, res) => {
        const child = realPokemon.splice(req.params.id, 1)[0];
        res.json(child);
    });


// app
//     .put('/api/pokemon-data/created-battle/', (req, res) => {
//         battleCreatedPokemon = obj.data;
//     })

// app
//     .put('/api/pokemon-data/real-battle/', (req, res) => {
//         battleRealPokemon = obj.data;
//     })


const port = process.env.PORT || 8080;
app.listen(port, () => {console.log(`Listening on port ${port}. The server is actually working!`)});