// *****************************************************
// *   PROYECTO FINAL - Primera Entrega                *
// *   Alumno    : Alejandro Abraham                   *
// *****************************************************

const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))

//view
app.set('views', './views')
app.set('view engine', 'ejs')

//error handler
app.use(function (err, req, res, next) {
    res.status(500).json({
        code: err.code,
        message: err.message,
        stack: err.stack
    })
})

//rutas
const products_routes = require('./routes/products.js')
app.use('/api/productos', products_routes)

const carts_routes = require('./routes/carts.js')
app.use('/api/carrito', carts_routes)

const index_routes = require('./routes/index.js')
app.use('/', index_routes)

//server
const _port = process.env.port || 8080
app.listen(_port, () => {
    console.log(`Server en puerto:${_port}`)
})