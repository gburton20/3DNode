// This file handles the routing for the client's API
const express = require('express');
// Import the getIndexPage function from viewController.js
const getIndexPage = require('../../controllers/client/viewsController');
const {
    getAllCompanies,
    getOneCompany,
    createCompany,
    updateCompany,
} = require('../../controllers/api/companyController');

// Create a router variable:
const router = express.Router();

// Write a router.get('/') to respond with index.ejs:
router.get('/', (req, res) => {
    res.render('index');
});

// Write a router.get('/companies') to respond with allCompanies.ejs
router.get('/companies', async (req, res) => {
    try {
        const companies = await getAllCompanies();
        res.render('allCompanies', {companiesArray: companies});
    } catch (error) {
        res.send('<h1>An error has occurred</h1><a href="/">Go home.</a>');
        console.log(error);
    }
});
// Write a router.get('/companies/create-company') to respond with the create-company.ejs form for the user to input their data
router.get('/companies/create-company', (req, res) => {
    res.render('createCompanyForm');
}); // End of the GET the createCompanyForm .ejs form

// Write a router.get('/companies/:companyName') to respond with oneCompany.ejs
router.get('/companies/:companyName', async (req, res) => {
    try {
        const company = await getOneCompany(req.params.companyName);
        res.render('oneCompany', {companyName: company});
    } catch (error) {
        res.status(500).send('<h1>That company could not be created.</h1><a href="/pokemon/create-pokemon">Try again.</a>')
        console.log(error);
    }
}); // End of the GET ONE company request


// Write a router.post('/companies/createCompany') to respond with createCompanyForm.ejs
router.post('/companies/createCompany', async (req, res) => {
    try {
        await createCompany(req.body);
        res.redirect('/companies/' + req.body.companyName);
    } catch (error) {
        res.status(500).send('<h1>An error has occurred</h1><a href="/companies/create-company">Try again.</a>');
        console.log(error);
    }
}); // End of the POST ONE company method

// Write a router.patch('/companies/updateCompany') to respond with updateCompanyForm.ejs
// First, render the updateCompanyForm.ejs file
router.get('/companies/update-company/:companyName', async (req, res) => {
    try {
        const updateCompanyForm = await getOneCompany(req.params.companyName);
        res.render('updateCompanyForm', {companyName: updateCompanyForm});
    } catch (error) {
        res.send('<h1>Error updating this company</h1>');
    }
})
// Second, patch the update into the DB
router.patch('/companies/updateCompany/:companyName', async (req, res) => {
    try {
        const updatedCompany = await updateCompany(req.params.companyName, req.body);
        res.redirect('/companies/' + updatedCompany.companyName);
    } catch (error) {
        res.send('<h1>Error updating this company</h1>')
    }
});

// Make the router variable accessible when other files import this file, viewRouter.js:
module.exports = router;