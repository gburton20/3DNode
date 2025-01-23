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
    isWaterEfficiencyPlan: {
        type: Boolean,
        required: true,
    }
});

const WUIData = mongoose.model('Company Listing', companyWUISchema);