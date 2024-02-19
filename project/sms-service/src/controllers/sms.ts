import { Request,Response } from 'express';
import SmsDao from '../dao/smsDao';
import SmsModel from '../models/smsModel';
import SmsService from '../services/sms';
import { SendSmsInteractor } from '../useCases/sms';

const sendSms = async (req:Request, res:Response) => {
    try {
        const {phoneNumber} = req.body
        const smsDao = new SmsDao(SmsModel)
        const smsService = new SmsService()
        const interactor = new SendSmsInteractor(smsDao, smsService)
        const messageData = await interactor.sendSms(phoneNumber)

        res.status(200).json(messageData)

    } catch (error:any) {
        res.status(400).json(`${error.message}`)
    }
}

export {sendSms}