import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Token from '../utils/jwtAuthenticator';

export default class ControllerLogin {
  static async successLogin(req: Request, res: Response) {
    const { email } = req.body;

    const token = await Token.createToken(email);

    return res.status(200).json({ token });
  }

  static async roleUser(req: Request, res: Response) {
    const { authorization } = req.headers;

    const { role } = await Token.verifyToken(authorization as string) as JwtPayload;

    res.status(200).json({ role });
  }
}
