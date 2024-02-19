import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

class SnsClient {
  public sns: SNSClient;
  private static instance: SnsClient;

  private constructor() {
    this.sns = new SNSClient({
      region: 'tu-region',
      credentials: {
        accessKeyId: 'tu-access-key-id',
        secretAccessKey: 'tu-secret-access-key'
      }
    });
  }

  public static getInstance(): SnsClient {
    if (!SnsClient.instance) {
      SnsClient.instance = new SnsClient();
    }

    return SnsClient.instance;
  }
}

export default SnsClient;