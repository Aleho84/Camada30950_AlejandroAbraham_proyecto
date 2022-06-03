const { Router, response } = require('express')
const router = Router()

//product class
const Products = require('../bin/products.js')
const products = new Products(process.env.productFilePath, process.env.productFileFormat)

//routes
router.get('/:id', (req, res) => {
    products.getById(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
})

router.post('/', (req, res) => {
    let { title, price, thumbnail } = req.body
    let newProduct = { title, price, thumbnail }

    products.add(newProduct)
        .then(response => {
            if (typeof response.status === 'undefined') {
                res.status(200).json(response)
            } else {
                res.status(response.status).json(response.message)
            }
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
})

router.put('/:id', (req, res) => {
    let { title, price, thumbnail } = req.body
    let id = req.params.id
    let updateProduct = { title, price, thumbnail, id }

    products.update(updateProduct)
        .then(response => {
            if (typeof response.status === 'undefined') {
                res.status(200).json(response)
            } else {
                res.status(response.status).json(response.message)
            }
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
})

module.exports = router