const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../', process.env.DB_PATH);

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error('Erro ao conectar à base de dados:', error.message);
  } else {
    console.log('Conectado à base de dados SQLite.');
  }
});

module.exports = db;
