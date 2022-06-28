const { Router } = require('express')
const router = Router()

//controllers
var auth = require('../controllers/auth.js')
var misc = require('../controllers/misc.js')
var carts_controller = require('../controllers/carts.js')

//routes
router.post('/', carts_controller.post_cart)
router.delete('/:id', carts_controller.delete_cart)
router.get('/:id/productos', carts_controller.get_cartProducts)
router.post('/:id/productos/:id_prod', carts_controller.post_cartProduct)
router.delete('/:id/productos/:id_prod', carts_controller.delete_cartProduct)
router.all('/*', misc.not_implemented)

module.exports = router

//getCartById
/**
 * @swagger
 *  paths:
 *   /API/carrito/{id}/productos:
 *     get:
 *       summary: Informacion sobre los productos de un carrito.
 *       description: Devuelve un JSON con la informacion de los productos de un carrito segun su ID.
 *       operationId: "getCartById"
 *       tags:
 *         - Carritos
 *       produces:
 *         - application/json
 *       parameters: 
 *         - name: id
 *           in: path
 *           required: true
 *           description: El ID del carrito
 *           schema:
 *             type: integer
 *             minimum: 1
 *             example: 1
 *       responses:
 *         "200":
 *           description: OK. La solicitud ha tenido éxito.
 *         "404":
 *           description: Not Found. No se encontró el carrito.
 *         "500":
 *           description: Internal Server Error. El servidor ha encontrado una situación que no sabe cómo manejarla.
 */

//postCart
/**
 * @swagger
 *  paths:
 *   /API/carrito/:
 *     post:
 *       summary: Crea un carrito nuevo
 *       description: Devuelve el ID del carrito nuevo.
 *       operationId: "postCart"
 *       tags:
 *         - Carritos
 *       produces:
 *         - application/json
 *       parameters: [] 
 *       responses:
 *         "200":
 *           description: OK. La solicitud ha tenido éxito.
 *         "500":
 *           description: Internal Server Error. El servidor ha encontrado una situación que no sabe cómo manejarla.
 */

//deleteCart
/**
 * @swagger
 *  paths:
 *   /API/carrito/{id}:
 *     delete:
 *       summary: Elimina un carrito.
 *       description: Devuelve un JSON con el ID del carrito eliminado.
 *       operationId: "deleteCart"
 *       tags:
 *         - Carritos
 *       produces:
 *         - application/json
 *       parameters: 
 *         - name: id
 *           in: path
 *           required: true
 *           description: El ID del carrito
 *           schema:
 *             type: integer
 *             minimum: 1
 *             example: 1
 *       responses:
 *         "200":
 *           description: OK. La solicitud ha tenido éxito.
 *         "404":
 *           description: Not Found. No se encontró el carrito.
 *         "500":
 *           description: Internal Server Error. El servidor ha encontrado una situación que no sabe cómo manejarla.
 */

//postProductInCart
/**
 * @swagger
 *  paths:
 *   /API/carrito/{id}/productos/{id_prod}:
 *     post:
 *       summary: Agrega un producto a un carrito.
 *       description: Devuelve un JSON con la info del carrito.
 *       operationId: "postProductInCart"
 *       tags:
 *         - Carritos
 *       produces:
 *         - application/json
 *       parameters: 
 *         - name: id
 *           in: path
 *           required: true
 *           description: El ID del carrito
 *           schema:
 *             type: integer
 *             minimum: 1
 *             example: 1
 *         - name: id_prod
 *           in: path
 *           required: true
 *           description: El ID del producto a agregar
 *           schema:
 *             type: integer
 *             minimum: 1
 *             example: 1
 *       responses:
 *         "200":
 *           description: OK. La solicitud ha tenido éxito.
 *         "404":
 *           description: Not Found. No se encontró el carrito o el producto.
 *         "500":
 *           description: Internal Server Error. El servidor ha encontrado una situación que no sabe cómo manejarla.
 */

//deleteProductInCart
/**
 * @swagger
 *  paths:
 *   /API/carrito/{id}/productos/{id_prod}:
 *     delete:
 *       summary: Elimina un producto de un carrito.
 *       description: Devuelve un JSON con la info del carrito.
 *       operationId: "deleteProductInCart"
 *       tags:
 *         - Carritos
 *       produces:
 *         - application/json
 *       parameters: 
 *         - name: id
 *           in: path
 *           required: true
 *           description: El ID del carrito
 *           schema:
 *             type: integer
 *             minimum: 1
 *             example: 1
 *         - name: id_prod
 *           in: path
 *           required: true
 *           description: El ID del producto a agregar
 *           schema:
 *             type: integer
 *             minimum: 1
 *             example: 1
 *       responses:
 *         "200":
 *           description: OK. La solicitud ha tenido éxito.
 *         "404":
 *           description: Not Found. No se encontró el carrito o el producto.
 *         "500":
 *           description: Internal Server Error. El servidor ha encontrado una situación que no sabe cómo manejarla.
 */