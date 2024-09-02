require('dotenv').config();
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.resolve(__dirname, process.env.DB_PATH);

function criarBancoDeDadosSeNaoExistir() {
  return new Promise((resolve, reject) => {
    fs.access(dbPath, fs.constants.F_OK, (error) => {
      if (error) {
        // O arquivo não existe, criar base de dados
        const db = new sqlite3.Database(dbPath, (err) => {
          if (err) {
            reject(`Erro ao criar o banco de dados: ${err.message}`);
          } else {
            resolve(db);
          }
        });
      } else {
        // O arquivo já existe, apenas conectar
        const db = new sqlite3.Database(dbPath);
        resolve(db);
      }
    });
  });
}

function executarScript(schema, db) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.exec(schema, (error) => {
        if (error) {
          reject(`Erro ao executar o esquema SQL: ${error.message}`);
        } else {
          resolve('Base de dados inicializada com sucesso.');
        }
      });
    });
  });
}

// Função principal
(async () => {
  const schemaPath = path.join(__dirname, 'schema.sql');

  try {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    const db = await criarBancoDeDadosSeNaoExistir();
    await executarScript(schema, db);
    console.log('Base de dados inicializada com sucesso.');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
