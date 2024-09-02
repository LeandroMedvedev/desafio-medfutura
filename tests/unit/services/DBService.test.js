const db = require('../../../config/db');
const DBService = require('../../../src/services/dbService');

jest.setTimeout(10000);

describe('DBService', () => {
  beforeAll(async () => {
    // Cria a tabela antes dos testes
    await new Promise((resolve, reject) => {
      db.run(
        `CREATE TABLE IF NOT EXISTS pessoas (
        id INTEGER PRIMARY KEY,
        apelido TEXT UNIQUE NOT NULL,
        nome TEXT NOT NULL,
        nascimento TEXT NOT NULL,
        stack TEXT
      );`,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  });

  afterEach(async () => {
    // Limpa a tabela após cada teste
    await new Promise((resolve, reject) => {
      db.run(`DELETE FROM pessoas;`, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  });

  test('criarPessoa: deve inserir uma pessoa corretamente', async () => {
    const mockPessoa = {
      apelido: 'Freckled',
      nome: 'Kate Austen',
      nascimento: '1989-01-01',
      stack: JSON.stringify(['C#', 'Angular']),
    };

    await DBService.criarPessoa(mockPessoa);

    const resultado = await DBService.obterPessoaPorId(1);
    resultado.stack = JSON.parse(resultado.stack);
    expect(resultado).toEqual(expect.objectContaining(mockPessoa));
  });

  test('obterPessoaPorId: deve obter os dados corretos pelo ID', async () => {
    const mockPessoa = {
      apelido: 'Freckled',
      nome: 'Kate Austen',
      nascimento: '1989-01-01',
      stack: JSON.stringify(['C#', 'Angular']),
    };

    await DBService.criarPessoa(mockPessoa);
    const resultado = await DBService.obterPessoaPorId(1);
    if (resultado) {
      resultado.stack = JSON.parse(resultado.stack);
    }
    expect(resultado).toEqual(expect.objectContaining(mockPessoa));
  });

  test('obterPessoasPorTermo: deve retornar os dados esperados na busca por termo', async () => {
    const mockPessoa = {
      apelido: 'Freckled',
      nome: 'Kate Austen',
      nascimento: '1989-01-01',
      stack: JSON.stringify(['C#', 'Angular']),
    };

    await DBService.criarPessoa(mockPessoa);
    const resultado = await DBService.obterPessoasPorTermo('Angular');
    resultado.forEach((pessoa) => {
      pessoa.stack = JSON.parse(pessoa.stack);
    });
    expect(resultado).toContainEqual(expect.objectContaining(mockPessoa));
  });

  test('atualizarPessoa: deve atualizar os dados de uma pessoa corretamente', async () => {
    const mockPessoa = {
      apelido: 'Freckled',
      nome: 'Kate Austen',
      nascimento: '1989-01-01',
      stack: JSON.stringify(['C#', 'Angular']),
    };

    await DBService.criarPessoa(mockPessoa);

    const updatedPessoa = {
      apelido: 'Time Traveler',
      nome: 'Desmond Hume',
      nascimento: '1986-01-01',
      stack: JSON.stringify(['C#', '.NET', 'SQL Server']),
    };

    await DBService.atualizarPessoa(1, updatedPessoa);
    const resultado = await DBService.obterPessoaPorId(1);
    if (resultado) {
      resultado.stack = JSON.parse(resultado.stack); // Ajusta a stack se necessário
    }
    expect(resultado).toEqual(expect.objectContaining(updatedPessoa));
  });

  test('excluirPessoa: deve excluir uma pessoa corretamente', async () => {
    const mockPessoa = {
      apelido: 'Freckled',
      nome: 'Kate Austen',
      nascimento: '1989-01-01',
      stack: ['C#', 'Angular'],
    };

    await DBService.criarPessoa(mockPessoa);
    await DBService.excluirPessoa(1);
    const resultado = await DBService.obterPessoaPorId(1);
    expect(resultado).toBeUndefined();
  });
});
