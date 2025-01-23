const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const trainerSchema = new mongoose.Schema({
    Name: {
        type: String,
        unique: true,
        required: true,
    },

    Region: {
        type: String,
        default: "Kanto",
    },
    // Typical way to relate the data via [{}]
    // Line 18 is how we associate the Pokemon with each trainer
    PokemonList: [{type: ObjectId, ref: 'Pokemon'}],
});

const Trainer = mongoose.model('Trainer', trainerSchema)

module.exports = Trainer;