const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
// path is OOB Express - we don't need to install it:
const path = require('path');

const viewsRouter = require('./routes/views/viewsRouter');
const pokemonRouter = require('./routes/api/pokemonRouter');
const trainerRouter = require('./routes/api/trainerRouter');
const connectToMongoDb = require('./database/connectToMongoDb');

const app = express();

// Middleware - make sure the router connections and/or request listeners go BELOW this middleware section:
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Setting key:value pairs for Express in the following lines:
// Sets the view engine key for our Express app to ejs. This tells Express to use EJS as its view engine. Any res.render calls will go through EJS before they are sent to the client browser. 'ejs' could be swapped out here for ejs alternatives
app.set('view engine', 'ejs');
// Sets the folder for rendering views as the current directory plus /views
app.set('views', path.join(__dirname, 'views'));
// Override some form-based requests to be PUT or DELETE, which browsers can't send
app.use(methodOverride('_method'));

//Routers are connected here:
app.use('/', viewsRouter); // an example of an index router
app.use('/api/v1/pokemon', pokemonRouter);
app.use('/api/vi/trainers', trainerRouter);

// Create the PORT:
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT} - THE SERVERS YEARN TO LISTEN`);
    connectToMongoDb();
});