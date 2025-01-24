// This file handles the routing for the client's API
const express = require('express');
// Import the getIndexPage function from viewController.js
const getIndexPage = require('../../controllers/client/viewsController');
// Create a router variable:
const router = express.Router();
// Write a router.get('/') to respond with index.ejs:
router.get('/', (req, res) => {
    res.render('index');
});

// Make the router variable accessible when other files import this file, viewRouter.js:
module.exports = router;