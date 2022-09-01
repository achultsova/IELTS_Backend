const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ielts',
  host: 'localhost',
  database: 'ieltsUsers',
  password: 'password',
  port: 5432,
})