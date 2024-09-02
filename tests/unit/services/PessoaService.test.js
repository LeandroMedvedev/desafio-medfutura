const PessoaService = require('../../../src/services/pessoaService');
const DBService = require('../../../src/services/dbService');

jest.mock('../../../src/services/dbService');

describe('PessoaService', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa todos os mocks após cada teste
  });

  test('criarPessoa: deve criar uma pessoa corretamente', async () => {
    const mockPessoa = {
      apelido: 'Freckled',
      nome: 'Kate Austen',
      nascimento: '1989-01-01',
      stack: ['C#', 'Angular'],
    };

    DBService.criarPessoa.mockResolvedValue({ id: 1 });

    const resultado = await PessoaService.criarPessoa(mockPessoa);

    expect(DBService.criarPessoa).toHaveBeenCalledWith(mockPessoa);
    expect(resultado).toEqual({ id: 1 });
  });

  test('obterPessoaPorId: deve obter uma pessoa corretamente pelo ID', async () => {
    const mockPessoa = {
      id: 1,
      apelido: 'Freckled',
      nome: 'Kate Austen',
      nascimento: '1989-01-01',
      stack: ['C#', 'Angular'],
    };

    DBService.obterPessoaPorId.mockResolvedValue(mockPessoa);

    const resultado = await PessoaService.obterPessoaPorId(1);

    expect(DBService.obterPessoaPorId).toHaveBeenCalledWith(1);
    expect(resultado).toEqual(mockPessoa);
  });

  test('obterPessoasPorTermo: deve retornar os resultados esperados na busca por termo', async () => {
    const mockPessoas = [
      {
        id: 1,
        apelido: 'Freckled',
        nome: 'Kate Austen',
        nascimento: '1989-01-01',
        stack: ['C#', 'Angular'],
      },
      {
        id: 2,
        apelido: 'White Girl',
        nome: 'Juliet Burke',
        nascimento: '1985-02-01',
        stack: ['Python', 'Angular'],
      },
    ];

    DBService.obterPessoasPorTermo.mockResolvedValue(mockPessoas);

    const resultado = await PessoaService.obterPessoasPorTermo('Angular');

    expect(DBService.obterPessoasPorTermo).toHaveBeenCalledWith('Angular');
    expect(resultado).toEqual(mockPessoas);
  });

  test('atualizarPessoa: deve atualizar os dados de uma pessoa corretamente', async () => {
    const mockPessoa = {
      id: 1,
      apelido: 'Doctor',
      nome: 'Jack Shephard',
      nascimento: '1985-11-01',
      stack: ['C++', 'Vue.js'],
    };

    DBService.obterPessoaPorId.mockResolvedValue(mockPessoa);
    DBService.atualizarPessoa.mockResolvedValue();

    await PessoaService.atualizarPessoa(1, mockPessoa);

    expect(DBService.obterPessoaPorId).toHaveBeenCalledWith(1);
    expect(DBService.atualizarPessoa).toHaveBeenCalledWith(1, mockPessoa);
  });
});
