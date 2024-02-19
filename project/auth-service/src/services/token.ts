import jwt from 'jsonwebtoken';

interface TokenPayload {
    _id:string,
    name:string,
    lastName:string,
    email:string,
    password?:string,
    subscriptionDate:Date,
    lastActivity:Date
}

class TokenService {
    static secretKey = 'secret-key';

    static createToken(payload: any, expiresIn: string = '1h'): string {
        return jwt.sign(payload, this.secretKey, { expiresIn });
    }

    static validateToken(token: string): any {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (err) {
            return null;
        }
    }

    static renewToken(payload: any, expiresIn: string = '1h'): string {
        // In this simple implementation, renewing a token is the same as creating a new one
        return this.createToken(payload, expiresIn);
    }

    static extractUserId(token: string): string | null {
        const decoded = jwt.verify(token, this.secretKey);

        if (typeof decoded === 'object' && '_id' in decoded) {
            const payload = decoded as TokenPayload;
            return payload._id;
        }

        return null;
    }
}

export default TokenService