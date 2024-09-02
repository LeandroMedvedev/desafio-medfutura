const PessoaService = require('../services/pessoaService');

class PessoaController {
  static async criarPessoa(req, res) {
    try {
      const novaPessoa = await PessoaService.criarPessoa(req.body);
      return res.status(201).json(novaPessoa);
    } catch (erro) {
      return res.status(422).json({ mensagem: erro.message });
    }
  }

  static async obterPessoaPorId(req, res) {
    try {
      const pessoa = await PessoaService.obterPessoaPorId(req.params.id);
      if (!pessoa) {
        return res.status(404).json({ mensagem: 'Pessoa não encontrada' });
      }
      return res.status(200).json(pessoa);
    } catch (erro) {
      return res.status(400).json({ mensagem: erro.message });
    }
  }

  static async buscarPessoasPorTermo(req, res) {
    try {
      const termo = req.query.t;
      if (!termo) {
        return res
          .status(400)
          .json({ mensagem: 'Termo de busca não informado' });
      }
      const pessoas = await PessoaService.buscarPessoasPorTermo(termo);
      return res.status(200).json(pessoas);
    } catch (erro) {
      return res.status(400).json({ mensagem: erro.message });
    }
  }

  static async atualizarPessoa(req, res) {
    try {
      const pessoaAtualizada = await PessoaService.atualizarPessoa(
        req.params.id,
        req.body
      );
      return res.status(200).json(pessoaAtualizada);
    } catch (erro) {
      return res.status(422).json({ mensagem: erro.message });
    }
  }

  static async excluirPessoa(req, res) {
    try {
      await PessoaService.excluirPessoa(req.params.id);
      return res.status(204).end();
    } catch (erro) {
      return res.status(400).json({ mensagem: erro.message });
    }
  }
}

module.exports = PessoaController;
