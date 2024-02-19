import mongoose, { Document } from 'mongoose';
import { userHooks } from '../hooks/userHooks';

// Definir la interfaz del usuario
interface UserInterface extends Document {
    name: string;
    lastName: string;
    password: string;
    email: string;
    subscriptionDate?: Date;
    lastActivity?: Date;
}

// Definir el esquema del usuario
const userSchema = new mongoose.Schema<UserInterface>({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    subscriptionDate: { type: Date, default: () => new Date() },
    lastActivity: { type: Date, default: () => new Date() }
});

//aplicar hooks
userHooks(userSchema)

// Crear el modelo de usuario
const UserModel = mongoose.model<UserInterface>('User', userSchema);

export {UserInterface};
export default UserModel;
