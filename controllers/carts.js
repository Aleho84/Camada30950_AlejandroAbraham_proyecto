const Carts = require('../bin/carts.js')
const carts = new Carts(process.env.cartFilePath, process.env.cartFileFormat)

exports.post_cart = function (req, res) {
    res.status(404).json({ info: `[${req.baseUrl}] en desarrollo` })
}

exports.delete_cart = function (req, res) {
    res.status(404).json({ info: `[${req.baseUrl}] en desarrollo` })
}

exports.get_cart = function (req, res) {
    res.status(404).json({ info: `[${req.baseUrl}] en desarrollo` })
}

exports.post_cart_addProduct = function (req, res) {
    res.status(404).json({ info: `[${req.baseUrl}] en desarrollo` })
}

exports.delete_cart_removeProduct = function (req, res) {
    res.status(404).json({ info: `[${req.baseUrl}] en desarrollo` })
}