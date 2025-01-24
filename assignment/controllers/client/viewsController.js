// Import the 'router' functions (GET/POST/DELETE/PATCH) from viewRouter.js and assign a variable, getIndexPage, to it
const getIndexPage = require('../../routes/client/viewsRouter');

// Export getIndexPage function from viewController.js so that other files can acccess this function when they import the viewController file:
module.exports = getIndexPage;