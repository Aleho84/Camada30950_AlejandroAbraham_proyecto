const fs = require('fs')
const resolve = require('path').resolve

class Products {
    constructor(file) {
        this.file = file
        this.fileFormat = 'utf-8'
    }

    async #writeFile(data) {
        try {
            const path = resolve(this.file)
            await fs.writeFileSync(path, JSON.stringify(data, null, 2))
            return { message: `exito al escribir el archivo ${this.file}` }
        } catch (error) {
            throw error
        }
    }

    async #readFile() {
        try {
            const path = resolve(this.file)
            return await fs.readFileSync(path, this.fileFormat)
        } catch (error) {
            throw error
        }
    }

    async #deleteFile(filePath) {
        try {
            const path = resolve(filePath)
            await fs.unlinkSync(path)
            return { message: `exito al eliminar el archivo ${path}` }
        } catch (error) {
            throw error
        }
    }

    #getMaxID(products) {
        let listID = products.map(products => products.id)
        let maxID = Math.max(...listID)
        maxID += 1
        return maxID
    }

    #isJSON(data) {
        try {
            if (data === '') { return false }
            JSON.parse(data)
            return true
        } catch (error) {
            return false
        }
    }

    validateProduct(product) {
        //valida que el producto a agregar tenga los campos correctos.
        let { name, description, code, picture, price, stock } = product

        if (process.env.debug) {
            console.log('VALIDANDO PRODUCTO')
            console.log(`name = ${name} ${typeof name}`)
            console.log(`description = ${description} ${typeof description}`)
            console.log(`code = ${code} ${typeof code}`)
            console.log(`picture = ${picture} ${typeof picture}`)
            console.log(`price = ${price} ${typeof price}`)
            console.log(`stock = ${stock} ${typeof stock}`)
        }

        if (typeof name === 'undefined') { return false }
        if (typeof description === 'undefined') { return false }
        if (typeof code === 'undefined') { return false }
        if (typeof picture === 'undefined') { return false }
        if (typeof price === 'undefined') { return false }
        if (typeof stock === 'undefined') { return false }

        if (!product.hasOwnProperty('name')) { return false }
        if (!product.hasOwnProperty('description')) { return false }
        if (!product.hasOwnProperty('code')) { return false }
        if (!product.hasOwnProperty('picture')) { return false }
        if (!product.hasOwnProperty('price')) { return false }
        if (!product.hasOwnProperty('stock')) { return false }

        if (!(typeof name === 'string')) { return false }
        if (!(typeof description === 'string')) { return false }
        if (!(typeof code === 'string')) { return false }
        if (!(typeof picture === 'string')) { return false }
        if (!(typeof price === 'number')) { return false }
        if (!(typeof stock === 'number')) { return false }

        if (name === null) { return false }
        if (description === null) { return false }
        if (code === null) { return false }
        if (picture === null) { return false }
        if (price === null) { return false }
        if (stock === null) { return false }

        if (name === '') { return false }
        if (description === '') { return false }
        if (code === '') { return false }
        if (picture === '') { return false }
        if (price === '') { return false }
        if (stock === '') { return false }

        if (isNaN(price)) { return false }
        if (isNaN(stock)) { return false }

        return true
    }

    async getAll() {
        try {
            let products = []

            await this.#readFile()
                .then(response => {
                    products = JSON.parse(response)
                })
                .catch(error => {
                    throw error
                })

            return products
        } catch (error) {
            throw error
        }
    }

    async getById(id) {
        try {
            if (isNaN(id)) {
                return { status: 400, message: 'ID invalido' }
            } else {
                id = parseInt(id)
            }

            let product = {}

            await this.#readFile()
                .then(response => {
                    product = JSON.parse(response).find(p => p.id === id)
                })
                .catch(error => {
                    throw error
                })

            if (typeof product === 'undefined') {
                return { status: 202, message: 'Producto no encontrado' }
            } else {
                return product
            }
        } catch (error) {
            throw error
        }
    }

    async add(newProduct) {
        try {
            newProduct.price = parseFloat(newProduct.price)
            newProduct.stock = parseInt(newProduct.stock)

            if (!this.validateProduct(newProduct)) {
                return { status: 400, message: 'Producto invalido' }
            }

            let products = []

            await this.#readFile()
                .then(response => {
                    products = JSON.parse(response)
                    newProduct.timestamp = new Date().toISOString()
                    newProduct.id = (this.#getMaxID(products) === -Infinity) ? 1 : this.#getMaxID(products)
                    products.push(newProduct)

                    this.#writeFile(products)
                        .catch(error => {
                            throw error
                        })
                })
                .catch(error => {
                    throw error
                })

            return newProduct
        } catch (error) {
            throw error
        }
    }

    async update(product) {
        try {
            product.id = parseInt(product.id)
            product.stock = parseInt(product.stock)
            product.price = parseFloat(product.price)

            if (!this.validateProduct(product)) {
                return { status: 400, message: 'Producto invalido' }
            }

            if (isNaN(product.id)) {
                return { status: 400, message: 'ID invalido' }
            }

            let products = []
            let updateProducts = []
            let findProduct = []

            await this.#readFile()
                .then(response => {
                    products = JSON.parse(response)                    
                    findProduct = products.find(p => p.id === product.id)

                    if (!(typeof findProduct === 'undefined')) {
                        updateProducts = products.map(p => {
                            if (p.id === product.id) {
                                return product
                            } else {
                                return p
                            }
                        })

                        this.#writeFile(updateProducts)
                            .catch(error => {
                                throw error
                            })
                    }
                })
                .catch(error => {
                    throw error
                })

            if (!(typeof findProduct === 'undefined')) {
                return product
            } else {
                return { status: 202, message: 'Producto no encontrado' }
            }
        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        try {
            id = parseInt(id)

            if (isNaN(id)) {
                return { status: 400, message: 'ID invalido' }
            }

            let products = []
            let deleteProducts = []
            let findProduct = []

            await this.#readFile()
                .then(response => {
                    products = JSON.parse(response)
                    findProduct = products.find(p => p.id === id)

                    if (!(typeof findProduct === 'undefined')) {
                        deleteProducts = products.filter(p => p.id !== id)

                        this.#writeFile(deleteProducts)
                            .catch(error => {
                                throw error
                            })
                    }
                })
                .catch(error => {
                    throw error
                })

            if (!(typeof findProduct === 'undefined')) {
                return findProduct
            } else {
                return { status: 202, message: 'Producto no encontrado' }
            }
        } catch (error) {
            throw error
        }
    }
}

module.exports = Products