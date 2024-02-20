import crypto from 'crypto';

class CryptoService {
    private algorithm = 'aes-256-cbc';
    private secretKey: Buffer;
    private iv: Buffer;

    constructor(secretKey: string) {
        this.secretKey = crypto.createHash('sha256').update(String(secretKey)).digest();
        this.iv = crypto.randomBytes(16);
    }

    encrypt(text: string) {
        const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.iv);
        const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
        return {
            iv: this.iv.toString('hex'),
            content: encrypted.toString('hex')
        };
    }

    decrypt(encryption: { iv: string, content: string }) {
        const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, Buffer.from(encryption.iv, 'hex'));
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(encryption.content, 'hex')), decipher.final()]);
        return decrpyted.toString();
    }
}

export default CryptoService;