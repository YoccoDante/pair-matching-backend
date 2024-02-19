import mongoose, { Document, Schema } from 'mongoose';
import { smsHooks } from '../hooks/sms';

// Define la interfaz para el tipo de datos
interface ISms {
  phone: string;
  code: string;
  emition: Date;
  messageId: string;
}

// Define la interfaz para el documento (incluye métodos de instancia)
interface ISmsDocument extends ISms, Document {}

// Define el esquema
const SmsSchema = new Schema<ISmsDocument>({
  phone: { type: String, required: true },
  code: { type: String, required: true },
  emition: { type: Date, required: true, default: () => new Date() },
  messageId: { type: String, required: true}
});

// Hooks
smsHooks(SmsSchema)

// Define el modelo
const SmsModel = mongoose.model<ISmsDocument>('Sms', SmsSchema);

export {ISmsDocument}
export default SmsModel;