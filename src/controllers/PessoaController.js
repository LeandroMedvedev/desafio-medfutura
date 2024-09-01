const Pessoa = require('../models/Pessoa');

class PessoaController {
  static async criarPessoa(request, response) {
    try {
      const novaPessoa = await Pessoa.criar(request.body);
      response.status(201).json(novaPessoa);
    } catch (error) {
      response.status(422).json({ error });
    }
  }

  static async buscarPessoa(request, response) {
    try {
      const pessoa = await Pessoa.buscarPorId(request.params.id);
      if (!pessoa) {
        response.status(404).json({ message: 'Pessoa não encontrada' });
      } else {
        response.status(200).json(pessoa);
      }
    } catch (error) {
      response.status(400).json({ error });
    }
  }

  static async buscarPessoas(request, response) {
    try {
      const termo = request.query.t;
      if (!termo) {
        return response
          .status(400)
          .json({ message: 'Termo de busca não passado' });
      }
      const pessoas = await Pessoa.buscarPorTermo(termo);
      response.status(200).json(pessoas);
    } catch (error) {
      response.status(400).json({ error });
    }
  }

  static async atualizarPessoa(request, response) {
    try {
      const pessoaAtualizada = await Pessoa.atualizar(
        request.params.id,
        request.body
      );
      if (pessoaAtualizada.changes === 0) {
        response.status(404).json({ message: 'Pessoa não encontrada' });
      } else {
        response.status(200).json({ message: 'Pessoa atualizada com sucesso' });
      }
    } catch (error) {
      response.status(422).json({ error });
    }
  }

  static async excluirPessoa(request, response) {
    try {
      const resultado = await Pessoa.excluir(request.params.id);
      if (resultado.changes === 0) {
        response.status(404).json({ message: 'Pessoa não encontrada' });
      } else {
        response.status(204).send();
      }
    } catch (error) {
      response.status(400).json({ error });
    }
  }
}

module.exports = PessoaController;
