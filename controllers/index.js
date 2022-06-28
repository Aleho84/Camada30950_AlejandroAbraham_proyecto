const packageJson = require('../package.json');

exports.get_index = function (req, res) {
    res.render('./pages/index', { title: packageJson.name.toUpperCase() })
}

exports.get_no_implemented = function (req, res) {
    res.status(404).json({ error: -2, descripcion: `ruta [${req.url}] método [${req.method}] no implementada` })
}