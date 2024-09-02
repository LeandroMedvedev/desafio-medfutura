const PessoaService = require('../services/pessoaService');

const verificarId = async (request, response, next) => {
  const { id } = request.params;

  try {
    const pessoa = await PessoaService.obterPessoaPorId(id);

    if (!pessoa) {
      return response.status(404).json({ message: 'Pessoa não encontrada.' });
    }

    next();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
};

module.exports = verificarId;
