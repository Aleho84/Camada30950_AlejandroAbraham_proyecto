const { Router } = require('express')
const router = Router()

//controllers
var auth = require('../controllers/auth.js')
var misc = require('../controllers/misc.js')
var products_controller = require('../controllers/products.js')

//routes
router.get('/', products_controller.get_products)
router.get('/:id', products_controller.get_product)
router.post('/', auth.isAdmin, products_controller.post_product)
router.put('/:id', auth.isAdmin, products_controller.put_product)
router.delete('/:id', auth.isAdmin, products_controller.delete_product)
router.all('/*', misc.not_implemented)

module.exports = router

//getProducts
/**
 * @swagger
 *  paths:
 *   /API/productos/:
 *     get:
 *       summary: Informacion sobre todos los productos.
 *       description: Devuelve un JSON con la informacion de todos los productos.
 *       operationId: "getProducts"
 *       tags:
 *         - Productos
 *       produces:
 *         - application/json
 *       parameters: []
 *       responses:
 *         "200":
 *           description: OK. La solicitud ha tenido éxito.
 *         "500":
 *           description: Internal Server Error. El servidor ha encontrado una situación que no sabe cómo manejarla.
 */

//postProduct
/**
 * @swagger
 * paths:
 *   /API/productos/:
 *     post:
 *       summary: Agrega un producto.
 *       description: Devuelve un JSON con la informacion del producto agregado.
 *       operationId: "postProduct"
 *       tags:
 *         - Productos
 *       parameters: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       produces:
 *         - application/json
 *       responses:
 *         "200":
 *           description: OK. La solicitud ha tenido éxito.
 *         "400":
 *           description: Bad Request. Producto invalido.
 *         "500":
 *           description: Internal Server Error. El servidor ha encontrado una situación que no sabe cómo manejarla.
 */

//getProductById
/**
 * @swagger
 * paths:
 *   /API/productos/{id}:
 *     get:
 *       summary: Informacion sobre un productos.
 *       description: Devuelve un JSON con la informacion de un producto segun su ID.
 *       operationId: "getProductById"
 *       tags:
 *         - Productos
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: El ID del producto
 *           schema:
 *             type: integer
 *             minimum: 1
 *             example: 1
 *       produces:
 *         - application/json
 *       responses:
 *         "200":
 *           description: OK. La solicitud ha tenido éxito.
 *         "404":
 *           description: Not Found. No se encontró el producto.
 *         "500":
 *           description: Internal Server Error. El servidor ha encontrado una situación que no sabe cómo manejarla.
 */


//putProduct
/**
 * @swagger
 * paths:
 *   /API/productos/{id}:
 *     put:
 *       summary: Modifica un producto.
 *       description: Devuelve un JSON con la informacion del producto modificado.
 *       operationId: "putProduct"
 *       tags:
 *         - Productos
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: El ID del producto
 *           schema:
 *             type: integer
 *             minimum: 1
 *             example: 1
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       produces:
 *         - application/json
 *       responses:
 *         "200":
 *           description: OK. La solicitud ha tenido éxito.
 *         "404":
 *           description: Not Found. No se encontró el producto.
 *         "500":
 *           description: Internal Server Error. El servidor ha encontrado una situación que no sabe cómo manejarla.
 */

//deleteProduct
/**
 * @swagger
 * paths:
 *   /API/productos/{id}:
 *     delete:
 *       summary: Elimina un productos.
 *       description: Devuelve un JSON con la informacion del producto eliminado.
 *       operationId: "deleteProduct"
 *       tags:
 *         - Productos
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: El ID del producto
 *           schema:
 *             type: integer
 *             minimum: 1
 *             example: 1
 *       produces:
 *         - application/json
 *       responses:
 *         "200":
 *           description: OK. La solicitud ha tenido éxito.
 *         "404":
 *           description: Not Found. No se encontró el producto.
 *         "500":
 *           description: Internal Server Error. El servidor ha encontrado una situación que no sabe cómo manejarla.
 */