import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/InterfaceUser';
import ServiceLogin from '../service/ServiceLogin';

const secret = process.env.JWT_SECRET || 'JWT_SECRET';

export default class Token {
  static async createToken(email: string) {
    const { id, role, username } = await ServiceLogin.findUser(email) as IUser;

    const token = jwt.sign({ id, role, username }, secret, { algorithm: 'HS256' });

    return token;
  }

  static async verifyToken(token: string) {
    const decoded = jwt.verify(token, secret);
    return decoded;
  }
}
