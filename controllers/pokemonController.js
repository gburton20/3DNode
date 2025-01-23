// Purpose of this file - house controller functions:
const Pokemon = require('../models/Pokemon');
// Controller function to get all Pokemon:
const getAllPokemon = async () => {
    try {
        const pokemon = await Pokemon.find({});

        return pokemon;
    } catch (error) {
        throw error;
    }
};
// Controller function to get one Pokemon:
const getOnePokemon = async (pokedexNo) => {
    try {
        const pokemon = await Pokemon.findOne({PokedexNo: pokedexNo});

        return pokemon;
    } catch (error) {
        throw error;
    }
}
// Controller function to create one Pokemon:
const createPokemon = async (pokemonData) => {
    try {
        const pokemon = await Pokemon.create(pokemonData);

        return pokemon;
    } catch (error) {
        throw error;
    }
}
// Controller function to delete a Pokemon:
const deletePokemon = async (pokedexNo) => {
    try {
        const pokemon = await Pokemon.findOneAndDelete({PokedexNo: pokedexNo}); // Value 'pokedexNo' is the param passed in by the user. 'PokedexNo' is the name of the field in our schema.
        return pokemon;
    } catch (error) {
        throw error;
    }
}

const updatePokemon = async (pokedexNo, pokemonData) => {
    try {
        const pokemon = await Pokemon.findOneAndUpdate(
            {PokedexNo: pokedexNo}, // This object is a filter
            pokemonData,
            {new: true}, // // This object is a filter
        )
        
        return pokemon;
    } catch (error) {
        throw error;
    }
}

const getPokemonInTrainerList = async (pokemonList) => {
    try {
        const pokemon = Pokemon.find({_id: {$in: pokemonList}});

        return pokemon;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllPokemon,
    getOnePokemon,
    createPokemon,
    deletePokemon,
    updatePokemon,
    getPokemonInTrainerList,
}