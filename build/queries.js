"use strict";
var Pool = require('pg').Pool;
var pool = new Pool({
    user: 'ielts',
    host: 'localhost',
    database: 'ieltsUsers',
    password: 'password',
    port: 5432,
});
