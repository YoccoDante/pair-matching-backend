import express from 'express';
import bodyParser from 'body-parser';
import { connectToDatabase } from './database';
import smsRouter from './src/routes/sms';

const app = express();
const port = process.env.PORT || 3001;

// Conectar a la base de datos
connectToDatabase();

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Configurar rutas
app.use('/message', smsRouter)

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});