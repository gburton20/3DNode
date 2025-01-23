const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema(
    {
        PokedexNo: {
            type: Number,
            unique: true,
            required: true,
        },
        Name: {
            type: String,
            unique: true,
            required: true,
        },
        Type: String,
        Moves: [String],
    },
    {collection: 'pokemon'}
)

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;