const express = require('express');
const PessoaController = require('../controllers/PessoaController');
const validarPessoa = require('../middlewares/validarPessoa');
const verificarId = require('../middlewares/verificarId');
const router = express.Router();

router.post('/pessoas', validarPessoa, PessoaController.criarPessoa);
router.get('/pessoas/:id', verificarId, PessoaController.buscarPessoa);
router.get('/pessoas', PessoaController.buscarPessoas);
router.put(
  '/pessoas/:id',
  verificarId,
  validarPessoa,
  PessoaController.atualizarPessoa
);
router.delete('/pessoas/:id', verificarId, PessoaController.excluirPessoa);

module.exports = router;
