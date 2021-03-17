const { Client } = require('pg')

const client = new Client({
  user: process.env.DATABASE_USER || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  database: process.env.DATABASE_NAME || 'vozativabot',
  password: process.env.DATABASE_PASSWORD || 'secret',
  port: 5432,
  connectionTimeoutMillis: 10000,
  ssl: true
});

const getAdmins = () => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      if (err) {
        reject(err);
      } else {
        client.query('SELECT * FROM admins', (error, results) => {
          if (error) {
            client.end()
            reject(error);
          } else {
            client.end()
            resolve(results);
          }
        })
      }
    })
  })
}

const saveLog = (log) => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      if (err) {
        reject("Erro na conexão com o bd");
      } else {
        client.query('INSERT INTO logs (log) VALUES ($1)', [log], (error, results) => {
          if (error) {
            client.end()
            reject(error);
          }
          client.end()
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