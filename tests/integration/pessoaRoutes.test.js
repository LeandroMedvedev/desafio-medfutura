const request = require('supertest');
const app = require('../../src/index');
const db = require('../../config/db');
const DBService = require('../../src/services/dbService');

describe('Testes de Integração para a API de Pessoas', () => {
  let pessoaId;

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

  beforeEach(async () => {
    // Limpa a tabela antes de cada teste para garantir um estado consistente
    await DBService.excluirPessoa(1);
    await DBService.excluirPessoa(2);
  });

  test('POST /pessoas - deve criar uma nova pessoa', async () => {
    const novaPessoa = {
      apelido: 'Traveler',
      nome: 'John Doe',
      nascimento: '1990-01-01',
      stack: ['Node.js', 'Express'],
    };

    const resposta = await request(app)
      .post('/api/pessoas')
      .send(novaPessoa)
      .expect(201);

    pessoaId = resposta.body.id; // Guarda o ID da pessoa criada para testes subsequentes

    // Verifica se a resposta tem a estrutura correta
    expect(resposta.body).toMatchObject({
      apelido: novaPessoa.apelido,
      nome: novaPessoa.nome,
      nascimento: novaPessoa.nascimento,
      stack: JSON.stringify(novaPessoa.stack),
    });
  });

  test('GET /pessoas/:id - deve retornar a pessoa correta pelo ID', async () => {
    const novaPessoa = {
      apelido: 'Explorer',
      nome: 'Jane Doe',
      nascimento: '1992-01-01',
      stack: ['Python', 'Flask'],
    };

    const respostaPost = await request(app)
      .post('/api/pessoas')
      .send(novaPessoa)
      .expect(201);

    const pessoaId = respostaPost.body.id;

    const resposta = await request(app)
      .get(`/api/pessoas/${pessoaId}`)
      .expect(200);

    // Verifica se a resposta tem a estrutura correta
    expect(resposta.body).toMatchObject({
      apelido: novaPessoa.apelido,
      nome: novaPessoa.nome,
      nascimento: novaPessoa.nascimento,
      stack: JSON.stringify(novaPessoa.stack),
    });
  });

  test('GET /pessoas - deve retornar a lista de pessoas filtradas por termo', async () => {
    const novaPessoa1 = {
      apelido: 'Developer',
      nome: 'Alice Smith',
      nascimento: '1985-02-15',
      stack: ['JavaScript', 'React'],
    };

    const novaPessoa2 = {
      apelido: 'Programmer',
      nome: 'Bob Johnson',
      nascimento: '1988-03-22',
      stack: ['Java', 'Spring'],
    };

    await request(app).post('/api/pessoas').send(novaPessoa1).expect(201);

    await request(app).post('/api/pessoas').send(novaPessoa2).expect(201);

    const resposta = await request(app)
      .get('/api/pessoas?t=Developer')
      .expect(200);

    // Verifica se a resposta contém a pessoa filtrada
    expect(resposta.body).toHaveLength(1);
    expect(resposta.body[0]).toMatchObject({
      apelido: novaPessoa1.apelido,
      nome: novaPessoa1.nome,
      nascimento: novaPessoa1.nascimento,
      stack: JSON.stringify(novaPessoa1.stack),
    });
  });

  test('DELETE /pessoas/:id - deve excluir a pessoa corretamente', async () => {
    const novaPessoa = {
      apelido: 'DeleteMe',
      nome: 'Dave Brown',
      nascimento: '1990-06-15',
      stack: ['PHP', 'Laravel'],
    };

    const respostaPost = await request(app)
      .post('/api/pessoas')
      .send(novaPessoa)
      .expect(201);

    const pessoaId = respostaPost.body.id;

    await request(app).delete(`/api/pessoas/${pessoaId}`).expect(204);

    const respostaGet = await request(app)
      .get(`/api/pessoas/${pessoaId}`)
      .expect(404);

    expect(respostaGet.body).toEqual({ message: 'Pessoa não encontrada.' });
  });
});
