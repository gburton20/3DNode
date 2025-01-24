const express = require('express');

const router = express.Router();

const getAllWUIData = require('../../controllers/api/companyController');
//Write a GET method extension to get all company data
router.get('/', async (_, res) => {
    try {
        const companies = await getAllWUIData();
        res.status(200).json({
            message: 'Success',
            payload: companies,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failure',
            payload: 'Couldn\'t get all company data',
        });
    }
});

module.exports = router;