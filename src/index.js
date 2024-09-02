require('dotenv').config(); // Carregar variáveis de ambiente do .env
const express = require('express');
const registrador = require('./middlewares/registrador');
const tratamentoErros = require('./middlewares/tratamentoErros');
const pessoaRoutes = require('./routes/pessoaRoutes');

const app = express();

app.use(express.json());
app.use(registrador);
app.use('/api', pessoaRoutes);
app.use(tratamentoErros);

const port = process.env.PORT || 3000;

module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Aplicação rodando em http://localhost:${port}.`);
  });
}
