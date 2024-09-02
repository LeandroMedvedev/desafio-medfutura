const DBService = require('./dbService');

class PessoaService {
  async criarPessoa(dadosPessoa) {
    try {
      return await DBService.criarPessoa(dadosPessoa);
    } catch (error) {
      throw new Error('Erro ao criar pessoa: ' + error);
    }
  }

  async obterPessoaPorId(id) {
    try {
      const pessoa = await DBService.obterPessoaPorId(id);
      // if (!pessoa) throw new Error('Pessoa não encontrada.');
      return pessoa;
    } catch (error) {
      throw new Error('Erro ao buscar pessoa: ' + error);
    }
  }

  async obterPessoasPorTermo(termo) {
    try {
      return await DBService.obterPessoasPorTermo(termo);
    } catch (error) {
      throw new Error('Erro ao buscar pessoas: ' + error);
    }
  }

  async atualizarPessoa(id, dadosAtualizados) {
    try {
      await this.obterPessoaPorId(id);
      await DBService.atualizarPessoa(id, dadosAtualizados);
    } catch (error) {
      throw new Error('Erro ao atualizar pessoa: ' + error);
    }
  }

  async excluirPessoa(id) {
    try {
      await this.obterPessoaPorId(id);
      await DBService.excluirPessoa(id);
    } catch (error) {
      throw new Error('Erro ao excluir pessoa: ' + error);
    }
  }
}

module.exports = new PessoaService();
