require('dotenv').config(); // Carregar variáveis de ambiente do .env
const sqlite3 = require('sqlite3').verbose();
const isTestEnvironment = process.env.NODE_ENV === 'test';
const path = require('path');
const dbPath = path.resolve(__dirname, '../', process.env.DB_PATH);

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error('Erro ao conectar à base de dados:', error.message);
  } else if (!isTestEnvironment) {
    console.log('Conectado à base de dados SQLite.');
  }
});

module.exports = db;
