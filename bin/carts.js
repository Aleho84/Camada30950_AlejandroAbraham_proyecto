const fs = require('fs')
const resolve = require('path').resolve

class Carts {
    constructor(file, fileFormat) {
        this.file = file
        this.fileFormat = fileFormat
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
}

module.exports = Carts