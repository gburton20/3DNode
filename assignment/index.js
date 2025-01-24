const express = require('express');
const logger = require('morgan');
// const methodOverride = require('method-override');

const path = require('path');

const viewsRouter = require('./routes/client/viewsRouter');
const companyRouter = require('./routes/api/companyRouter');
const connectToMongoDb = require('./database/connectToMongoDB');

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
// Write middleware for setting the view engine to ESJ and the views to look at './views/':
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Import the viewsRouter.js file and assign the home URL, '/', as its event listener
app.use('/', viewsRouter);
app.use('/api/v1/allcompanies', companyRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT} - THE SERVERS ARE ANXIOUS TO SERVE`);
    connectToMongoDb();
});