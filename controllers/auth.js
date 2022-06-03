const adminUser = true

exports.isAdmin = function (req, res, next) {
    if (process.env.debug) { console.log(`Admin User = ${adminUser}`) }

    if (adminUser) {
        next()
    } else {
        res.status(403).json({ error: -1, descripcion: `ruta [${req.baseUrl}] método [${req.method}] no autorizado` })
    }
}