import express from 'express';
import bodyParser from 'body-parser';
import { connectToDatabase } from './database';
import { userRouter } from './src/routes/user';
import { authRouter } from './src/routes/auth';

const app = express();
const port = process.env.PORT || 3000;

// Conectar a la base de datos
connectToDatabase();

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Configurar rutas
app.use('/user', userRouter);
app.use('/auth', authRouter);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});