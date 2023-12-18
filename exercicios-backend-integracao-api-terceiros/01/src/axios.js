const axios = require('axios');
require('dotenv').config({path:'../.env'});
const apiKey = process.env.API_KEY;

const instanciaAxios = axios.create({
    baseURL: 'https://companyenrichment.abstractapi.com/v1',
    params: {
        api_key: apiKey,   
    }
})

module.exports = instanciaAxios;