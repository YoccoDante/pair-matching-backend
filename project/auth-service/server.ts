import express from 'express';
import bodyParser from 'body-parser';
import Database from './database';
import { userRouter } from './src/routes/user';
import { authRouter } from './src/routes/auth';
import SecretsClient from './src/clients/secrets';

const app = express();
const port = process.env.PORT || 3000;

// Inicializar SecretsClient
const secretsClient = SecretsClient.getInstance();
secretsClient.getSecretKey().then(() => {
    // Conectar a la base de datos
    const database = new Database();
    database.connect().then(() => {
        // Iniciar el servidor
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }).catch((error) => {
        throw new Error(`${error.message}`)
    });
    console.log('Secret key obtained');
}).catch((error) => {
    console.error(`Error obtaining secret key: ${error}`);
});

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Configurar rutas
app.use('/user', userRouter);
app.use('/auth', authRouter);