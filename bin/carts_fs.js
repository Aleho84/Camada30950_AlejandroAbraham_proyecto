const fs = require('fs')
const resolve = require('path').resolve

class Carts {
    constructor(file, pFile) {
        this.file = file
        this.fileFormat = 'utf-8'
        this.pfile = pFile
        this.pfileFormat = 'utf-8'
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

    async #readProductFile() {
        try {
            const path = resolve(this.pfile)
            return await fs.readFileSync(path, this.pFileFormat)
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

    async add() {
        try {
            let carts = []
            let newCart = {}

            await this.#readFile()
                .then(response => {
                    carts = JSON.parse(response)
                    newCart.id = (this.#getMaxID(carts) === -Infinity) ? 1 : this.#getMaxID(carts)
                    newCart.timestamp = new Date().toISOString()
                    newCart.products = []
                    carts.push(newCart)

                    this.#writeFile(carts)
                        .catch(error => {
                            throw error
                        })
                })
                .catch(error => {
                    throw error
                })

            return newCart.id
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

            let carts = []
            let deleteCart = []
            let findCart = []

            await this.#readFile()
                .then(response => {
                    carts = JSON.parse(response)
                    findCart = carts.find(c => c.id === id)

                    if (!(typeof findCart === 'undefined')) {
                        deleteCart = carts.filter(c => c.id !== id)

                        this.#writeFile(deleteCart)
                            .catch(error => {
                                throw error
                            })
                    }
                })
                .catch(error => {
                    throw error
                })

            if (!(typeof findCart === 'undefined')) {
                return findCart
            } else {
                return { status: 202, message: 'Carrito no encontrado' }
            }
        } catch (error) {
            throw error
        }
    }

    async getCartProducts(id) {
        try {
            id = parseInt(id)

            if (isNaN(id)) {
                return { status: 400, message: 'ID invalido' }
            }

            let carts = []
            let findCart = []

            await this.#readFile()
                .then(response => {
                    carts = JSON.parse(response)
                    findCart = carts.find(c => c.id === id)
                })
                .catch(error => {
                    throw error
                })

            if (!(typeof findCart === 'undefined')) {
                return findCart.products
            } else {
                return { status: 202, message: 'Carrito no encontrado' }
            }

        } catch (error) {
            throw error
        }
    }

    async postCartProducts(id, id_prod) {
        try {
            id = parseInt(id)
            id_prod = parseInt(id_prod)

            if (isNaN(id)) {
                return { status: 400, message: 'ID de carrito invalido' }
            } else if (isNaN(id_prod)) {
                return { status: 400, message: 'ID de producto invalido' }
            }

            let carts = []
            let products = []
            let findCart = []
            let findProduct = []

            await this.#readFile()
                .then(response => {
                    carts = JSON.parse(response)
                    findCart = carts.find(c => c.id === id)

                    if (!(typeof findCart === 'undefined')) {
                        this.#readProductFile()
                            .then(response => {
                                products = JSON.parse(response)
                                findProduct = products.find(p => p.id === id_prod)

                                if (!(typeof findProduct === 'undefined')) {
                                    findCart.products.push(findProduct)
                                    carts = carts.filter(c => c.id !== id)
                                    carts.push(findCart)
                                    carts = carts.sort((a, b) => {
                                        if (a.id > b.id) { return 1 }
                                        if (a.id < b.id) { return -1 }
                                        return 0
                                    })

                                    this.#writeFile(carts)
                                        .catch(error => {
                                            throw error
                                        })
                                }
                            })
                            .catch(error => {
                                throw error
                            })
                    }
                })
                .catch(error => {
                    throw error
                })

            if (typeof findCart === 'undefined') {
                return { status: 202, message: 'Carrito no encontrado' }
            } else if (typeof findProduct === 'undefined') {
                return { status: 202, message: 'Producto a agregar no encontrado' }
            } else {
                return carts
            }
        } catch (error) {
            throw error
        }
    }

    async deleteCartProducts(id, id_prod) {
        try {
            id = parseInt(id)
            id_prod = parseInt(id_prod)

            if (isNaN(id)) {
                return { status: 400, message: 'ID de carrito invalido' }
            } else if (isNaN(id_prod)) {
                return { status: 400, message: 'ID de producto invalido' }
            }

            let carts = []
            let findCart = []
            let findProduct = []

            await this.#readFile()
                .then(response => {
                    carts = JSON.parse(response)
                    findCart = carts.find(c => c.id === id)

                    if (!(typeof findCart === 'undefined')) {
                        findProduct = findCart.products.find((p => p.id === id_prod))
                        if (!(typeof findProduct === 'undefined')) {
                            findCart.products = findCart.products.filter((p => p.id !== id_prod))

                            carts = carts.filter(c => c.id !== id)
                            carts.push(findCart)
                            carts = carts.sort((a, b) => {
                                if (a.id > b.id) { return 1 }
                                if (a.id < b.id) { return -1 }
                                return 0
                            })

                            this.#writeFile(carts)
                                .catch(error => {
                                    throw error
                                })
                        }
                    }
                })
                .catch(error => {
                    throw error
                })

            if (typeof findCart === 'undefined') {
                return { status: 202, message: 'Carrito no encontrado' }
            } else if (typeof findProduct === 'undefined') {
                return { status: 202, message: 'Producto a eliminar no encontrado' }
            } else {
                return findCart
            }
        } catch (error) {
            throw error
        }
    }
}

module.exports = Carts