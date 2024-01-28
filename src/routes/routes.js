const express = require('express');
const { cadastrarUsuario } = require('../controllers/controllersUsers/cadastroUsuarioController');
const { listarCategorias } = require('../controllers/controllersCategory/categoriaController');
const verificarLogin = require('../middlewares/loginVerify');
const loginUsuario = require('../controllers/controllersUsers/loginController');
const editarUsuario = require('../controllers/controllersUsers/editarUsuario');
const { detalharUsuario } = require('../controllers/controllersUsers/detalharUsuarioController');
const { cadastrarProduto } = require('../controllers/controllersProduct/cadastrarProdutoController');
const detalharProduto = require('../controllers/controllersProduct/detalharProdutoController');
const { cadastrarCliente } = require('../controllers/controllersClients/cadastrarClienteController');
const { deletarProduto } = require('../controllers/controllersProduct/excluirProdutoController');
const { detalharCliente } = require('../controllers/controllersClients/detalharClienteController');
const { listarClientes } = require('../controllers/controllersClients/listarClientesController');
const editarProduto = require('../controllers/controllersProduct/editarProduto');
const { editarDadosCliente } = require('../controllers/controllersClients/editarClienteController');


const router = express.Router();


router.get('/categoria', listarCategorias);
router.post('/usuario', cadastrarUsuario);
router.post('/login', loginUsuario)
router.use(verificarLogin)
router.get('/usuario', detalharUsuario);
router.put('/usuario', editarUsuario)
router.post('/produto', cadastrarProduto)
<<<<<<< HEAD
=======

router.put('produto/:id', editarProduto)

>>>>>>> refs/remotes/origin/1.01
router.get('/produto/:id', detalharProduto)
router.post('/cliente', cadastrarCliente)
router.get('/cliente', listarClientes)
router.get('/cliente/:id', detalharCliente)
<<<<<<< HEAD
=======

router.put('/cliente/:id', editarDadosCliente);
>>>>>>> refs/remotes/origin/1.01
router.delete('/produto/:id', deletarProduto);

module.exports = router;
