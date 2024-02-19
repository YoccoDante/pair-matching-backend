import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

class SecretsClient {
    secret: string | undefined;
    private client: SecretsManagerClient;
    private static instance: SecretsClient;

    private constructor() {
        this.client = new SecretsManagerClient({ region: "us-east-1" });
    }

    public static getInstance(): SecretsClient {
        if (!SecretsClient.instance) {
            SecretsClient.instance = new SecretsClient();
        }
        return SecretsClient.instance;
    }

    async getSecretKey(): Promise<void> {
        const command = new GetSecretValueCommand({ SecretId: "mongo_uri" });
        try {
            const data = await this.client.send(command);
            if (data.SecretString) {
                const secret = JSON.parse(data.SecretString);
                if (secret.SECRET_KEY) {
                    this.secret = secret.SECRET_KEY;
                } else {
                    throw new Error("SECRET_KEY no está definido en el secreto");
                }
            } else {
                throw new Error("SecretString no está definido");
            }
        } catch (error:any) {
            throw new Error(`Imposible recuperar valor del secreto ${error.message}`)
        }
    }
}

export default SecretsClient;