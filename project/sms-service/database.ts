import mongoose from 'mongoose';
import SecretsClient from "./src/clients/secrets";
import CryptoService from "./src/services/crypto";

class Database {
    private MONGO_URI_ENCRYPTED = {
        iv: '76286b3546e255ea4f1e9f1784a48795',
        content: '7963e6dbdf71e0260e2afd34a5914dbef0b7246372db43bb07457444da6d17b550718817860fc19bab05e15a7c047f2bd16d1302e7785e0d1db82a20d14f32fed36bdd072a5855b31362d73e4f9f092f9a7f31ab80d5f127e20c288c81838d1164499aae8e3fec10ea57e03bb3a0c419f5201dc7e48d058ed189db15ed5cbb28'
    };

    async getSecretKey(): Promise<string> {
        try {
            const client = SecretsClient.getInstance();
            const secretKey = client.secret;
            if (!secretKey) {
                throw new Error(`Imposible obtener el secreto`);
            }
            return secretKey;
        } catch (error) {
            console.error(`Error al obtener la clave secreta: ${error}`);
            throw error;
        }
    }
    
    async decryptMongoUri(secretKey: string): Promise<string> {
        try {
            const crypto = new CryptoService(secretKey);
            const value = crypto.decrypt(this.MONGO_URI_ENCRYPTED);
            return value;
        } catch (error) {
            console.error(`Error al desencriptar el URI de MongoDB: ${error}`);
            throw error;
        }
    }
    
    async getMongoUri(): Promise<string> {
        try {
            const secretKey = await this.getSecretKey();
            const mongoUri = await this.decryptMongoUri(secretKey);
            return mongoUri;
        } catch (error) {
            console.error(`Error al obtener el URI de MongoDB: ${error}`);
            throw error;
        }
    }

    async connect() {
        try {
            const uri = await this.getMongoUri();
            await mongoose.connect(uri);
            console.log('MongoDB connected...');
        } catch (error:any) {
            throw new Error(`Imposible conectar a la base de datos ${error.message}`);
        }
    }
}

export default Database;