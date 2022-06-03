const { Router } = require('express')
const router = Router()

//controllers
var index_controller = require('../controllers/index.js');

//routes
router.get('/', index_controller.get_index)
router.get('/*', index_controller.get_no_implemented)

module.exports = router