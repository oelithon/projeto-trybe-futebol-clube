import * as bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/InterfaceUser';
import ServiceLogin from '../service/ServiceLogin';

export default class VerifyPassword {
  static async passDecrypt(email: string, pass: string) {
    const User = await ServiceLogin.findUser(email);

    const { password: passInData } = User as IUser;

    const decrypt = bcrypt.compareSync(pass, passInData);

    if (decrypt) return true;
  }
}
