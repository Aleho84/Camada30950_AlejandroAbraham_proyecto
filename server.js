// *****************************************************
// *   PROYECTO FINAL - Segunda Entrega                *
// *   Alumno    : Alejandro Abraham                   *
// *****************************************************

const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

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
const _serverPort = process.env.serverPort || 8080
app.listen(_serverPort, error => {
    if (error) {
        console.log(`SERVER: Error al conectar [${error}]`)
        process.exit()
    } else {
        console.log(`SERVER: Conectado en el puerto ${_serverPort}`)
    }
})

//mongoose
exports.db_flag = false
const _mongooseUri = process.env.mongooseUri || 'mongodb://dev:asd123@192.168.0.3:27017/development'
mongoose.connect(_mongooseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error => {
    if (error) {
        console.log(`MONGODB: Error al conectar [${error}]`)
        process.exit()
    } else {
        console.log(`MONGODB: Conectado`)
    }
})
