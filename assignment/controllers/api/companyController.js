const WUIData = require('../../models/companyWUIData');
// Function which returns the entire WUIData collection:
const getAllWUIData = async () => {
    try {
        const company = await WUIData.find({});

        return company;
    } catch (error) {
        throw error;
    }
};

module.exports = getAllWUIData;