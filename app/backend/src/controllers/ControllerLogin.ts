import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import UserToken from '../utils/jwtAuthenticator';

export default class ControllerLogin {
  static async successLogin(req: Request, res: Response) {
    const { email } = req.body;

    const token = await UserToken.createToken(email);

    return res.status(200).json({ token });
  }

  static async roleUser(req: Request, res: Response) {
    const { authorization } = req.headers;

    const { role } = await UserToken.verifyToken(authorization as string) as JwtPayload;

    return res.status(200).json({ role });
  }
}
