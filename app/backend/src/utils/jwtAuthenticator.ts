import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/InterfaceUser';

const secret = process.env.JWT_SECRET || 'JWT_SECRET';

export default class Token {
  static async createToken(user: IUser) {
    const payload = jwt.sign({ user }, secret, { algorithm: 'HS256' });

    return payload;
  }
}
