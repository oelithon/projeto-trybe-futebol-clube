import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/InterfaceUser';
import ServiceLogin from '../service/ServiceLogin';

const secret = process.env.JWT_SECRET || 'JWT_SECRET';

export default class UserToken {
  static async createToken(email: string) {
    const { id, role, username } = await ServiceLogin.findUser(email) as IUser;

    const token = jwt.sign({ id, role, username }, secret, { expiresIn: '1d', algorithm: 'HS256' });

    return token;
  }

  static async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (error) {
      return undefined;
    }
  }
}
