const mongoose = require('mongoose');
const model = require('../models/detventa');
const producto = require('../models/producto');


//GET
exports.get = (req, res) => {
    model.find(req.params.id)
        .sort({ cantidad: 1, total: 1, id_venta: 1, id_producto: 1, producto: 1, precio: 1, nombre1: 1, id_cliente: 1 })
        .select('_id cantidad total id_venta id_producto producto precio nombre1 id_cliente')
        .exec()
        .then(result => {
            console.log(result);

            if (result) {
                res.status(200).json({
                    modelo: result,
                    filas: result.length,
                    error_estado: false,
                    error: '',
                    mensaje: 'ok'
                });
            } else {
                res.status(404).json({
                    model: null,
                    filas: 0,
                    error_estado: false,
                    error: '',
                    mensaje: '!NO EXISTE DATOS!'
                });
            }
        })
        .catch(ex => {
            console.log(ex);
            res.status(500).json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: ex,
                mensaje: '!ERROR¡'
            });
        });
}


exports.getId = (req, res) => {
        model.findOne({
                _id: req.params.id
            })
            .sort({ cantidad: 1, total: 1, id_venta: 1, id_producto: 1, producto: 1, precio: 1, nombre1: 1, id_cliente: 1 })
            .select('_id cantidad total id_venta id_producto producto precio nombre1 id_cliente')
            .exec()
            .then(result => {
                if (result) {
                    res.status(200).json({
                        modelo: result,
                        filas: 1,
                        error_estado: false,
                        error: '',
                        mensaje: '!OK¡'
                    });
                } else {
                    res.status(204).json({
                        modelo: null,
                        filas: 0,
                        error_estado: false,
                        error: '',
                        mensaje: '!NO EXISTE DATOS¡'
                    });
                }
            })
            .catch(ex => {
                console.log(ex);

                res.status(500).json({
                    modelo: null,
                    filas: 0,
                    error_estado: true,
                    error: ex,
                    mensaje: '!ERROR¡'
                });
            });
    }
    //POST
exports.post = (req, res) => {
        const Model = new model({
            _id: new mongoose.Types.ObjectId,
            cantidad: req.body.cantidad,
            total: req.body.total,
            id_venta: req.body.id_venta,
            id_producto: req.body.id_producto

        });

        console.log('----- model', Model);

        Model.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    modelo: {
                        _id: Model._id,
                        cantidad: Model.cantidad,
                        total: Model.total,
                        id_venta: Model.id_venta,
                        id_producto: Model.id_producto
                    },
                    filas: 1,
                    error_estado: false,
                    error: '',
                    mensaje: '!REGISTRO ADICIONADO¡'

                });
            })
            .catch(ex => {
                res.status(500).json({
                    modelo: null,
                    filas: 0,
                    error_estado: true,
                    error: ex,
                    mensaje: '!ERROR¡'
                });
            });
        console.log('SALIDA DEL POST');

    }
    //PATCH
exports.patch = (req, res) => {
    model.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        .exec()
        .then(result => {
            console.log(result);

            res.status(200).json({
                modelo: result,
                filas: 1,
                error_estado: false,
                error: '',
                mensaje: '!REGISTRO ACTUALIZADO¡'
            });
        })
        .catch(ex => {
            console.log(ex);
            res.status(500).json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: ex,
                mensaje: '!ERROR¡'
            })
        })
}

//DELETE
exports.delete = (req, res) => {
    model.remove({
            _id: req.params.id
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                modelo: null,
                filas: 0,
                error_estado: false,
                error: '',
                mensaje: '!REGISTRO ELIMINADO¡'
            });
        })
        .catch(ex => {
            console.log(ex);
            res.status(500).json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: '',
                mensaje: '!ERROR¡'
            });
        })
}

exports.get12 = (req, res, next) => {

    producto.findOne({ _id: req.params.id }, ).then(function(producto) {


            if (producto) {



                const Model = new model({
                    _id: new mongoose.Types.ObjectId,
                    id_producto: producto._id,
                    producto: producto.nombre,
                    precio: producto.precio,
                    cantidad: req.params.can.replace(/\"/g, ""),
                    total: req.params.can.replace(/\"/g, "") * producto.precio,
                    nombre1: producto.nombre1,
                    id_cliente: req.params.cli


                });

                console.log('----- model', Model);

                Model.save()

                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        modelo: {
                            _id: Model._id,
                            id_producto: Model.id_producto,
                            producto: Model.producto,
                            nombre1: Model.nombre1,
                            precio: Model.precio,
                            cantidad: Model.cantidad,
                            total: Model.total,



                        },
                        filas: 1,
                        error_estado: false,
                        error: '',
                        mensaje: '!REGISTRO ADICIONADO¡'

                    });
                })


            }



        })
        .catch(ex => {
            res.status(500).json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: ex,
                mensaje: '!ERROR¡'
            });
        });
    console.log('SALIDA DEL POST');
}
exports.getcli = (req, res) => {
    model.find({
            id_cliente: req.params.id
        })
        .sort({ cantidad: 1, total: 1, id_venta: 1, id_producto: 1, producto: 1, precio: 1, nombre1: 1, id_cliente: 1 })
        .select('_id cantidad total id_venta id_producto producto precio nombre1 id_cliente')
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    modelo: result,
                    filas: 1,
                    error_estado: false,
                    error: '',
                    mensaje: '!OK¡'
                });
            } else {
                res.status(204).json({
                    modelo: null,
                    filas: 0,
                    error_estado: false,
                    error: '',
                    mensaje: '!NO EXISTE DATOS¡'
                });
            }
        })
        .catch(ex => {
            console.log(ex);

            res.status(500).json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: ex,
                mensaje: '!ERROR¡'
            });
        });
}