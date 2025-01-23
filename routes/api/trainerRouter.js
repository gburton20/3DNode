// This file is responsible for all Trainer API routes:
const express = require('express');

const handleErrorResponse = require('./handleErrorResponse');
const {getAllTrainers, getOneTrainer} = require('../../controllers/trainerController');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const trainers = await getAllTrainers();
        res.status(200).json({
            message: 'success',
            payload: trainers,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const trainer = await getOneTrainer(req.params.id);
        // Guard statement for if no trainer exists
        if (!trainer) {
            handleErrorResponse(res, "No trainer found by that ID!", 404);

            return;
        }

        res.status(200).json({
            message: 'Success',
            payload: trainer,
        })
    } catch (error) {
        handleErrorResponse(res, error);
    }
});

module.exports = router;