const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('./helpers/jwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {

        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
        return res.status(404).json({
                ok: false,
                msg: 'Usuario y/o password incorrecta!!!'
            });
        }

        const passwordEncrytado = bcrypt.compareSync( password, usuarioDB.password);
        if (!passwordEncrytado) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y/o password incorrecta!!!'
            });
        }

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ah ocurrido un error!!!'
        });
    }
}

module.exports = {
    login
}