const mongoose = require('mongoose');

const modelo = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre1: {
        type: String,
        require: true
    },
    nombreOriginal: {
        type: String,
        require: true
    },
    ext: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    precio: {
        type: String,
        require: true
    },
    entrada: {
        type: String,

    },
    salida: {
        type: String,

    },
    estado: {
        type: String,

    },
    categoria: {
        type: String,
        require: true
    }
});
module.exports = mongoose.model('producto', modelo);