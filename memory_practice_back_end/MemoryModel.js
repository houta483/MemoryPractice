const mysql = require('mysql');
require('dotenv').config();

console.log(process.env.host, process.env.user, process.env.password)

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password
})

connection.connect((err) => {
  if (err) throw err;
  else { console.log('connected') }
  
  const createDatabase = 'CREATE DATABASE IF NOT EXISTS memoryDB';
  const useDatabase = 'USE memoryDB';
  const createTable = 'CREATE TABLE IF NOT EXISTS memoryTable (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, numberOfDigits int, incorrectDigits VARCHAR(300), mistakenStringOfNums VARCHAR(2000), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)'

  connection.query(createDatabase, (err, result) => {
    if (err) throw err;
    // else { console.log(createDatabase) }
  })

  connection.query(useDatabase, (err, result) => {
    if (err) throw err;
    // else { console.log(useDatabase) }
  })

  connection.query(createTable, (err, result) => {
    if (err) throw err;
    // else { console.log(createTable) }
  })
})

module.exports = connection;