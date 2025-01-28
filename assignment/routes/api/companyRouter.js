const express = require('express');

const router = express.Router();
// Import the controller file ONCE and assign a variable name to its location in memory
const {
    getAllCompanies,
    getOneCompany,
    createCompany,
    updateCompany,
} = require('../../controllers/api/companyController');
//Write a GET method extension to get all company data
router.get('/', async (_, res) => {
    try {
        const companies = await getAllCompanies();
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
}); // End of GET request for ALL companies

// Write a GET method to get data on ONE company:
router.get('/:companyName', async (req, res) => {
    try {
        const company = await getOneCompany(req.params.companyName);

        if (!company) {
        return 'Failure,couldn\'t get data for this company';
        };

        res.status(200).json({
            message: 'Success!',
            payload: company,
        })
    } catch (error) {
        return 'Failure,couldn\'t get data for this company';
    }
}); // End of GET request for ONE company

// Write a POST request to create ONE company
router.post('/', async (req, res) => {
    try {
        const newCompany = await createCompany(req.body);
        res.status(200).json({
            message: 'Success',
            payload: newCompany,
        })
    } catch (error) {
        return 'Failure,couldn\'t get data for this company';
    }
}); // End of POST request to create ONE company

// Write a PATCH request to update ONE company:
router.patch('/:companyName', async (req, res) => {
    try {
        const updatedCompany = await updateCompany(req.params.companyName, req.body);
        res.status(200).json({
            message: 'Success',
            payload: updatedCompany,
        });
    } catch (error) {
        return 'Failure,couldn\'t update data for this company';
    }
}); // End of PATCH request to update ONE company

module.exports = router;