const Pessoa = require('../models/Pessoa');

class PessoaService {
  async criarPessoa(dadosPessoa) {
    try {
      const novaPessoa = await Pessoa.criar(dadosPessoa);
      return novaPessoa;
    } catch (error) {
      throw new Error('Erro ao criar pessoa: ' + error.message);
    }
  }

  async obterPessoaPorId(id) {
    try {
      const pessoa = await Pessoa.buscarPorId(id);
      if (!pessoa) {
        throw new Error('Pessoa não encontrada.');
      }
      return pessoa;
    } catch (error) {
      throw new Error('Erro ao buscar pessoa: ' + error.message);
    }
  }

  async buscarPessoasPorTermo(termo) {
    try {
      const pessoas = await Pessoa.buscarPorTermo({
        where: {
          [Op.or]: [
            { apelido: { [Op.like]: `%${termo}%` } },
            { nome: { [Op.like]: `%${termo}%` } },
            { stack: { [Op.contains]: [termo] } },
          ],
        },
      });
      return pessoas;
    } catch (error) {
      throw new Error('Erro ao buscar pessoas: ' + error.message);
    }
  }

  async atualizarPessoa(id, dadosAtualizados) {
    try {
      const pessoa = await this.obterPessoaPorId(id);
      if (!pessoa) {
        throw new Error('Pessoa não encontrada.');
      }
      await pessoa.update(dadosAtualizados);
      return pessoa;
    } catch (error) {
      throw new Error('Erro ao atualizar pessoa: ' + error.message);
    }
  }

  async excluirPessoa(id) {
    try {
      const pessoa = await this.obterPessoaPorId(id);
      if (!pessoa) {
        throw new Error('Pessoa não encontrada.');
      }
      await pessoa.destroy();
    } catch (error) {
      throw new Error('Erro ao excluir pessoa: ' + error.message);
    }
  }
}

module.exports = new PessoaService();
