const db = require('../../config/db');

class DBService {
  criarPessoa(dados) {
    const { apelido, nome, nascimento, stack } = dados;
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO pessoas (apelido, nome, nascimento, stack) VALUES (?, ?, ?, ?)`,
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

  obterPessoaPorId(id) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM pessoas WHERE id = ?`, [id], (error, row) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(row);
        }
      });
    });
  }

  obterPessoasPorTermo(termo) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM pessoas WHERE apelido LIKE ? OR nome LIKE ? OR stack LIKE ?`,
        [`%${termo}%`, `%${termo}%`, `%${termo}%`],
        (error, rows) => {
          if (error) {
            reject(error.message);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  atualizarPessoa(id, dados) {
    const { apelido, nome, nascimento, stack } = dados;
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE pessoas SET apelido = ?, nome = ?, nascimento = ?, stack = ? WHERE id = ?`,
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

  excluirPessoa(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM pessoas WHERE id = ?`, [id], function (error) {
        if (error) {
          reject(error.message);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }
}

module.exports = new DBService();
