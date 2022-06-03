const { Router, response } = require('express')
const router = Router()

//product class
const Products = require('../bin/products.js')
const products = new Products(process.env.productFilePath, process.env.productFileFormat)
const adminUser = true

//middlewares
function isAdmin(req, res, next) {
    if (process.env.debug) { console.log(`Admin User = ${adminUser}`) }

    if (adminUser) {
        next()
    } else {
        res.status(403).json({ error: -1, descripcion: `ruta [${req.baseUrl}] método [${req.method}] no autorizado` })
    }
}

//routes
router.get('/', (req, res) => {
    products.getAll()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
})

router.get('/:id', (req, res) => {
    products.getById(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
})

router.post('/', isAdmin, (req, res) => {
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
})

router.put('/:id', isAdmin, (req, res) => {
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
})

router.delete('/:id', isAdmin, (req, res) => {
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
})

module.exports = router