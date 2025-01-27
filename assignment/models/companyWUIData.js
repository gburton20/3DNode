const mongoose = require('mongoose');

const companyWUISchema = new mongoose.Schema({
    companyName: {
        type: String,
        unique: true,
        required: true,
    },
    totalWUI: {
        type: Number,
        required: true,
    },
    hasWaterEfficiencyPlan: {
        type: Boolean,
        required: true,
    }
});

const WUIData = mongoose.model('Company', companyWUISchema);

module.exports = WUIData;