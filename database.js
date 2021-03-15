const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DATABASE_USER || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  database: process.env.DATABASE_NAME || 'vozativabot',
  password: process.env.DATABASE_PASSWORD || 'secret',
  port: 5432,
  dialectOptions: {
    ssl: true
  },
})

const getAdmins = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM admins', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    })
  })
}

const saveLog = (log) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO logs (log) VALUES ($1)', [log], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    })
  })
}

module.exports = {
  getAdmins,
  saveLog
}