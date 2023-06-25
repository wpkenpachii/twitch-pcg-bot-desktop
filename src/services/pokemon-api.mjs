/* eslint-disable */
import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

// const Pokedex = require("pokedex-promise-v2");
// const P = new Pokedex()

(async () => { // with Async/Await
    try {
        // const { pokemonId } = await P.getPokemonSpeciesByName("golduck")
        const response = await P.getResource('/api/v2/pokemon/dragonite')
        console.log('Response', response)
        // console.log(response.types[0])
    } catch (error) {
        console.log('Error', error.message)
    }
})()