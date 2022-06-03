//product class
const Products = require('../bin/products.js')
const products = new Products(process.env.productFilePath, process.env.productFileFormat)

exports.get_products_all = function (req, res) {
    products.getAll()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

exports.get_product_getById = function (req, res) {
    products.getById(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

exports.post_product_add = function (req, res) {
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

exports.put_product_update = function (req, res) {
    let { name, description, code, picture, price, stock } = req.body
    let id = req.params.id
    let timestamp = products.timeStamp()
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

exports.delete_product_byId = function (req, res) {
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

exports.get_no_implemented = function (req, res) {
    res.status(404).json({ error: -2, descripcion: `ruta [${req.url}] método [${req.method}] no implementada` })
}