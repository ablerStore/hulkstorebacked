const mongoose = require('mongoose');
const coneccionDb = async() => {
    try {
        await mongoose.connect(process.env.DB_STRING, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('BD en linea');
    } catch (error) {
        console.log(error);
        throw new Error('No se puede conectar a la DB');
    }

}

module.exports = {
    coneccionDb: coneccionDb
}