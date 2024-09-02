const Pessoa = require('../models/Pessoa');

const verificarId = async (request, response, next) => {
  const { id } = request.params;
  const pessoa = await Pessoa.buscarPorId(id);

  if (!pessoa) {
    return response.status(404).json({ message: 'Pessoa não encontrada.' });
  }

  request.pessoa = pessoa; // Passando o objeto pessoa para o próximo middleware
  next();
};

module.exports = verificarId;
