const { Router } = require('express')
const router = Router()

//controllers
var index_controller = require('../controllers/index.js')

//routes
router.get('/', index_controller.get_index)
router.all('/*', index_controller.get_no_implemented)

module.exports = router

/// SWAGGER [Server] ///
/**
 * @swagger
 * tags:
 *   - name: Productos
 *     description: Productos de SimCompras.
 *   - name: Carritos
 *     description: Carritos de SimCompras.
 */

/// SWAGGER MODELS///
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Bombon BON O BON Blanco
 *         description:
 *           type: string
 *           example: Bombon BON O BON Blanco X 1 Unidad
 *         code:
 *           type: string
 *           example: 77961815
 *         picture:
 *           type: string
 *           format: uri
 *           example: https://static.cotodigital3.com.ar/sitios/fotos/full/00118600/00118609.jpg?3.0.137b
 *         price:
 *           type: number
 *           minimum: 0
 *           example: 40.49
 *         stock:
 *           type: integer
 *           minimum: 0
 *           example: 120
 */