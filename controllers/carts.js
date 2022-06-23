const Carts = require('../bin/carts_fs.js')
const carts = new Carts(process.env.cartFilePath, process.env.productFilePath)

exports.post_cart = function (req, res) {
    carts.add()
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

exports.delete_cart = function (req, res) {
    let id = req.params.id

    carts.delete(id)
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

exports.get_cartProducts = function (req, res) {
    let id = req.params.id   

    carts.getCartProducts(id)
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

exports.post_cartProduct = function (req, res) {
    let id = req.params.id
    let id_prod = req.params.id_prod

    carts.postCartProducts(id, id_prod)
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

exports.delete_cartProduct = function (req, res) {
    let id = req.params.id
    let id_prod = req.params.id_prod

    carts.deleteCartProducts(id, id_prod)
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