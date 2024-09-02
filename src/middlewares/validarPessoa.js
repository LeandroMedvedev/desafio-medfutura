const validarPessoa = (request, response, next) => {
  const { apelido, nome, nascimento, stack } = request.body;

  if (!apelido || typeof apelido !== 'string' || apelido.length > 32) {
    return response.status(422).json({
      message:
        'Apelido é obrigatório, deve ser uma string e possuir no máximo 32 caracteres.',
    });
  }

  if (!nome || typeof nome !== 'string' || nome.length > 100) {
    return response.status(422).json({
      message:
        'Nome é obrigatório, deve ser uma string e possuir no máximo 100 caracteres.',
    });
  }

  if (!nascimento || !/^\d{4}-\d{2}-\d{2}$/.test(nascimento)) {
    return response.status(422).json({
      message: 'Nascimento é obrigatório e deve estar no formato AAAA-MM-DD.',
    });
  }

  if (
    stack &&
    (!Array.isArray(stack) ||
      stack.some((s) => typeof s !== 'string' || s.length > 32))
  ) {
    return response.status(422).json({
      message:
        'Stack deve ser um vetor de strings, cada string com no máximo 32 caracteres.',
    });
  }

  next();
};

module.exports = validarPessoa;
