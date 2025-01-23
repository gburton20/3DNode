// The file is reponsible for all Pokemon API routes:
// This file is a CRUD API to serve up relevant data based on the request 
const express = require('express');

const handleErrorResponse = require('./handleErrorResponse');
const { 
    getAllPokemon, 
    getOnePokemon,
    createPokemon,
    deletePokemon,
    updatePokemon,
} = require('../../controllers/pokemonController');

const router = express.Router();

// CRUD - 'Read'/GET request for ALL Pokemon
router.get('/', async (_, res) => {
    try {
        const pokemon = await getAllPokemon();
        res.status(200).json({
            message: 'success', 
            payload: pokemon
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
});
// CRUD - 'Read'/GET request for ONE Pokemon
router.get('/:pokedexNo', async (req, res) => {
    try {
        const pokemon = await getOnePokemon(req.params.pokedexNo);
        if (!pokemon) {
            handleErrorResponse(res, 'No pokemon found', 404);

            return;
        }
        res.status(200).json({
            message: 'Success',
            payload: pokemon
        })
    } catch (error) {
        handleErrorResponse(res, error);
    }
});
// CRUD - 'Create'/POST request for one Pokemon
router.post('/', async (req, res) => {
    try {
        const pokemon = await createPokemon(req.body);
        res.status(200).json({
            message: 'success',
            payload: pokemon,
        })
    } catch (error) {
        handleErrorResponse(res, error);
    }
});

// CRUD - 'Delete'/DELETE request for Pokemon:
router.delete('/:pokedexNo', async (req, res) => {
    try {
        const pokemon = await deletePokemon(req.params.pokedexNo);
        res.status(200).json({
            message: 'success',
            payload: pokemon,
        })
    } catch (error) {
        handleErrorResponse(res, error);
    }
});

router.put('/:pokedexNo', async (req, res) => {
    try {
        const pokemon = await updatePokemon(req.params.pokedexNo, req.body);
        res.status(200).json(pokemon);
    } catch (error) {
        handleErrorResponse(res, error);
    }
});

module.exports = router;