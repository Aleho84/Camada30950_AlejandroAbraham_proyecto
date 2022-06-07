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