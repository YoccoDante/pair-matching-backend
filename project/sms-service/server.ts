import express from 'express';
import bodyParser from 'body-parser';
import smsRouter from './src/routes/sms';
import SecretsClient from './src/clients/secrets';
import Database from './database';

const app = express();
const port = process.env.PORT || 3000;

// Inicializar SecretsClient y obtener la clave secreta
const secretsClient = SecretsClient.getInstance();
secretsClient.getSecretKey().then(() => {
    console.log('Secret key obtained');

    // Conectar a la base de datos
    const database = new Database();
    return database.connect();
}).then(() => {
    console.log('Database connected');

    // Middleware para parsear el cuerpo de las solicitudes
    app.use(bodyParser.json());

    // Configurar rutas
    app.use('/message', smsRouter)

    // Iniciar el servidor
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error(`Error: ${error}`);
});