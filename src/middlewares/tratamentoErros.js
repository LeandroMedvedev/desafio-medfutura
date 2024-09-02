const tratamentoErros = (error, _, response, _) => {
  console.error(error.stack);
  response.status(500).json({
    message: 'Algo deu errado. Por favor, tente novamente mais tarde.',
  });
};

module.exports = tratamentoErros;
