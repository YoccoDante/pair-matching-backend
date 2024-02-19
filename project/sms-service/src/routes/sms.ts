import express from 'express';
import { sendSms } from '../controllers/sms';

const smsRouter = express.Router()

smsRouter.post('/',sendSms)

export default smsRouter