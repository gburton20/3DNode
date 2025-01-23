const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');

const path = require('path');

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT} - THE SERVERS ARE ANXIOUS TO SERVE`);
});