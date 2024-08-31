const express = require('express');
const pessoaRoutes = require('./routes/pessoaRoutes');
const Pessoa = require('./models/Pessoa');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(pessoaRoutes);

Pessoa.criarTabela();

app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}.`);
});
