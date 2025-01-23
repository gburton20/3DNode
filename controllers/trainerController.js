const Trainer = require('../models/Trainer');

const getAllTrainers = async () => {
    try {
        const trainers = await Trainer.find({});

        return trainers;
    } catch (error) {
        throw error;
    }
};

const getOneTrainer = async(id) => {
    try {
        const trainer = await Trainer.findById(id);

        return trainer;
    } catch (error) {
        throw error;
    }
};

const getTrainersWhoHaveThisPokemon = async (id) => {
    try {
        const trainers = Trainer.find({PokemonList: id});
        return trainers;
    } catch (error) {
        throw error
    }
};

module.exports = {
    getAllTrainers,
    getOneTrainer,
    getTrainersWhoHaveThisPokemon,
}