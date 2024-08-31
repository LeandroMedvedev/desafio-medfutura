const db = require('../../config/database');

class Pessoa {
  static criarTabela() {
    const sql = `
        CREATE TABLE IF NOT EXISTS pessoas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            apelido TEXT UNIQUE NOT NULL,
            nome TEXT NOT NULL,
            nascimento TEXT NOT NULL,
            stack TEXT;
        )`;

    db.run(sql);
  }

  static criar({ apelido, nome, nascimento, stack }) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO pessoas (apelido, nome, nascimento, stack)
        VALUES (?, ?, ?, ?);
        `;

      db.run(
        sql,
        [apelido, nome, nascimento, JSON.stringify(stack)],
        function (error) {
          if (error) {
            reject(error.message);
          } else {
            resolve({ id: this.lastID });
          }
        }
      );
    });
  }

  static buscarPorId(id) {
    return new Promise((resolve, reject) => {
      const sql = `
            SELECT * FROM pessoas WHERE id = ?;
        `;

      db.get(sql, [id], (error, row) => {
        if (error) {
          reject(error.message);
        } else {
          row ? resolve(row) : resolve(null);
        }
      });
    });
  }

  static buscarPorTermo(termo) {
    return new Promise((resolve, reject) => {
      const sql = `
            SELECT * FROM pessoas WHERE
            apelido LIKE ? OR
            nome LIKE ? OR
            stack LIKE ?
        `;

      const search = `%${termo}%`;

      db.all(sql, [search, search, search], (error, rows) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static atualizar(id, { apelido, nome, nascimento, stack }) {
    return new Promise((resolve, reject) => {
      const sql = `
            UPDATE pessoas SET apelido = ?, nome = ?, stack = ?
            WHERE id = ?;
        `;

      db.run(
        sql,
        [apelido, nome, nascimento, JSON.stringify(stack), id],
        function (error) {
          if (error) {
            reject(error.message);
          } else {
            resolve({ changes: this.changes });
          }
        }
      );
    });
  }

  static excluir(id) {
    return new Promise((resolve, reject) => {
      const sql = `
            DELETE FROM pessoas WHERE id = ?;
        `;

      db.run(sql, [id], function (error) {
        if (error) {
          reject(error.message);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }
}

module.exports = Pessoa;
