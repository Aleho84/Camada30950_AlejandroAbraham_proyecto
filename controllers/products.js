//product class
const Products = require('../bin/products_fs.js')
const products = new Products(process.env.productFilePath)

exports.get_products = function (req, res) {
    products.getAll()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

exports.get_product = function (req, res) {
    products.getById(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

exports.post_product = function (req, res) {
    let { name, description, code, picture, price, stock } = req.body
    let newProduct = { name, description, code, picture, price, stock }

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
}

exports.put_product = function (req, res) {
    let { name, description, code, picture, price, stock } = req.body
    let id = req.params.id
    let timestamp = new Date().toISOString()
    let updateProduct = { name, description, code, picture, price, stock, timestamp, id }

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
}

exports.delete_product = function (req, res) {
    let id = req.params.id

    products.delete(id)
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
}