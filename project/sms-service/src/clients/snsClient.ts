import { SNSClient } from "@aws-sdk/client-sns";
import SecretsClient from "./secrets";
import CryptoService from "../services/crypto";

const secretAccessKeyIdEncrypted = {
  iv: '206b5688e6f339df423d9ee12227e08b',
  content: '5e704396c3316663f1ab6c8ef33555501c5653b8aeb9beb2219e240cb89a640e'
}
const secretAccessKeyEncrypted = {
  iv: '89907e4639cb86bde960da4d5221fb4e',
  content: '0e1d8f5cded2e4790b3d0fcf5b565b88d75559a7a972180475248158aa032df5'
}
const snsRegion = 'us-east-1'

class SnsClient {
  public sns: SNSClient;
  private static instance: SnsClient;

  private constructor() {
    const secretsClient = SecretsClient.getInstance();
    const secretKey = secretsClient.secret;
    if (!secretKey) {
        throw new Error(`Imposible obtener el secreto`);
    }
    const crypto = new CryptoService(secretKey);

    const secretAccessKeyId = crypto.decrypt(secretAccessKeyIdEncrypted);
    const secretAccessKey = crypto.decrypt(secretAccessKeyEncrypted);

    this.sns = new SNSClient({
      region: snsRegion,
      credentials: {
        accessKeyId: secretAccessKeyId,
        secretAccessKey: secretAccessKey
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