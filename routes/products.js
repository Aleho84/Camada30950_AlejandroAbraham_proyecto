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