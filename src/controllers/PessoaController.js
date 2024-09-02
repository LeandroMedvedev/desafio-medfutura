const PessoaService = require('../services/pessoaService');

class PessoaController {
  static async criarPessoa(request, response) {
    try {
      const novaPessoa = await PessoaService.criarPessoa(request.body);
      return response.status(201).json(novaPessoa);
    } catch (error) {
      return response.status(422).json({ mensagem: error.message });
    }
  }

  static async obterPessoaPorId(request, response) {
    try {
      const pessoa = await PessoaService.obterPessoaPorId(request.params.id);
      return response.status(200).json(pessoa);
    } catch (error) {
      return response.status(400).json({ mensagem: error.message });
    }
  }

  static async obterPessoasPorTermo(request, response) {
    try {
      const termo = request.query.t;
      if (!termo) {
        return response
          .status(400)
          .json({ mensagem: 'Termo de busca não informado' });
      }
      const pessoas = await PessoaService.obterPessoasPorTermo(termo);
      return response.status(200).json(pessoas);
    } catch (error) {
      return response.status(400).json({ mensagem: error.message });
    }
  }

  static async atualizarPessoa(request, response) {
    try {
      const pessoaAtualizada = await PessoaService.atualizarPessoa(
        request.params.id,
        request.body
      );
      return response.status(200).json(pessoaAtualizada);
    } catch (error) {
      return response.status(422).json({ mensagem: error.message });
    }
  }

  static async excluirPessoa(request, response) {
    try {
      await PessoaService.excluirPessoa(request.params.id);
      return response.status(204).end();
    } catch (error) {
      return response.status(400).json({ mensagem: error.message });
    }
  }
}

module.exports = PessoaController;
