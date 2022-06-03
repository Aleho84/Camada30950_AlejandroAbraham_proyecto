exports.not_implemented = function (req, res) {
    res.status(404).json({ error: -2, descripcion: `ruta [${req.baseUrl + req.url}] método [${req.method}] no implementada` })
}