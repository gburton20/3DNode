const WUIData = require('../../models/companyWUIData');
// Function which RETURNS ALL companies in the DB:
const getAllCompanies = async () => {
    try {
        const companies = await WUIData.find({});

        return companies;
    } catch (error) {
        throw error;
    }
};
// Function which RETURNS ONE company and its associated WUI data
const getOneCompany = async (companyName) => {
    try {
        const company = await WUIData.findOne({companyName: companyName});

        return company;
    } catch (error) {
        throw error;
    }
};
// Function which CREATES ONE company in the DB
const createCompany = async (newCompanyFormData) => {
    try {
        const company = await WUIData.create(newCompanyFormData);

        return company;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllCompanies, 
    getOneCompany,
    createCompany,
};