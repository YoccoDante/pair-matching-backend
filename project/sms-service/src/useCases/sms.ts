import SmsDao from "../dao/smsDao";
import SmsService from "../services/sms";

class SendSmsInteractor {
    smsDao: SmsDao
    smsService: SmsService
    constructor (smsDao:SmsDao, smsService: SmsService) {
        this.smsDao = smsDao;
        this.smsService = smsService;
    }
    generateCode() {
        let code = Math.floor(Math.random() * 1000000); 
        let codeString = String(code).padStart(6, '0');
        return codeString;
    }      

    async sendSms (phoneNumber:string) {
        try {
            const verificationCode = this.generateCode()
            const response = await this.smsService.sendSms(phoneNumber, verificationCode)
            const messageId = response.MessageId
            if (!messageId) throw new Error(`Imposible enviar el sms`)
            const newSms = await this.smsDao.saveSms(phoneNumber, verificationCode, messageId)
            return newSms
        } catch (error:any) {
            throw new Error(`${error.message}`)
        }
    }
}

export {SendSmsInteractor}