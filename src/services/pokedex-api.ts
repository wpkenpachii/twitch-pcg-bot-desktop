import axios from 'axios'
import getPokemons from "@/database/pokemon"

async function fetchPokemon(pokemonName: any) {
    try {
        const { data } = await axios.get(` https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        return data
    } catch (error: any) {
        console.error(error.messsage)
    }
}

function getPokemonTypes(pokemonData: any) {
    try {
        if(!pokemonData) throw new Error('Missing pokemon data')
        const { types } = pokemonData
        return types.map((data: any) => data.type.name)
    } catch (error) {
        console.error(error)
    }
}

function getPokemonBaseStatsTotal(pokemonData: any) {
    try {
        if(!pokemonData) throw new Error('Missing pokemon data')
        const { stats } = pokemonData
        return stats.map((statsData: any) => statsData.base_stat).reduce((lastStats: any, curStats: any) => {
            return Number(lastStats) + Number(curStats)
        })
    } catch (error) {
        console.error(error)
    }
}

type StaticDataAttributes = "Name" | "Pokedex ID" | "Pokemon Order" | "Tier" | "Base Stats Total" | "Generation";

function getAttributeFromStaticPokemonData(pokemonName: string, attribute: StaticDataAttributes) {
    const foundPokemon = getPokemons().find( (pokemon: any) => pokemon.Name === pokemonName)
    if (!foundPokemon) throw new Error(`Could not find this pokemon [${pokemonName}]`)
    return foundPokemon[attribute]
}

export async function getPokemon(pokemonName: any): Promise<{[key: string]: any} | void> {
    try {
        const pokemonData = await fetchPokemon(pokemonName)
        const name = pokemonData ? pokemonData.name : ''
        const types = getPokemonTypes(pokemonData)
        const stats = getPokemonBaseStatsTotal(pokemonData)
        const weight = pokemonData ? pokemonData.weight : 0
        const tier = pokemonData ? getAttributeFromStaticPokemonData(name, 'Tier') : ''
        const generation = pokemonData ? getAttributeFromStaticPokemonData(name, 'Generation') : ''
        return ({
            name,
            tier,
            types,
            stats,
            generation,
            weight,
        })
    } catch (error: any) {
        console.error(error)
    }
}