// config/db.mjs
import mongoose from 'mongoose';

export async function connect() {
    try {
        // Asegúrate de usar una URL local de MongoDB
        await mongoose.connect('mongodb://localhost:27017/Pais', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conexión exitosa a MongoDB en la base de datos pais');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
}
