const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const packageJson = require('../package.json');
const dotenv = require('dotenv').config()

const swaggerApp = express();

//Documentacion Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: packageJson.name.toUpperCase(),
            version: packageJson.version,
            description: `DOCUMENTACION API - ${packageJson.description}`,
            contact: {
                name: packageJson.author.name,
                email: packageJson.author.email,
                url: packageJson.author.url
            }
        },
        servers: [{ url: `${process.env.serverProtocol}://${process.env.serverHost}:${process.env.serverPort}/` }]
    },
    apis: ['./routes/index.js', './routes/products.js', './routes/carts.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
swaggerApp.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = swaggerApp;