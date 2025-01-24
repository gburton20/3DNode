const mongoose = require('mongoose');
const dotenv = require('dotenv'); // space efficient to lines 2 and 4 alternative would be: const dotenv = require('dotenv').config();

dotenv.config(); 

const connectToMongoDb = async function () {
    mongoose.set('strictQuery', false);
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected!');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToMongoDb;