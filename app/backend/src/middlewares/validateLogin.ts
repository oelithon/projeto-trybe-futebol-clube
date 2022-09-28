import { Request, Response, NextFunction } from 'express';
import VerifyPassword from '../utils/verifyPassword';
import ServiceLogin from '../service/ServiceLogin';

const fieldsFilled = { message: 'All fields must be filled' };
const failEmailOrPass = { message: 'Incorrect email or password' };

export default class validateLogin {
  static async email(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (!email) return res.status(400).json(fieldsFilled);

    const user = await ServiceLogin.findUser(email);

    if (!user) return res.status(401).json(failEmailOrPass);

    next();
  }

  static async password(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!password) return res.status(400).json(fieldsFilled);

    const passValid = await VerifyPassword.passDecrypt(email, password);

    if (!passValid) return res.status(400).json(fieldsFilled);

    next();
  }
}
