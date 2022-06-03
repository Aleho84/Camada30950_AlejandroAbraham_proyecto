const { Router } = require('express')
const router = Router()

//controllers
var auth = require('../controllers/auth.js');
var product_controller = require('../controllers/products.js');

//routes
router.get('/', product_controller.get_products_all)
router.get('/:id', product_controller.get_product_getById)
router.post('/', auth.isAdmin, product_controller.post_product_add)
router.put('/:id', auth.isAdmin, product_controller.put_product_update)
router.delete('/:id', auth.isAdmin, product_controller.delete_product_byId)
router.get('/*', product_controller.get_no_implemented)

module.exports = router