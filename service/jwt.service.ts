import jwt from 'jsonwebtoken';

export class JwtService {
  private secretKey: any;

  constructor() {
    this.secretKey = process.env.KEY!
  }

  generateToken(payload: object, expiresIn: any | number = "1y"): string {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  decodeToken(token: string): any {
    return jwt.decode(token);
  }
}
