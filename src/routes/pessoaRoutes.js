const express = require('express');
const PessoaController = require('../controllers/PessoaController');
const router = express.Router();

router.post('/pessoas', PessoaController.criarPessoa);
router.get('/pessoas/:id'.PessoaController.buscarPessoa);
router.get('/pessoas', PessoaController.buscarPessoas);
router.put('/pessoas/:id', PessoaController.atualizarPessoa);
router.delete('/pessoas/:id', PessoaController.excluirPessoa);

module.exports = router;
