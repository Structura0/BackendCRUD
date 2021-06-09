const mongoose = require('mongoose');

const modelo = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    cantidad: {
        type: String,
        require: true
    },
    total: {
        type: String,
        require: true
    },
    id_venta: {
        type: String,

    },
    id_producto: {
        type: String,
        require: true
    },
    producto: {
        type: String,
    },
    precio: {
        type: String,
    },
    nombre1: {
        type: String,
    },
    id_cliente: {
        type: String
    },
    nombre1: {
        type: String
    }
});
module.exports = mongoose.model('detventa', modelo);