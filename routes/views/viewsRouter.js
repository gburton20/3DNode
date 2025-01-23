// This file is a user facing API
const express = require('express');
const { 
    getAllPokemon, 
    getOnePokemon, 
    createPokemon,
    deletePokemon,
    updatePokemon,
    getPokemonInTrainerList,
    getTrainersWhoHaveThisPokemon,
} = require('../../controllers/pokemonController');
const { getAllTrainers, getOneTrainer } = require('../../controllers/trainerController');

const router = express.Router();

router.get('/', (_, res) => {
    res.render('index');
});

router.get('/pokemon', async (_, res) => {
    try {
        const pokemon = await getAllPokemon();
        // I will ask EJS to look for the 'pokemon'.ejs file, and then send that back to the client, passing in some data (in the object, the second param)
        res.render('pokemon', {pokemonArray: pokemon});
    } catch (error) {
        // Convention - put up an error page for the user. We're omitting this for now to be fast
        // We're being tactical - send some simple error HTML and console.log the error
        res.send('<h1>An error has occured</h1><a href="/">Go home.</a>');
        // Console log the error
        console.log(error);
    }
});

// When the user goes to /pokemon/create-pokemon (probably through a link), render the form:
router.get('/pokemon/create-pokemon', (req, res) => {
    res.render('createForm');
});

// A two step process to update the details for a Pokémon:
// THe first step - GET a Pokemon:
router.get('/pokemon/update-pokemon/:pokedexNo', async (req, res) => {
    try {
        // Get a Pokemon so we can pre-fill the form:
        const pokemon = await getOnePokemon(req.params.pokedexNo);
        // Build me this HTML filled in with 'this' data:
        res.render('updateForm', {pokemon: pokemon});
    } catch (error) {
        res.send('<h1>Something went terribly awry.</h1>')
    }
})
// The second step - PUT a request to /pokemon/update/{pokedexNo}
// Take the number and the request body and give it to updatePokemon
// Having updated the pokemon, redirect the user to the update page for their pokemon (onePokemon.ejs):
// The following should be a PATCH:
router.put('/pokemon/update/:pokedexNo', async (req, res) => {
    try {
        const pokemon = await updatePokemon(req.params.pokedexNo, req.body);
        res.redirect('/pokemon/' + pokemon.PokedexNo);
    } catch (error) {
        res.send('<h1>Error updating Pokemon.</h1>');
    }
})

// This request comes in from the form!
router.post('/pokemon/create', async (req, res) => {
    try {
        // An empty object will be returned here in req.query
        // console.log(req.body); 
        // (req.body) should look something like this: {Name: "Me", PokedexNo: 9000, Type: "", Moves: []}
        req.body.Moves = req.body.Moves.split(',').map((move) => move.trim());
        await createPokemon(req.body);
        // Send them to the pokemon page for the one they just made
        res.redirect('/pokemon/' + req.body.PokedexNo);
    } catch (error) {
        res.status(500).send('<h1>That Pokemon could not be created.</h1><a href="/pokemon/create-pokemon">Try again.</a>');
        console.log(error);
    }
});

// When we receive a DELETE request for /pokemon/:pokedexNo:
// The browser is first sending a GET request to go to the page, pokemon/delete/:pokedexNo, which is why we don't have router.delete() here:
router.get('/pokemon/delete/:pokedexNo', async (req, res) => {
    try {
        await deletePokemon(req.params.pokedexNo);
        res.redirect('/pokemon');
    } catch (error) {
        res.status(500).send('<h1>Error: Pokémon already deleted.</h1>');
        console.log(error);
    }
});

// When we receive a GET request for /pokemon/:pokedexNo, render onePokemon.ejs with the pokemon with the requested PokedexNo:
router.get('/pokemon/:pokedexNo', async (req, res) => {
    try {
        const pokemon = await getOnePokemon(req.params.pokedexNo);
        if (!pokemon) {
            re.send('<h1>404 Pokémon Not Found</h1>');

            return;
        }

        const trainers = await getTrainersWhoHaveThisPokemon(pokemon._id);

        res.render('onePokemon', {pokemon: pokemon, trainers: '???'});
    } catch (error) {
        res.send('<h1>An error has occured</h1><a href="/">Go home.</a>');
        console.log('Error getting pokemon.')
    }
});

router.get('/trainers', async (req, res) => {
    try {
        const trainers = await getAllTrainers();
        res.render('trainers', {trainers: trainers});
    } catch (error) {
        res.send('<h1>Error getting all trainers</h1>');
        console.log(error);
    }
});

router.get('/trainers/:id', async (req, res) => {
    try {
        const trainer = await getOneTrainer(req.params.id);
        if(!trainer) {
            res.send('<h1>Trainer not found</h1><a href="/trainers">Back to the list.');

            return;
        };

        // Get all Pokemon whose ID is in this trainer's PokemonList:
        const pokemon = await getPokemonInTrainerList(trainer.PokemonList);
        console.log(pokemon);

        res.render('oneTrainer', {trainer: trainer, pokemon: pokemon});
    } catch (error) {
        res.send('<h1>Error getting this trainer</h1><a href="/trainers">Back to the list.</a>');
        console.log(error);
    }
});

// When the user submits the form, a request will come in to pokemon/create
    // When that happens, create the pokemon in the DB and send the user to /pokemon/{pokedexNo}

module.exports = router;