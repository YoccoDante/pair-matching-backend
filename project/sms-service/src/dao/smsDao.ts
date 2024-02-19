import { Model } from 'mongoose';
import { ISmsDocument } from '../models/smsModel';

class SmsDao {
  private SmsModel: Model<ISmsDocument>;

  constructor(SmsModel: Model<ISmsDocument>) {
    this.SmsModel = SmsModel;
  }

  async saveSms(phone: string, code: string, messageId: string): Promise<ISmsDocument> {
    try {
        const emition = new Date();
        const sms = await this.SmsModel.findOneAndUpdate({ phone }, { code, emition, messageId }, { new: true, upsert: true });
        return sms;
    } catch (error:any) {
        throw new Error(`Imposible guardar el sms en la DB ${error.message}`)
    }
  }

  async deleteSms(phone: string): Promise<void> {
    try {
        await this.SmsModel.deleteOne({ phone });
    } catch (error:any) {
        throw new Error(`Imposibe eliminar el Sms de la DB ${error.message}`)
    }
  }
}

export default SmsDao;