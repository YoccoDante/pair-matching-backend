import { PublishCommand, PublishResponse, PublishInput } from "@aws-sdk/client-sns";
import SnsClient from '../clients/snsClient';

class SmsService {
  private snsClient: SnsClient;

  constructor() {
    this.snsClient = SnsClient.getInstance();
  }

  public async sendSms(phoneNumber: string, message: string): Promise<PublishResponse> {
    let params: PublishInput = {
      Message: message,
      PhoneNumber: phoneNumber,
    };

    const command = new PublishCommand(params);
    const response = await this.snsClient.sns.send(command);
    return response;
  }
}

export default SmsService;