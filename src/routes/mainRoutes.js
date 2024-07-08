const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const consultaController = require('../controllers/consultaController');


// Rutas
router.get('/',productoController.getHome);
router.get('/home',productoController.getHome);
router.get('/sobreNosotros',productoController.getSobreNosotros);
router.get('/admin', productoController.getAllProductos);
router.get('/shop', productoController.getAllProductosTienda);
router.post('/crearProducto', productoController.crearProducto);
router.get('/editarProducto/:id', productoController.editarProductoForm);
router.put('/editarProducto/:id', productoController.editarProducto);
router.post('/eliminarProducto/:id', productoController.eliminarProducto);

router.get('/contacto',consultaController.getContacto);
router.post('/crearConsulta',consultaController.crearConsulta);

module.exports = router;