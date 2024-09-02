const tratamentoErros = (error, request, response, next) => {
  console.error(error.stack);
  response.status(500).json({
    message: 'Algo deu errado. Por favor, tente novamente mais tarde.',
  });
};

module.exports = tratamentoErros;
