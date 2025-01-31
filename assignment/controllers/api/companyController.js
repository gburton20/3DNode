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
        const newCompany = await WUIData.create(newCompanyFormData);

        return newCompany;
    } catch (error) {
        throw error;
    }
};
// Function which UPDATES ONE company in the DB:
const updateCompany = async (companyName, companyData) => {
    try {
        const updatedCompany = await WUIData.findOneAndUpdate(
            {companyName: companyName}, 
            companyData, 
            {upsert: true},
        );

        return updatedCompany;
    } catch (error) {
        throw error;
    }
};
// Function which DELETES ONE company is the DB:
const deleteCompany = async (companyName) => {
    try {
        
    } catch (error) {
        
    }
}
module.exports = {
    getAllCompanies, 
    getOneCompany,
    createCompany,
    updateCompany,
};