'use strict';

module.exports = {

    development: {
        client: 'pg',
        connection: 'postgres://localhost/bookshelf_dev'
    },

    test: {
        client: 'pg',
        connection: 'postgres://localhost/bookshelf_test'
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    },
    pool: {
       min: 0,
       max: 1
   }
};
