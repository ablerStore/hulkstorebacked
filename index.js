require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { coneccionDb } = require('./database/config');

const app = express();

app.use(cors())

coneccionDb();

//rutas
app.get( '/', (req, res) => {
    res.json({
        ok: true,
        msg: 'ok'
    })
});

app.listen( process.env.PORT, () => {
    console.log('Servidor OK')
} );