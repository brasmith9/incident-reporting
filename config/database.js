const { Pool } = require("pg");
require('dotenv').config();

    /*
    |--------------------------------------------------------------------------
    | Database Connection
    |--------------------------------------------------------------------------
    | Here is database connection setup for this application.
    | Database is etup with the Postgres db
    */

const pool = new Pool({
    
    user: process.env.DB_USERNAME || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'dbname',
    password: process.env.DB_PASSWORD || 'dbpassword',
    port: process.env.DB_PORT || 5432,

});

pool.connect();
module.exports = pool;