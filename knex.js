'use strict';

const environment = process.env.NODE_ENV || 'development';
const knexConfig = psqlConfig[environment];
const knex = require('knex')(knexConfig);

module.exports = knex;
