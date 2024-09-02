const express = require('express');
const registrador = require('./middlewares/registrador');
const tratamentoErros = require('./middlewares/tratamentoErros');
const pessoaRoutes = require('./routes/pessoaRoutes');
const Pessoa = require('./models/Pessoa');

const app = express();

app.use(express.json());
app.use(registrador); // Middleware para registrar as requisições
app.use('/api', pessoaRoutes);
app.use(tratamentoErros); // Middleware para tratamento de erros

Pessoa.criarTabela(); // Criar a tabela 'Pessoas' na base de dados, se não existir

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}.`);
});
