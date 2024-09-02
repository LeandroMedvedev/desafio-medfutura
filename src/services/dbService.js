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
            // Consultar a nova pessoa criada para retornar todos os detalhes
            db.get(
              `SELECT * FROM pessoas WHERE id = ?`,
              [this.lastID],
              (error, row) => {
                if (error) {
                  reject(error.message);
                } else {
                  resolve(row); // Retorna todos os detalhes da pessoa criada
                }
              }
            );
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
      // Verifica se a pessoa existe antes de atualizar
      db.get(`SELECT * FROM pessoas WHERE id = ?`, [id], (error, row) => {
        if (error) {
          return reject(error.message);
        }
        if (!row) {
          return reject('Pessoa não encontrada.');
        }

        // Atualiza a pessoa
        db.run(
          `UPDATE pessoas SET apelido = ?, nome = ?, nascimento = ?, stack = ? WHERE id = ?`,
          [apelido, nome, nascimento, JSON.stringify(stack), id],
          function (error) {
            if (error) {
              reject(error.message);
            } else {
              // Retorna a pessoa atualizada
              db.get(
                `SELECT * FROM pessoas WHERE id = ?`,
                [id],
                (error, updatedRow) => {
                  if (error) {
                    reject(error.message);
                  } else {
                    resolve(updatedRow);
                  }
                }
              );
            }
          }
        );
      });
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
