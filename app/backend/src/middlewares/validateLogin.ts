import { Request, Response, NextFunction } from 'express';
import VerifyPassword from '../utils/verifyPassword';
import ServiceLogin from '../service/ServiceLogin';
import UserToken from '../utils/jwtAuthenticator';

const fieldsFilled = { message: 'All fields must be filled' };
const failEmailOrPass = { message: 'Incorrect email or password' };
const tokenNotFound = { message: 'Token not found' };
const tokenExpiredOrInvalid = { message: 'Token Expired or Invalid' };

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

    if (!passValid) return res.status(401).json(failEmailOrPass);

    next();
  }

  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(404).json(tokenNotFound);

    const token = await UserToken.verifyToken(authorization);

    if (!token) return res.status(401).json(tokenExpiredOrInvalid);

    next();
  }
}
