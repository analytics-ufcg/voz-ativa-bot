const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DATABASE_HOST || 'localhost',
  user: process.env.DATABASE_USER || 'postgres',
  database: process.env.DATABASE_NAME || 'vozativabot',
  password: process.env.DATABASE_PASSWORD || 'secret',
  max: 20,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 2000,
  ssl: true
});

const getAdmins = () => {
  return new Promise((resolve, reject) => {
    pool.connect((error, client, release) => {
      if (error) {
        reject(error);
      } else {
        client.query('SELECT * FROM admins', (error, results) => {
          release();
          if (error) {
            reject(error.stack);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}

const saveLog = (log) => {
  return new Promise((resolve, reject) => {
    pool.connect((error, client, release) => {
      if (error) {
        reject(error);
      } else {
        client.query('INSERT INTO logs (log) VALUES ($1)', [log], (error, results) => {
          release();
          if (error) {
            reject(error);
          }
          resolve(results);
        })
      }
    })
  })
}

module.exports = {
  getAdmins,
  saveLog
}