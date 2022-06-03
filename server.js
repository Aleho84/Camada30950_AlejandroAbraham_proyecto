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
const rProducts = require('./routes/products.js')
app.use('/api/productos', rProducts)

app.get('/', (req, res) => {
    res.render('./pages/index', { title: 'SimCompras - API ' })
})

app.get('/*', (req, res) => {
    res.status(404).json({ error: -2, descripcion: `ruta [${req.url}] método [${req.method}] no implementada` })
})

//server
const _port = process.env.port || 8080
app.listen(_port, () => {
    console.log(`Server en puerto:${_port}`)
})